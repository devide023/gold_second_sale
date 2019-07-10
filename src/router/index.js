import Vue from 'vue'
import Router from 'vue-router'
// import { title } from '../settings';
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
    path: '/',
    hidden: true,
    redirect: '/admin/index'
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/admin',
    component: Layout,
    name: 'admin',
    meta:{
      title:'管理员',
      icon:'admin'
    },
    children: [{
      path: 'index',
      component: () => import('@/views/admin_index'),
      name: 'admin_index',
      meta: {
        title: '管理员首页',
        icon: 'admin'
      }
    }]
  },
  {
    path: '/usermgr',
    component: Layout,
    name: 'usermgr',
    meta: {
      title: '用户管理',
      icon: 'user'
    },
    children: [{
      path: 'index',
      name: 'user_index',
      component: () => import('@/views/usermgr/index'),
      meta: {
        title: '用户列表',
        icon: 'chart-scatter-plot'
      }
    }]
  },
  {
    path: '/rolemgr',
    name: 'rolemgr',
    component: Layout,
    meta: {
      title: '角色管理',
      icon: 'role'
    },
    children: [{
      path: 'index',
      name: 'rolelist',
      component: () => import('@/views/rolemgr/index'),
      meta: {
        title: '角色列表',
        icon: 'list'
      }
    }]
  },
  {
    path: '/menumgr',
    component: Layout,
    name: 'menumgr',
    meta: {
      title: '功能模块',
      icon: 'user'
    },
    children: [{
      path: 'index',
      name: 'list',
      component: () => import('@/views/menumgr/index'),
      meta: {
        title: '功能列表',
        icon: 'list'
      }
    }]
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
          icon: 'chart-scatter-plot'
        }
      },
      {
        path: 'cruisesdate',
        name: 'cruisesdate',
        component: () => import('@/views/chart/cruisesdate'),
        meta: {
          title: '邮轮销售统计',
          icon: 'chart-pie-alt'
        }
      },
      {
        path: 'cruisesclass',
        name: 'cruisesclass',
        component: () => import('@/views/chart/cruisesclass'),
        meta: {
          title: '邮轮分类销售统计',
          icon: 'chart-bar'
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
      icon: 'table'
    },
    children: [{
        path: 'index',
        name: 'rep_index',
        component: () => import('@/views/reports/cruises_class_stat'),
        meta: {
          title: '航次分类统计报表',
          icon: 'flag-fill'
        }
      },
      {
        path: 'rcstat',
        name: 'rcstat',
        component: () => import('@/views/reports/cruises_rc_saletop'),
        meta: {
          title: '邮轮航次销售排行',
          icon: 'rank'
        }
      },
      {
        path: 'classrank',
        name: 'classrank',
        component: () => import('@/views/reports/cruises_class_rank'),
        meta: {
          title: '邮轮分类销售排行榜',
          icon: 'tag'
        }
      },
      {
        path: 'placerank',
        name: 'placerank',
        component: () => import('@/views/reports/cruises_place_saletop'),
        meta: {
          title: '邮轮站点销售排行榜',
          icon: 'chart-relation'
        }
      },
      {
        path: 'menucodetop',
        name: 'menucodetop',
        component: () => import('@/views/reports/menucode_rank'),
        meta: {
          title: '消费项目排行榜',
          icon: 'chart-area'
        }
      }
    ]
  },
  {
    path: '/cruisesmgr',
    component: Layout,
    name: 'cruisesmgr',
    meta: {
      title: '邮轮管理',
      icon: 'form'
    },
    children: [{
      path: 'rcdetail',
      name: 'rcdetail',
      component: () => import('@/views/cruisesmgr/rcsaledetail'),
      meta: {
        title: '航次明细查询',
        icon: 'database-set-fill'
      }
    }]
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
