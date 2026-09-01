import type { NextConfig } from 'next';

const isTencentStaticExport = process.env.TENCENT_STATIC_EXPORT === '1';

const nextConfig: NextConfig = {
  // 腾讯云静态网站托管只能提供 HTML/CSS/JS 文件，不能运行默认构建中的
  // Cloudflare Worker。仅在腾讯专用构建中启用纯静态导出，避免影响 Sites 部署。
  output: isTencentStaticExport ? 'export' : undefined,
};

export default nextConfig;
