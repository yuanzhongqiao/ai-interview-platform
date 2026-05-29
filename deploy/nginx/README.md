# Nginx 反向代理

## 当前方案

| 入口 | `server_name` | 反代到 | 用途 |
|------|---------------|--------|------|
| Web | `gitgg.com` | `127.0.0.1:4010` | 管理端 / 候选人页面 |
| 语音 | `voice.gitgg.com` | `127.0.0.1:4011` | WebSocket（`wss://voice.gitgg.com`） |

同一台机器 **80/443** 端口，靠 **Host** 区分 Web 与语音子域。

## 环境变量（构建镜像前）

```env
NEXT_PUBLIC_APP_URL=http://gitgg.com
NEXT_PUBLIC_VOICE_RELAY_URL=wss://voice.gitgg.com
NEXT_PUBLIC_OPENAI_VOICE_RELAY_URL=wss://voice.gitgg.com
```

> 浏览器 WebSocket 须用 `ws://` / `wss://`，不要用 `http://` / `https://` 写入上述变量。  
> 若证书尚未配置，可暂用 `ws://voice.gitgg.com`（仅 HTTP 80）。

修改后需 **无缓存重建** Web 镜像：

```bash
docker compose --env-file deploy/env.production build web --no-cache
docker compose --env-file deploy/env.production up -d
```

## 安装

```bash
sudo cp deploy/nginx/lingwu.conf /etc/nginx/conf.d/lingwu.conf
sudo nginx -t
sudo systemctl reload nginx
```

## DNS

- `gitgg.com` A 记录 → 服务器 IP
- `voice.gitgg.com` A 记录 → **同一** 服务器 IP

## HTTPS（语音子域）

前端使用 `wss://voice.gitgg.com` 时，Nginx 需为 `voice.gitgg.com` 配置 **443 + SSL**（见 `lingwu.conf` 内注释示例）。可用 Let’s Encrypt：

```bash
sudo certbot --nginx -d voice.gitgg.com
```

## 防火墙

- 开放：**80**、**443**
- **4010、4011** 仅本机（`127.0.0.1`），勿对公网暴露

## Supabase

Authentication → Redirect URLs：

```text
http://gitgg.com/**
```

## 访问

- Web：http://gitgg.com  
- 语音：`wss://voice.gitgg.com`（由 `NEXT_PUBLIC_VOICE_RELAY_URL` 连接）
