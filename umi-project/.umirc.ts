export default {
  npmClient: 'pnpm',
  plugins: ['@umijs/plugins/dist/antd'],
  antd: {
    // dark: true,
    import: true,
  },
  history: {
    type: 'hash'
  },
  routes: [
    { path: '', component: 'index' },
    { path: '/login', component: 'login' },
    { path: '/function', component: 'function' },
    { path: '/docs', component: 'docs' },
    // {
    //   path: '/',
    //   component: '@/layouts/index',
    //   // redirect: '/login',
    //   routes: [
    //     // { path: '/admin', component: 'admin' },
    //   ],
    // }, 
  ],
  publicPath: '/yxswy-yhzx/'
};
