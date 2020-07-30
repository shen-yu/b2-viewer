import { defineConfig } from 'umi';

export default defineConfig({
  favicon: '/assets/favicon.ico',
  theme: {
    "primary-color": "#cf1322",
  },
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  proxy: {
    '/login': {
      target: "https://api.backblazeb2.com/b2api/v2",
      changeOrigin: true,
      pathRewrite: { '^/login': '' },
    },
    '/api': {
      target: "https://api000.backblazeb2.com/b2api/v2",
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/upload': {
      target: "https://pod-000-1063-10.backblaze.com/b2api/v2/b2_upload_file/3416867833a2eee878260719/c000_v0001063_t0001",
      changeOrigin: true,
      pathRewrite: { '^/upload': '' },
    },
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
});
