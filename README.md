<p align="center">
  <img src="./public/brand-logo.svg" alt="聆悟 Lingwu" width="120" />
</p>

<h1 align="center">聆悟 Lingwu</h1>

<p align="center">
  <strong>深度对话，自动洞察。</strong><br/>
  开源 AI 面试平台，支持语音、文字与视频面试，面向招聘与练习场景。
</p>

<p align="center">
  <a href="https://www.gitcc.com/">GitCC 开源社区</a>
</p>

---

## 1. 项目简介

### 项目概述

**聆悟（Lingwu）** 是一款开源 AI 面试平台：用自然语言描述岗位与考察目标，即可生成面试题与评分标准；候选人通过链接进入，由 AI 主持语音或文字面试，会话结束后自动生成分析报告。适合企业招聘、培训机构模拟面试与个人求职练习。

### 项目起源

传统线下面试与人工阅卷成本高、难以规模化；远程招聘又缺少统一的考察与记录工具。聆悟将「出题—主持—追问—评分—复盘」串联为可复用的数字化流程，降低 HR 与面试官的重复劳动。

### 项目定位

| 用户 | 场景 |
|------|------|
| HR / 招聘团队 | 批量初筛、结构化面试、候选人对比 |
| 面试官 / 业务负责人 | 自定义考察维度、查看 AI 报告与录音 |
| 培训机构 / 高校 | 模拟面试、学员练习与反馈 |
| 求职者 | 自主练习、熟悉语音面试节奏 |

### 核心价值

- **提效**：AI 生成题目与追问，减少备课时间  
- **一致**：统一评分维度与报告格式，便于横向对比  
- **可扩展**：支持多 LLM、豆包语音中继与 REST API 集成  
- **可自托管**：Docker + 线上 Supabase，数据与密钥由团队自行掌控  

---

## 2. 整体架构与技术栈

### 系统架构

```text
┌─────────────────────────────────────────────────────────────┐
│                        浏览器 / 候选人端                      │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS / WebSocket
┌───────────────────────────▼─────────────────────────────────┐
│  Next.js 14（Web + tRPC API + App Router）                     │
│  端口：3000（开发）/ 4010（Docker）                             │
└───────────────┬─────────────────────────────┬─────────────────┘
                │                             │
                │ REST / Auth                 │ ws://voice-relay
┌───────────────▼──────────────┐   ┌──────────▼──────────────────┐
│  Supabase（PostgreSQL）       │   │  Voice Relay（Node.js）    │
│  Auth · RLS · Storage         │   │  豆包 ASR/TTS + LLM 中继    │
│  本地 CLI 或云托管             │   │  8766（开发）/ 4011（Docker）│
└──────────────────────────────┘   └────────────────────────────┘
                │
┌───────────────▼──────────────┐
│  外部 LLM API               │
│  OpenAI 兼容 / Gemini 等     │
└────────────────────────────┘
```

### 技术栈

| 分类 | 技术 | 说明 |
|------|------|------|
| **后端** | Next.js 14、TypeScript 5、tRPC | 全栈单体，API 与页面同仓 |
| **前端** | React 18、Tailwind CSS、Radix UI | 管理端与候选人端 UI |
| **数据库** | PostgreSQL（Supabase） | Auth、RLS、迁移在 `supabase/migrations/` |
| **中间件** | 无独立消息队列 | 语音为独立 WebSocket 进程 |
| **部署** | Docker Compose、`Dockerfile` | `docker-compose.yaml` 全量部署 |

### 技术选型说明

- **Supabase**：复用 Auth 与 RLS，避免自建用户体系。  
- **tRPC**：类型安全的内部 API，减少前后端契约漂移。  
- **独立 Voice Relay**：语音流与 Web 进程解耦，便于扩展豆包/OpenAI 双中继。  

---

## 3. 项目目录概览

