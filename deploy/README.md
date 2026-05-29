# 聆悟 · 生产部署指南

本目录包含：**镜像导出/上传脚本**、**远程加载脚本**、**Nginx 反向代理模板** 与 **生产环境变量示例**。

## 架构概览

```text
用户浏览器
    │  HTTP / WS
    ▼
Nginx (:80)
    ├── gitgg.com        ──►  Web (:4010)
    └── voice.gitgg.com  ──►  语音中继 (:4011, wss://)
                            │
                            ▼
                    线上 Supabase + LLM API
```

| 组件 | 默认端口 | 说明 |
|------|----------|------|
| Web | 4010 | Next.js 管理端与候选人端 |
| 语音中继 | 4011 | 豆包 ASR/TTS WebSocket |
| Nginx | 80 | 对外入口（见 `nginx/`，当前 HTTP） |

---

## 一、本地构建镜像

在项目根目录：

```bash
cp .env.example .env.local
# 编辑 .env.local：Supabase、LLM、豆包等
```

```powershell
# Windows
pnpm install
docker compose --env-file .env.local build
# 或
pnpm run docker:full
```

构建产物镜像名：`lingwu-web:latest`、`lingwu-voice-relay:latest`。

### 生产域名与构建

`NEXT_PUBLIC_APP_URL`、`NEXT_PUBLIC_VOICE_RELAY_URL`、`NEXT_PUBLIC_OPENAI_VOICE_RELAY_URL` 在 **构建时** 写入前端（运行时改 `.env.local` **不会** 更新浏览器里的 WebSocket 地址）。生产示例：

```env
NEXT_PUBLIC_APP_URL=http://gitgg.com
NEXT_PUBLIC_VOICE_RELAY_URL=wss://voice.gitgg.com
NEXT_PUBLIC_OPENAI_VOICE_RELAY_URL=wss://voice.gitgg.com
```

修改后必须 **无缓存重建 web**：

```bash
docker compose --env-file deploy/env.production build web --no-cache
docker compose --env-file deploy/env.production up -d
```

若线上仍连 `ws://localhost:4011`，说明当前镜像是旧构建；请按上重建并 **Ctrl+Shift+R** 强刷页面。

---

## 二、导出镜像并 SCP 到服务器

### 前置条件

- 本机：Docker 已构建成功，OpenSSH 客户端（`ssh` / `scp`）
- 远程：`39.96.156.217`（或你的 IP）已安装 Docker、Docker Compose
- 可登录：`ssh root@39.96.156.217`

### 一键部署（Windows PowerShell）

在项目根目录执行：

```powershell
.\deploy\export-and-upload.ps1
```

常用参数：

```powershell
.\deploy\export-and-upload.ps1 -RemoteHost 39.96.156.217 -RemoteUser root -RemoteDir /opt/lingwu

# 已构建，只导出上传
.\deploy\export-and-upload.ps1 -SkipBuild

# 指定公网 URL 后再构建（写入当前 shell 环境，需与 .env.local 一致更稳妥）
.\deploy\export-and-upload.ps1 `
  -PublicAppUrl "https://lingwu.example.com" `
  -PublicVoiceRelayUrl "wss://voice.lingwu.example.com"
```

脚本会：

1. `docker save` → `deploy/bundle/lingwu-images.tar`
2. 上传：`lingwu-images.tar`、`docker-compose.yaml`、`.env.local`、`remote-load-run.sh`
3. SSH 执行 `remote-load-run.sh`（`docker load` + `compose up -d`）

### 手动步骤

```powershell
docker save -o deploy/bundle/lingwu-images.tar lingwu-web:latest lingwu-voice-relay:latest
scp deploy/bundle/lingwu-images.tar root@39.96.156.217:/opt/lingwu/
scp docker-compose.yaml .env.local deploy/remote-load-run.sh root@39.96.156.217:/opt/lingwu/
ssh root@39.96.156.217 "cd /opt/lingwu && chmod +x remote-load-run.sh && ./remote-load-run.sh"
```

---

## 三、远程服务器操作

### 仅加载并启动（文件已上传）

