# BingoMate 缤果学伴 H5 Demo

这是一个面向学生的可点击 Web/H5 原型。应用打开后直接进入 AI 学伴聊天，其他能力和聊天记录收纳在左侧菜单中。

## 启动

```bash
npm install
npm run dev
```

浏览器打开终端显示的本地地址。

## 多台电脑一键同步

每台电脑首次使用时，通过 SSH 克隆项目：

```bash
git clone git@github.com:lichaotao-gif/bingoclaw-mate.git
cd bingoclaw-mate
npm install
```

已有旧项目的电脑，首次使用新流程前先执行：

```bash
git pull --ff-only origin main
```

以后开始工作时运行：

```bash
npm run work:start
```

这个命令会检查当前分支和未提交修改、自动确认或转换 GitHub SSH 地址；确认安全后
以 fast-forward 方式拉取 GitHub 最新代码、按需安装依赖、启动本地开发服务，并自动打开首页：
`http://localhost:3000`。如果本机还有未提交修改，脚本会停止拉取，避免覆盖文件。

结束工作时运行下面的命令。可以填写中文修改说明，也可以省略，让脚本根据修改文件自动生成：

```bash
npm run sync:up -- "完善首页交互"
# 或
npm run sync:up
```

这个命令会先执行生产构建测试，并阻止密钥、环境变量、缓存和构建产物进入提交；随后
检查暂存内容、创建中文提交、变基拉取远程更新并推送。发生冲突时立即停止，不会推送或
覆盖冲突内容。没有修改时不会创建空提交，但仍会检查远程状态。同步成功后，只会根据
准确的进程号和项目命令关闭由 `work:start` 启动的本地服务。

如需手动结束本项目由上述流程启动的开发服务，可执行：

```bash
npm run work:stop
```

多电脑工作顺序：上一台电脑先完成“结束工作”并确认推送成功，下一台电脑再执行
`npm run work:start`。不要在多台电脑上同时修改尚未同步的同一批文件。

## 构建与静态部署

执行标准构建：

```bash
npm run build
```

构建完成后，`dist` 目录直接包含 `index.html` 和全部静态资源，可部署到任意
静态网站托管平台。平台配置统一填写：

- 构建命令：`npm run build`
- 输出目录：`dist`
- 网站目录：留空（部署到根目录）
- 首页文档：`index.html`

不要在输出目录或网站目录末尾添加 `/`，也不要把仓库名
`bingoclaw-mate` 填入网站目录；否则腾讯云可能拼出重复斜杠或将首页部署到
错误的子目录。

旧的腾讯云配置可暂时继续使用 `npm run build:tencent` 和 `dist/client`，方便
平滑切换。需要部署 Cloudflare Worker 或 OpenAI Sites 时，使用
`npm run build:worker`。

## 当前可演示路径

- 直接聊天 → 快捷提问或输入问题 → AI 启发式回应。
- 左上角菜单 → 其他功能 → 拍题辅导 → OCR 确认 → 分步辅导 → 作答反馈。
- 左上角菜单 → 在其他功能下方查看和切换聊天记录。

## Mock 边界

不调用真实 OCR、大模型、支付、账号、设备或权限接口；相关数据和状态只保存在当前页面会话中。
