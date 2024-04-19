import { createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'userBoard',
      redirect: '/home', //將預設的'/'路徑重定向到'/home'頁面，
      component: () => import('@/pages/userBoard.vue'),
      children: [
        {
          path: 'home',
          component: () => import('@/pages/HomeView.vue'),
          alias: '/' //將'/home'頁面的url別名成'/'
        },
        {
          path: 'shop',
          component: () => import('@/pages/Shop.vue'),
          children: [
            {
              path: ':category',
              component: () => import('@/pages/Shop.vue'),
            }
          ]
        },
        {
          path: 'product-detail/:id',
          component: () => import('@/pages/ProductPage.vue')
        },
        {
          path: 'login',
          name: 'LogIn',
          component: () => import('@/pages/LogIn.vue')
        },
        {
          path: 'check-out',
          name: 'CheckOut',
          redirect: '/check-out/cart-list',
          component: () => import('@/pages/CheckOut.vue'),
          children: [
            {
              path: 'cart-list',
              component: () => import('@/pages/CartList.vue')
            },
            {
              path: 'order',
              name: 'Order',
              props: true,
              component: () => import('@/pages/Order.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/dashboard',
      name: 'DashBoard',
      redirect: '/dashboard/products',
      component: () => import('@/pages/DashBoard.vue'),
      children: [
        {
          path: 'products',
          component: () => import('@/pages/Products.vue')
        },
        {
          path: 'coupon',
          component: () => import('@/pages/Coupon.vue')
        }
      ]
    }
  ]
})

export default router
