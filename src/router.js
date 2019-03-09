import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/task/add',
      name: 'task/add',
      component: () => import('./views/task/Task.vue'),
      meta: {
        title: '新增任务'
      }
    },
    {
      path: '/task/add/:id',
      name: 'task/addSubTask',
      component: () => import('./views/task/Task.vue'),
      meta: {
        title: '新增子任务'
      }
    },
    {
      path: '/task/detail/:id',
      name: 'task/detail',
      component: () => import('./views/task/TaskDetail.vue')
    },
    {
      path: '/task/edit/:id',
      name: 'task/edit',
      component: () => import('./views/task/Task.vue'),
      meta: {
        title: '编辑任务'
      }
    },
    {
      path: '/trail/add',
      name: 'trail/add',
      component: () => import('./views/trail/Trail.vue'),
      meta: {
        title: '新增线索'
      }
    },
    {
      path: '/trail/detail/:id',
      name: 'trail/detail',
      component: () => import('./views/trail/TrailDetail.vue')
    },
    {
      path: '/trail/edit/:id',
      name: 'trail/edit',
      component: () => import('./views/trail/Trail.vue'),
      meta: {
        title: '编辑线索'
      }
    },
    {
      path: '/selector',
      name: 'selector',
      component: () => import('./views/base/Selector.vue')
    },
    //艺人
    {
      path: '/artist/add',
      name: 'artistAdd',
      component: () => import('./views/artist/add.vue'),
      meta:{
        title:'新增艺人'
      }
    },
    {
      path: '/artist/edit/:id',
      name: 'artistEdit',
      component: () => import('./views/artist/add.vue'),
      meta:{
        title:'编辑艺人'
      }
    },
    {
      path: '/artist/basic/:id',
      name: 'artistBasic',
      component: () => import('./views/artist/basic.vue')
    },
    //博主
    {
      path: '/blogger/add',
      name: 'bloggerAdd',
      component: () => import('./views/blogger/add.vue'),
      meta: {
        title: '新增博主'
      }
    },
    {
      path: '/blogger/edit/:id',
      name: 'bloggerEdit',
      component: () => import('./views/blogger/add.vue'),
      meta: {
        title: '编辑博主'
      }
    }, 
    {
      path: '/blogger/basic/:id',
      name: 'bloggerBasic',
      component: () => import('./views/blogger/basic.vue')
    },
    //项目
    {
      path: '/project/basic/:id',
      name: 'projectBasic',
      component: () => import('./views/project/basic.vue')
    },
    //公告
    {
      path: '/notice',
      name: 'notice',
      redirect: '/notice/list',
      component: () => import('./views/notice/index.vue'),
      children:[
        {
          path: '/notice/list',
          name: 'noticeList',
          component: () => import('./views/notice/list.vue'),
          meta: {
            title: '公告',
            keepAlive: true
          }
        }, {
          path: '/notice/detail/:id',
          name: 'noticeDetail',
          component: () => import('./views/notice/detail.vue'),
          meta: {
            title: '公告详情'
          }
        },
      ]
    },
    // 客户
    {
      path: '/client/add',
      name: 'client/add',
      component: () => import('./views/client/Client.vue'),
      meta: {
        title: '新增客户'
      }
    },
    {
      path: '/client/edit/:id',
      name: 'client/edit',
      component: () => import('./views/client/Client.vue'),
      meta: {
        title: '编辑客户'
      }
    },
    {
      path: '/client/detail/:id',
      name: 'client/detail',
      component: () => import('./views/client/ClientDetail.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return {
          x: 0,
          y: 0
        }
      }
    }
})
