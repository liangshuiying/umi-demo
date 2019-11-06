export default [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/Welcome',
            },
            {
              path: '/welcome',
              name: '欢迎页',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/product',
              icon: 'crown',
              name: '产品页',
              component: './Product/Product',
            },
            {
              path: '/admin',
              name: 'admin管理员',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ]