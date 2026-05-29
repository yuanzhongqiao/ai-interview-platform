# 聆悟 · Next.js 生产镜像（构建时注入 NEXT_PUBLIC_*，运行时读取 .env.local）
#
# 国内加速（默认已启用 Alpine + npm 镜像）：
#   基础镜像可覆盖：--build-arg NODE_IMAGE=docker.m.daocloud.io/library/node:20-alpine
#   npm 源可覆盖：  --build-arg NPM_REGISTRY=https://registry.npmmirror.com

ARG NODE_IMAGE=node:20-alpine
ARG NPM_REGISTRY=https://registry.npmmirror.com
ARG APK_MIRROR=mirrors.aliyun.com

FROM ${NODE_IMAGE} AS deps
ARG APK_MIRROR
ARG NPM_REGISTRY
WORKDIR /app
RUN sed -i "s/dl-cdn.alpinelinux.org/${APK_MIRROR}/g" /etc/apk/repositories
ENV NPM_CONFIG_REGISTRY=${NPM_REGISTRY}
ENV NPM_CONFIG_LOGLEVEL=info
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm,id=lingwu-npm \
    npm ci

FROM ${NODE_IMAGE} AS builder
ARG APK_MIRROR
ARG NPM_REGISTRY
WORKDIR /app
RUN sed -i "s/dl-cdn.alpinelinux.org/${APK_MIRROR}/g" /etc/apk/repositories
ENV NPM_CONFIG_REGISTRY=${NPM_REGISTRY}
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG SUPABASE_URL
ARG SUPABASE_SERVICE_ROLE_KEY
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_APP_URL=http://localhost:4010
ARG NEXT_PUBLIC_VOICE_RELAY_URL=ws://localhost:4011
ARG NEXT_PUBLIC_OPENAI_VOICE_RELAY_URL=ws://localhost:8767
ARG NEXT_PUBLIC_VOICE_RELAY_PRIMARY=voice
ARG NEXT_PUBLIC_BRAND_NAME=聆悟
ARG NEXT_PUBLIC_BRAND_NAME_EN=Lingwu
ARG NEXT_PUBLIC_BRAND_MARK=聆悟
# 固定 Server Action 加密密钥（构建时设置，避免重建镜像后表单/动作失效）
ARG NEXT_SERVER_ACTIONS_ENCRYPTION_KEY

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=$NEXT_SERVER_ACTIONS_ENCRYPTION_KEY
ENV SUPABASE_URL=$SUPABASE_URL
ENV SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_VOICE_RELAY_URL=$NEXT_PUBLIC_VOICE_RELAY_URL
ENV NEXT_PUBLIC_OPENAI_VOICE_RELAY_URL=$NEXT_PUBLIC_OPENAI_VOICE_RELAY_URL
ENV NEXT_PUBLIC_VOICE_RELAY_PRIMARY=$NEXT_PUBLIC_VOICE_RELAY_PRIMARY
ENV NEXT_PUBLIC_BRAND_NAME=$NEXT_PUBLIC_BRAND_NAME
ENV NEXT_PUBLIC_BRAND_NAME_EN=$NEXT_PUBLIC_BRAND_NAME_EN
ENV NEXT_PUBLIC_BRAND_MARK=$NEXT_PUBLIC_BRAND_MARK

RUN --mount=type=cache,target=/root/.npm,id=lingwu-npm \
    npm run build

FROM ${NODE_IMAGE} AS runner
ARG APK_MIRROR
WORKDIR /app
RUN sed -i "s/dl-cdn.alpinelinux.org/${APK_MIRROR}/g" /etc/apk/repositories
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
