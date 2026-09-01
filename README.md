# BingoMate 缤果学伴 H5 Demo

这是一个面向学生的可点击 Web/H5 原型。应用打开后直接进入 AI 学伴聊天，其他能力和聊天记录收纳在左侧菜单中。

## 启动

```bash
npm install
npm run dev
```

浏览器打开终端显示的本地地址。

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
