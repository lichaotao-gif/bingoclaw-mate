#!/bin/sh

set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$project_dir"

if ! remote_url=$(git remote get-url origin 2>/dev/null); then
  echo "同步失败：当前项目没有配置 origin 远程仓库。"
  exit 1
fi

case "$remote_url" in
  git@github.com:*)
    repo_path=${remote_url#git@github.com:}
    ;;
  https://github.com/*)
    repo_path=${remote_url#https://github.com/}
    ;;
  ssh://git@github.com/*)
    repo_path=${remote_url#ssh://git@github.com/}
    ;;
  *)
    echo "同步失败：origin 不是受支持的 GitHub 地址：$remote_url"
    echo "请配置为：git@github.com:用户名/仓库名.git"
    exit 1
    ;;
esac

repo_path=${repo_path%.git}
case "$repo_path" in
  */*) ;;
  *)
    echo "同步失败：无法从 origin 识别 GitHub 仓库路径。"
    exit 1
    ;;
esac

ssh_url="git@github.com:$repo_path.git"
if [ "$remote_url" != "$ssh_url" ]; then
  echo "正在将 origin 转换为 GitHub SSH 地址…"
  git remote set-url origin "$ssh_url"
fi

echo "GitHub SSH 地址已确认：$ssh_url"
