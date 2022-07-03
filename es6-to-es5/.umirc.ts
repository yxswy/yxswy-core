export default {
  npmClient: 'pnpm',
  plugins: ['@umijs/plugins/dist/antd'],
  antd: {
    import: true,
  },
  history: {
    type: 'hash'
  },
  routes: [
    { path: '', component: 'index' }
  ],
  publicPath: '/yxswy-transform/'
};
