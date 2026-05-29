#Requires -Version 5.1
<#
.SYNOPSIS
  导出 lingwu Docker 镜像，SCP 到远程服务器并加载运行。

.EXAMPLE
  .\deploy\export-and-upload.ps1
  .\deploy\export-and-upload.ps1 -RemoteUser ubuntu -RemoteDir /home/ubuntu/lingwu
#>

param(
    [string] $RemoteHost = "39.96.156.217",
    [string] $RemoteUser = "root",
    [string] $RemoteDir = "/opt/lingwu",
    [switch] $SkipBuild,
    [string] $PublicAppUrl = "",
    [string] $PublicVoiceRelayUrl = ""
)

$ErrorActionPreference = "Stop"
$DeployDir = $PSScriptRoot
$ProjectRoot = Split-Path -Parent $DeployDir
Set-Location $ProjectRoot

$ImageWeb = "lingwu-web:latest"
$ImageRelay = "lingwu-voice-relay:latest"
$BundleName = "lingwu-images.tar"
$BundlePath = Join-Path $DeployDir "bundle"
$TarPath = Join-Path $BundlePath $BundleName
$RemoteScript = Join-Path $DeployDir "remote-load-run.sh"

function Test-Command($name) {
    if (-not (Get-Command $name -ErrorAction SilentlyContinue)) {
        throw "未找到命令: $name（请安装 OpenSSH 客户端与 Docker）"
    }
}

Test-Command docker
Test-Command scp
Test-Command ssh

if (-not (Test-Path ".env.local")) {
    Write-Warning ".env.local 不存在；请参考 deploy/env.production.example"
}

$localEnv = if (Test-Path "deploy/env.production") { "deploy/env.production" }
            elseif (Test-Path ".env.local") { ".env.local" }
            else { $null }

if (-not $SkipBuild) {
    Write-Host "==> 本地构建镜像..." -ForegroundColor Cyan
    $composeArgs = @("compose")
    if ($localEnv) {
        $composeArgs += "--env-file", $localEnv
    }
    $composeArgs += "build"
    if ($PublicAppUrl) { $env:NEXT_PUBLIC_APP_URL = $PublicAppUrl }
    if ($PublicVoiceRelayUrl) {
        $env:NEXT_PUBLIC_VOICE_RELAY_URL = $PublicVoiceRelayUrl
        $env:NEXT_PUBLIC_OPENAI_VOICE_RELAY_URL = $PublicVoiceRelayUrl
    }
    & docker @composeArgs
    if ($LASTEXITCODE -ne 0) { throw "docker compose build 失败" }
}

Write-Host "==> 检查镜像..." -ForegroundColor Cyan
foreach ($img in @($ImageWeb, $ImageRelay)) {
    docker image inspect $img 2>$null | Out-Null
    if ($LASTEXITCODE -ne 0) {
        throw "镜像不存在: $img ，请先: docker compose --env-file .env.local build"
    }
}

New-Item -ItemType Directory -Force -Path $BundlePath | Out-Null
if (Test-Path $TarPath) { Remove-Item -Force $TarPath }

Write-Host "==> 导出镜像 -> $TarPath" -ForegroundColor Cyan
docker save -o $TarPath $ImageWeb $ImageRelay
if ($LASTEXITCODE -ne 0) { throw "docker save 失败" }

$tarSizeMb = [math]::Round((Get-Item $TarPath).Length / 1MB, 1)
Write-Host "    约 ${tarSizeMb} MB" -ForegroundColor Gray

Write-Host "==> 远程目录 $RemoteDir" -ForegroundColor Cyan
ssh "${RemoteUser}@${RemoteHost}" "mkdir -p '$RemoteDir'"

Write-Host "==> SCP 上传..." -ForegroundColor Cyan
scp $TarPath "${RemoteUser}@${RemoteHost}:${RemoteDir}/"
scp (Join-Path $ProjectRoot "docker-compose.yaml") "${RemoteUser}@${RemoteHost}:${RemoteDir}/"
scp $RemoteScript "${RemoteUser}@${RemoteHost}:${RemoteDir}/"

$envFile = if (Test-Path "deploy/env.production") { "deploy/env.production" }
           elseif (Test-Path ".env.local") { ".env.local" }
           else { $null }
if ($envFile) {
    scp $envFile "${RemoteUser}@${RemoteHost}:${RemoteDir}/.env.local"
} else {
    Write-Warning "未找到 deploy/env.production 或 .env.local"
}

Write-Host "==> 远程 load & up" -ForegroundColor Cyan
ssh "${RemoteUser}@${RemoteHost}" "chmod +x '${RemoteDir}/remote-load-run.sh' && cd '${RemoteDir}' && ./remote-load-run.sh"

Write-Host ""
Write-Host "完成。直连端口（未配 Nginx 时）：" -ForegroundColor Green
Write-Host "  Web:  http://${RemoteHost}:4010"
Write-Host "  语音: ws://${RemoteHost}:4011"
Write-Host "配置 Nginx 见: deploy/nginx/README.md"
