#!/bin/sh

set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$project_dir"

branch=$(git branch --show-current)
message=${*:-"同步项目更新"}

if [ -z "$branch" ]; then
  echo "同步失败：当前不在 Git 分支上。"
  exit 1
fi

git add -A

if git diff --cached --quiet; then
  echo "本机没有需要提交的修改。"
else
  echo "正在检查并保存本机修改…"
  git diff --cached --check
  git commit -m "$message"
fi

echo "正在合并 GitHub 上的最新代码…"
git pull --rebase origin "$branch"

echo "正在推送到 GitHub…"
git push origin "$branch"

echo "同步完成，其他电脑现在可以执行 npm run work:start。"
