#!/bin/sh

set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$project_dir"

port=${PORT:-3000}
url="http://localhost:$port"
session_dir="$project_dir/.work-session"
pid_file="$session_dir/dev.pid"
log_file="$session_dir/dev.log"

case "$port" in
  *[!0-9]*|'')
    echo "启动失败：PORT 必须是有效端口号。"
    exit 1
    ;;
esac

npm run sync:down

if [ -f "$pid_file" ]; then
  running_pid=$(cat "$pid_file")
  if kill -0 "$running_pid" 2>/dev/null; then
    echo "本次工作服务已在运行：$url"
    exit 0
  fi
  rm -f "$pid_file"
fi

mkdir -p "$session_dir"
echo "正在启动本地预览服务…"
nohup npm run dev -- --host 127.0.0.1 --port "$port" >"$log_file" 2>&1 &
server_pid=$!
printf '%s\n' "$server_pid" >"$pid_file"

attempt=0
while [ "$attempt" -lt 40 ]; do
  if curl -fsS "$url" >/dev/null 2>&1; then
    echo "首页加载正常：$url"
    case "$(uname -s)" in
      Darwin) open "$url" >/dev/null 2>&1 || true ;;
      Linux) xdg-open "$url" >/dev/null 2>&1 || true ;;
      MINGW*|MSYS*|CYGWIN*) start "$url" >/dev/null 2>&1 || true ;;
    esac
    echo "本地预览已启动，开发服务将保持运行。"
    exit 0
  fi
  if ! kill -0 "$server_pid" 2>/dev/null; then
    echo "启动失败，开发服务已退出。日志如下："
    sed -n '1,160p' "$log_file"
    rm -f "$pid_file"
    exit 1
  fi
  attempt=$((attempt + 1))
  sleep 1
done

echo "启动超时：$url 未能在 40 秒内响应。"
echo "请查看日志：$log_file"
exit 1
