#!/bin/sh

set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$project_dir"

port=${PORT:-3000}
url="http://localhost:$port"
session_dir="$project_dir/.work-session"
pid_file="$session_dir/dev.pid"
port_file="$session_dir/dev.port"
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
  if [ -n "$running_pid" ] && kill -0 "$running_pid" 2>/dev/null; then
    process_command=$(ps -p "$running_pid" -o command= 2>/dev/null || true)
    case "$process_command" in
      *"$project_dir"*vinext*"--port $port"*)
        echo "本次工作服务已在运行：$url"
        exit 0
        ;;
      *)
        echo "启动已停止：记录的进程号 $running_pid 不属于当前项目。"
        echo "为避免影响其他项目，脚本不会停止或替换该进程。"
        exit 1
        ;;
    esac
  fi
  rm -f "$pid_file" "$port_file"
fi

mkdir -p "$session_dir"
echo "正在启动本地预览服务…"
"$project_dir/node_modules/.bin/vinext" dev --host 127.0.0.1 --port "$port" >"$log_file" 2>&1 &
server_pid=$!
printf '%s\n' "$server_pid" >"$pid_file"
printf '%s\n' "$port" >"$port_file"

cleanup_on_signal() {
  sh scripts/work-stop.sh >/dev/null 2>&1 || true
  exit 130
}

trap 'cleanup_on_signal' INT TERM HUP

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

    if wait "$server_pid"; then
      server_status=0
    else
      server_status=$?
    fi
    trap - INT TERM HUP
    if [ -f "$pid_file" ] && [ "$(cat "$pid_file")" = "$server_pid" ]; then
      rm -f "$pid_file" "$port_file"
    fi
    exit "$server_status"
  fi
  if ! kill -0 "$server_pid" 2>/dev/null; then
    echo "启动失败，开发服务已退出。日志如下："
    sed -n '1,160p' "$log_file"
    rm -f "$pid_file" "$port_file"
    exit 1
  fi
  attempt=$((attempt + 1))
  sleep 1
done

echo "启动超时：$url 未能在 40 秒内响应。"
echo "请查看日志：$log_file"
sh scripts/work-stop.sh || true
exit 1
