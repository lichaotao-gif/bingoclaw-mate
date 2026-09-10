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

# Git ignore 只能保护未跟踪文件；这里额外拦截已被跟踪或误加入的敏感、缓存和构建文件。
unsafe_files=$( {
  git diff --name-only
  git ls-files --others --exclude-standard
} | sort -u | grep -E '(^|/)\.env(\.|$)|\.(pem|key|p12|pfx)$|^(node_modules|dist|out|coverage|\.next|\.vinext|\.wrangler|\.work-session)/' || true)

if [ -n "$unsafe_files" ]; then
  echo "同步已停止：检测到不应提交的文件："
  printf '%s\n' "$unsafe_files"
  echo "请移除这些文件的修改或更新 .gitignore 后再试。"
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

sh scripts/work-stop.sh

echo "同步完成，其他电脑现在可以执行 npm run work:start。"