```bash
cd /opt/lingwu
chmod +x remote-load-run.sh
./remote-load-run.sh
```

### 常用命令

```bash
cd /opt/lingwu
docker compose --env-file .env.local ps
docker compose --env-file .env.local logs -f web
docker compose --env-file .env.local logs -f voice-relay
docker compose --env-file .env.local down
```

### 防火墙建议

- **对外开放**：80、443（Nginx）
- **仅本机**：4010、4011（`127.0.0.1`，由 Nginx 反代）

---

## 四、Nginx 反向代理

详见 [nginx/README.md](./nginx/README.md)。

简要步骤：

```bash
sudo cp deploy/nginx/lingwu.conf.example /etc/nginx/conf.d/lingwu.conf
# 编辑域名、证书路径
sudo nginx -t && sudo systemctl reload nginx
```

`.env.local` 中 `NEXT_PUBLIC_*` 须与 Nginx 对外 URL 一致，且镜像需按该 URL **重新构建**。

---

## 五、环境变量

复制 [env.production.example](./env.production.example) 为服务器上的 `.env.local`，按注释填写。

Supabase 控制台 → **Authentication → URL Configuration**：

- Site URL：`https://你的域名`
- Redirect URLs：`https://你的域名/**`

---

## 六、目录说明

| 文件 | 说明 |
|------|------|
| `export-and-upload.ps1` | 本机导出镜像 + SCP + 远程启动 |
| `remote-load-run.sh` | 服务器上 load 镜像并 compose up |
| `env.production.example` | 生产 `.env.local` 模板 |
| `nginx/lingwu.conf.example` | Nginx 反代 4010 / 4011 |
| `bundle/` | 导出 tar 存放目录（git 忽略） |

---

## 七、常见问题

| 问题 | 处理 |
|------|------|
| `supabaseUrl is required` 构建失败 | 本机构建时加 `--env-file .env.local` |
| `Failed to find Server Action` | 浏览器 **Ctrl+Shift+R** 强刷；env 中设固定 `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` 后重建 web |
| 页面能开但语音连不上 | 检查 `NEXT_PUBLIC_VOICE_RELAY_URL` 是否为 **ws/wss** 且 Nginx 已配 WebSocket |
| 语音连上后立刻失败 / ASR 401 | 删除或注释 `DOUBAO_API_KEY`，保留 `DOUBAO_APP_ID`+`DOUBAO_ACCESS_TOKEN`；重建 `voice-relay` 镜像 |
| ASR 400 `volc.seedasr... is not allowed` | 新版控制台勿用 `app_token`；改 `DOUBAO_ASR_AUTH=api_key`，`DOUBAO_API_KEY`=Secret Key（[文档](https://www.volcengine.com/docs/6561/1354869)） |
| ASR 400 `Doubao_Seed_ASR_... is not allowed` | **勿用控制台实例 ID**；`DOUBAO_ASR_RESOURCE_ID=volc.seedasr.sauc.duration` |
| ASR 401 `Invalid X-Api-Key` | 在「API Key 管理」创建密钥填入 `DOUBAO_ASR_API_KEY`（[说明](https://www.volcengine.com/docs/6561/1816214)；实例页 Secret Key 无效） |
| ASR 403 `resource not granted` | 在 [火山控制台](https://console.volcengine.com/speech/) 开通对应 ASR 资源；运行 `pnpm run check:doubao-asr` |
| 登录后跳转错误 | Supabase Redirect URLs 与 `NEXT_PUBLIC_APP_URL` 一致 |
| 镜像很大、上传慢 | 正常；可用 `-SkipBuild` 仅传 tar |
| 仅 IP 无域名 | 可用 HTTP + 端口直连 4010/4011 测试；生产建议域名 + HTTPS |

---

## 八、访问地址示例

| 场景 | Web | 语音 |
|------|-----|------|
| 直连 Docker | `http://IP:4010` | `ws://IP:4011` |
| Nginx（当前） | `http://gitgg.com` | `wss://voice.gitgg.com` |

演示账号（需先 `node scripts/seed-demo-user.mjs`）：`demo@lingwu.local` / `Demo123456`
