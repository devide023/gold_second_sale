import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/echarts/index',
    hidden: true
  },
  {
    path: '/echarts',
    component: Layout,
    name: 'echarts',
    meta: {
      title: '图表',
      icon: 'chart'
    },
    children: [{
        path: 'index',
        name: 'cruises_rc',
        component: () => import('@/views/chart/index'),
        meta: {
          title: '邮轮各航次销售统计',
          icon: 'chart-line'
        }
      },
      {
        path: 'cruisesdate',
        name: 'cruisesdate',
        component: () => import('@/views/chart/cruisesdate'),
        meta: {
          title: '邮轮销售统计',
          icon: 'chart'
        }
      },
      {
        path: 'cruisesclass',
        name: 'cruisesclass',
        component: () => import('@/views/chart/cruisesclass'),
        meta: {
          title: '邮轮分类销售统计',
          icon: 'chart'
        }
      }
    ]
  },
  {
    path: '/reports',
    component: Layout,
    redirect: '/reports/index',
    name: 'reports',
    meta: {
      title: '报表',
      icon: 'example'
    },
    children: [{
        path: 'index',
        name: 'rep_index',
        component: () => import('@/views/reports/cruises_class_stat'),
        meta: {
          title: '邮轮分类统计报表',
          icon: 'table'
        }
      },
      {
        path: 'rcstat',
        name: 'rcstat',
        component: () => import('@/views/reports/cruises_rc_stat'),
        meta: {
          title: '邮轮航次分析报表',
          icon: 'table'
        }
      },
      {
        path: 'classrank',
        name: 'classrank',
        component: () => import('@/views/reports/cruises_class_rank'),
        meta: {
          title: '邮轮分类销售排行榜',
          icon: 'table'
        }
      },
      {
        path: 'placerank',
        name: 'placerank',
        component: () => import('@/views/reports/cruises_place_rank'),
        meta: {
          title: '邮轮站点销售排行榜',
          icon: 'table'
        }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Form',
      component: () => import('@/views/form/index'),
      meta: {
        title: 'Form',
        icon: 'form'
      }
    }]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [{
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {
          title: 'Menu1'
        },
        children: [{
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: {
              title: 'Menu1-1'
            }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: {
              title: 'Menu1-2'
            },
            children: [{
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: {
                  title: 'Menu1-2-1'
                }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: {
                  title: 'Menu1-2-2'
                }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: {
              title: 'Menu1-3'
            }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: {
          title: 'menu2'
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
