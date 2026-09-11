#!/bin/sh

set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$project_dir"

branch=$(git branch --show-current)

if [ -z "$branch" ]; then
  echo "同步失败：当前不在 Git 分支上。"
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "同步已停止：本机还有未提交修改。"
  echo "请先执行：npm run sync:up -- \"本次修改说明\""
  exit 1
fi

sh scripts/ensure-github-ssh.sh

echo "正在从 GitHub 拉取 $branch 分支…"
if ! git pull --ff-only origin "$branch"; then
  echo "同步已停止：远程更新无法安全快进，或 SSH 连接失败。"
  echo "本机文件没有被覆盖，请先检查上方 Git 提示。"
  exit 1
fi

echo "正在检查项目依赖…"
if npm ls --depth=0 >/dev/null 2>&1; then
  echo "项目依赖已经就绪。"
else
  echo "检测到缺少或不完整的依赖，正在安装…"
  if [ -f package-lock.json ]; then
    npm ci --prefer-offline --no-audit --no-fund
  else
    npm install --prefer-offline --no-audit --no-fund
  fi
fi

echo "同步完成，本机代码已经是最新版本。"
