#!/bin/sh

set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
pid_file="$project_dir/.work-session/dev.pid"
port_file="$project_dir/.work-session/dev.port"

if [ ! -f "$pid_file" ]; then
  exit 0
fi

server_pid=$(cat "$pid_file")
case "$server_pid" in
  *[!0-9]*|'')
    echo "停止失败：开发服务进程记录无效，未停止任何进程。"
    exit 1
    ;;
esac

if kill -0 "$server_pid" 2>/dev/null; then
  if [ ! -f "$port_file" ]; then
    echo "停止失败：缺少当前项目的端口记录，未停止进程 $server_pid。"
    exit 1
  fi

  server_port=$(cat "$port_file")
  process_command=$(ps -p "$server_pid" -o command= 2>/dev/null || true)
  case "$process_command" in
    *"$project_dir"*vinext*"--port $server_port"*) ;;
    *)
      echo "停止失败：进程 $server_pid 无法确认为当前项目的开发服务。"
      echo "为避免影响其他项目，脚本未执行 kill。"
      exit 1
      ;;
  esac

  echo "正在停止本次工作启动的本地服务…"
  kill "$server_pid"

  attempt=0
  while kill -0 "$server_pid" 2>/dev/null && [ "$attempt" -lt 10 ]; do
    attempt=$((attempt + 1))
    sleep 1
  done

  if kill -0 "$server_pid" 2>/dev/null; then
    echo "开发服务未在 10 秒内退出，未进行强制批量停止。"
    exit 1
  fi
fi
rm -f "$pid_file" "$port_file"
