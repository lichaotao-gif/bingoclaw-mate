#!/bin/sh

set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$project_dir"

branch=$(git branch --show-current)

if [ -z "$branch" ]; then
  echo "同步失败：当前不在 Git 分支上。"
  exit 1
fi

sh scripts/ensure-github-ssh.sh

echo "正在测试本次修改…"
npm run build

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

if [ "$#" -gt 0 ]; then
  message=$*
else
  changed_files=$(git status --porcelain | wc -l | tr -d ' ')
  changed_paths=$( {
    git diff --name-only
    git ls-files --others --exclude-standard
  } | sort -u)

  if printf '%s\n' "$changed_paths" | grep -Eq '^(app|components|public)/'; then
    message="优化应用功能与界面（${changed_files}个文件）"
  elif printf '%s\n' "$changed_paths" | grep -Eq '^(scripts/|package\.json|README\.md)'; then
    message="完善项目同步与配置（${changed_files}个文件）"
  else
    message="更新项目文件（${changed_files}个文件）"
  fi
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
if ! git pull --rebase origin "$branch"; then
  echo "同步已停止：拉取时出现冲突或 SSH 连接失败。"
  echo "未执行推送，也未擅自覆盖冲突内容，请先人工处理 Git 提示。"
  exit 1
fi

echo "正在推送到 GitHub…"
git push origin "$branch"

sh scripts/work-stop.sh

echo "同步完成，其他电脑现在可以执行 npm run work:start。"
