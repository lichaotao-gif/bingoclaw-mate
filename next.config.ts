import type { NextConfig } from 'next';

const isStaticExport = process.env.STATIC_EXPORT === '1';

const nextConfig: NextConfig = {
  // 默认构建导出可部署到任意静态托管平台的 HTML/CSS/JS；Worker 构建
  // 不设置该环境变量，继续保留服务端运行能力。
  output: isStaticExport ? 'export' : undefined,
};

export default nextConfig;
