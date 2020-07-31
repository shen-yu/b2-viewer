import { defineConfig } from 'umi';

export default defineConfig({
  favicon: '/assets/favicon.ico',
  theme: {
    "primary-color": "#cf1322",
  },
  locale: {
    default: 'en-US',
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
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
});
