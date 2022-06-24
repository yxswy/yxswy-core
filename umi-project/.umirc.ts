export default {
  npmClient: 'pnpm',
  plugins: ['@umijs/plugins/dist/antd'],
  antd: {
    // dark: true,
    import: true,
  },
  routes: [
    { path: '', component: 'index' },
    { path: '/login', component: 'login' },
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
};
