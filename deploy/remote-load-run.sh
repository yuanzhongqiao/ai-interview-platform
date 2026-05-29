#!/usr/bin/env bash
# 远程服务器：加载 lingwu-images.tar 并启动 compose
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

TAR="lingwu-images.tar"
COMPOSE_FILE="docker-compose.yaml"
ENV_FILE=".env.local"

for f in "$TAR" "$COMPOSE_FILE" "$ENV_FILE"; do
  if [[ ! -f "$f" ]]; then
    echo "错误: 缺少 $DIR/$f"
    exit 1
  fi
done

echo "==> docker load ..."
docker load -i "$TAR"

echo "==> 停止旧容器 ..."
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" down 2>/dev/null || true

echo "==> 启动 ..."
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up -d

docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" ps
echo ""
echo "Web :4010  语音 :4011  （建议仅监听 127.0.0.1，由 Nginx 对外）"
