#!/bin/sh

set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
pid_file="$project_dir/.work-session/dev.pid"

if [ ! -f "$pid_file" ]; then
  exit 0
fi

server_pid=$(cat "$pid_file")
if kill -0 "$server_pid" 2>/dev/null; then
  echo "正在停止本次工作启动的本地服务…"
  kill "$server_pid" 2>/dev/null || true
fi
rm -f "$pid_file"