```text
aural-oss/
├── src/
│   ├── app/              # Next.js 路由（仪表盘、候选人 /i、API、文档）
│   ├── components/       # UI 与业务组件
│   ├── server/           # tRPC 路由与服务端逻辑
│   ├── lib/              # 工具、品牌、i18n、AI 封装
│   └── content/docs/     # 内置帮助文档
├── server/               # 语音中继（voice-relay、openai-voice-relay）
├── supabase/
│   └── migrations/       # 数据库迁移
├── scripts/              # 种子数据、开发脚本
├── public/               # 静态资源（品牌图标等）
├── docker-compose.yaml
├── deploy/               # 生产部署脚本、Nginx 模板、教程
├── Dockerfile
├── Dockerfile.voice-relay
└── .env.example          # 环境变量模板
```

| 目录 | 作用 |
|------|------|
| `src/app/(dashboard)/` | 登录后管理端：面试、题库、练习、设置 |
| `src/app/i/` | 候选人面试会话（语音/文字） |
| `src/app/api/` | REST 与 AI 相关 HTTP 接口 |
| `server/` | 语音中继 WebSocket 服务 |
| `supabase/migrations/` | 表结构、RLS、函数 |

---

## 4. 核心业务功能

- **AI 面试生成**：用自然语言描述岗位，自动生成题目、追问与评分维度。  
- **多通道面试**：语音（豆包中继）、文字聊天；支持技术题白板与代码编辑器。  
- **练习模式**：候选人自主语音练习，AI 反馈与分数跟踪。  
- **团队与权限**：组织、项目、角色与 API Key 管理。  
- **防作弊**：切屏监测、粘贴限制、完整性日志。  
- **分析报告**：按题打分、亮点与改进建议，支持导出与复盘。  
- **多语言**：中英文界面与面试语言切换。  
- **开发者 API**：OpenAPI 规范的 REST，便于与 ATS/HR 系统集成。  
- **可插拔 LLM**：OpenAI 兼容、Gemini、Kimi、MiniMax 等。  

---

## 5. 实际应用场景示例

### 适用行业

互联网、金融、制造、教育、咨询等需要结构化面试或大规模初筛的领域。

### 场景一：校园招聘批量初筛

HR 为「Java 后端校招」生成一套 AI 面试，向数百名候选人发送链接；AI 完成首轮问答与评分，面试官仅查看 Top 报告进入复试。

### 场景二：培训机构模拟面试

学员在「练习」模块进行语音模拟，获得即时反馈与建议答案；讲师在后台查看练习记录与薄弱项统计。

### 场景三：技术岗深度考察

面试包含 Live Coding（Monaco）与系统设计白板（Excalidraw），AI 根据回答深度自动追问，结束后输出分项报告供技术委员会决策。

---

## 6. 帮助解决的核心问题

- 面试官备课耗时长、题目质量参差不齐  
- 远程面试缺少统一记录与可对比的评分标准  
- 人工阅卷主观性强、难以沉淀数据  
- 候选人缺少低成本、可重复的语音面试练习环境  
- 自建面试系统需同时解决 Auth、语音、LLM 与报表，工程量大  

---

## 7. 快速开始

### 代码仓库

- **Git 地址**：https://www.gitcc.com/yi-ee/aural-oss  
- **克隆**：

```bash
git clone https://www.gitcc.com/yi-ee/aural-oss.git
cd aural-oss
```

### 环境要求

| 方式 | 要求 |
|------|------|
| **本地开发** | Node.js ≥ 18、pnpm；Supabase CLI（本地）或云 Supabase 项目 |
| **Docker 部署** | Docker Desktop（引擎运行中）、`.env.local` 已配置线上 Supabase |

### 方式 A：Docker 部署（推荐，线上 Supabase）

使用根目录 **`docker-compose.yaml`**，包含 **Web（4010）** 与 **语音中继（4011）**，数据库走线上 Supabase，无需本地 `supabase start`。

#### 1. 准备环境变量

```bash
cp .env.example .env.local
```

在 **`.env.local`** 中至少配置：

| 变量 | 说明 |
|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 线上 Supabase 项目 |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | 服务端与构建用（可与上两项同源） |
| `DATABASE_URL` | Supabase **Session pooler** 连接串 |
| `OPENAI_API_KEY` 等 | 至少一个 LLM（见 `.env.example`） |
| `DOUBAO_*` | 语音面试需配置豆包相关项 |

