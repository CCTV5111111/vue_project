import { createRouter, createWebHistory } from 'vue-router';
import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/components/Login/Login.vue'),
    },
    {
      path: '/home',
      name: 'home',
      redirect: 'home/welcome',
      component: () => import('@/components/Home/Home.vue'),
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          component: () => import('@/views/Home/Welcome.vue'),
        },
        {
          path: 'categories',
          name: 'categories',
          component: () => import('@/views/Home/Categories.vue'),
          meta: {
            title: ['商品管理', '分类参数']
          }
        },
        {
          path: 'goods',
          name: 'goods',
          component: () => import('@/views/Home/Goods.vue'),
          meta: {
            title: ['商品管理', '商品列表']
          }
        },
        {
          path: 'orders',
          name: 'orders',
          component: () => import('@/views/Home/Orders.vue'),
          meta: {
            title: ['订单管理', '订单列表']
          }
        },
        {
          path: 'add',
          name: 'add',
          component: () => import('@/views/Home/Add.vue'),
          meta: {
            title: ['商品管理', '添加商品']
          }
        },
        {
          path: 'params',
          name: 'params',
          component: () => import('@/views/Home/Params.vue'),
          meta: {
            title: ['商品管理', '分类参数']
          }
        },
        {
          path: 'reports',
          name: 'reports',
          component: () => import('@/views/Home/Reports.vue'),
          meta: {
            title: ['数据统计', '数据报表']
          }
        },
        {
          path: 'rights',
          name: 'rights',
          component: () => import('@/views/Home/Rights.vue'),
          meta: {
            title: ['权限管理', '权限列表']
          }
        },
        {
          path: 'roles',
          name: 'roles',
          component: () => import('@/views/Home/Roles.vue'),
          meta: {
            title: ['权限管理', '角色列表']
          }
        },
        {
          path: 'rights',
          name: 'rights',
          component: () => import('@/views/Home/Rights.vue'),
          meta: {
            title: ['权限管理', '权限列表']
          }
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('@/views/Home/Users.vue'),
          meta: {
            title: ['用户管理', '用户列表']
          }
        },

      ]
    },
  ],
});


router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !sessionStorage.getItem('token')) {
    ElMessage.error('请先登录');
    setTimeout(() => {
      next({ name: 'login' });
    }, 3000);
  } else {
    next();
  }
});

export default router;