Docker 映射端口与本地 dev 不同，建议在 `.env.local` 中写入（或由 compose 构建参数覆盖）：

```env
NEXT_PUBLIC_APP_URL=http://localhost:4010
NEXT_PUBLIC_VOICE_RELAY_URL=ws://localhost:4011
```

#### 2. 启动（推荐）

确保 **Docker Desktop 引擎已运行**，然后：

```bash
pnpm install
pnpm run docker:full
```

`docker:full` 等价于：

```bash
docker compose --env-file .env.local up -d --build
```

- **`--env-file .env.local`**：供 compose 做 `${变量}` 插值，并向构建阶段传入 Supabase / `NEXT_PUBLIC_*` 等参数  
- **`env_file: .env.local`**（已在 compose 中配置）：容器**运行时**加载同一套环境变量  

> 首次构建会执行 `npm ci` 与 `next build`，依赖较多，通常需 **10～20 分钟**，属正常现象。

#### 3. 访问与停止

| 服务 | 地址 |
|------|------|
| Web | http://localhost:4010 |
| 语音中继 WebSocket | `ws://localhost:4011` |

```bash
pnpm run docker:full:down
# 或：docker compose --env-file .env.local down
```

**生产服务器（镜像导出 SCP、Nginx 反代）**：见 [deploy/README.md](./deploy/README.md)。

#### 4. 手动命令（可选）

```bash
# 仅构建
docker compose --env-file .env.local build

# 构建并启动
docker compose --env-file .env.local up -d --build

# 查看日志
docker compose --env-file .env.local logs -f web
```

### 方式 B：本地开发

```bash
cp .env.example .env.local
# 编辑 .env.local（Supabase、LLM、语音等）

pnpm install
npx supabase start          # 本地 Supabase；或使用云项目并改 URL/Key
npx supabase db push        # 应用迁移

pnpm run dev:stack          # 同时启动 Web(3000) + 语音中继(8766)
# 或分别：pnpm run dev:voice  与  pnpm run dev
```

- Web：http://localhost:3000  
- 语音：`ws://localhost:8766`

### 演示账号（可选）

配置好 Supabase 后执行：

```bash
node scripts/seed-demo-user.mjs
```

| 字段 | 值 |
|------|-----|
| 邮箱 | `demo@lingwu.local` |
| 密码 | `Demo123456` |

### 常见问题

| 问题 | 处理 |
|------|------|
| `docker:full` 报无法连接 Docker API | 先启动 **Docker Desktop**；仍失败可执行 `wsl --shutdown` 后重启 Desktop |
| 构建卡在 `npm ci` / `npm run build` | 首次较慢；用 `docker compose --env-file .env.local build --progress=plain` 查看进度 |
| 构建报 `supabaseUrl is required` | 确认已配置 `.env.local`，且使用 `--env-file .env.local`（`pnpm run docker:full` 已包含） |
| 变量未设置 / 构建参数为空 | 勿省略 `--env-file .env.local`；检查 compose 警告中的变量名是否在 `.env.local` 中存在 |
| 语音面试 WebSocket 失败 | 确认 `lingwu-voice-relay` 容器在跑；Docker 用 **4011**，本地 dev 用 **8766** |
| 登录后无数据 | `DATABASE_URL` 须为 **Session pooler**；在 Supabase SQL 或 CLI 执行 `supabase/migrations` |
| Supabase Auth 回调失败 | 控制台 **Redirect URLs** 添加 `http://localhost:4010/**`（Docker）或 `http://localhost:3000/**`（本地） |

---

## 8. 运行示例截图

<!-- 截图占位：可在此添加仪表盘、面试会话、分析报告等示意图 -->
<!-- 建议路径：./docs/images/dashboard.png -->

| 模块 | 说明 |
|------|------|
| 仪表盘 | （待补充截图） |
| 语音面试 | （待补充截图） |
| AI 分析报告 | （待补充截图） |

---

## 开源协议

本项目基于 [MIT License](./LICENSE) 发布。使用与二次开发请遵守协议条款。
