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
      component: () => import('./views/task/Task.vue')
    },
    {
      path: '/task/detail/:id',
      name: 'task/detail',
      component: () => import('./views/task/TaskDetail.vue')
    },
    {
      path: '/task/edit/:id',
      name: 'task/edit',
      component: () => import('./views/task/Task.vue')
    },
    {
      path: '/trail/add',
      name: 'trail/add',
      component: () => import('./views/trail/Trail.vue')
    },
    {
      path: '/trail/detail/:id',
      name: 'trail/detail',
      component: () => import('./views/trail/TrailDetail.vue')
    },
    {
      path: '/trail/edit/:id',
      name: 'trail/edit',
      component: () => import('./views/trail/Trail.vue')
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
      component: () => import('./views/artist/add.vue')
    },
    {
      path: '/artist/edit/:id',
      name: 'artistEdit',
      component: () => import('./views/artist/add.vue')
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
      component: () => import('./views/blogger/add.vue')
    },
    {
      path: '/blogger/edit/:id',
      name: 'bloggerEdit',
      component: () => import('./views/blogger/add.vue')
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
      path: '/notice/list',
      name: 'noticeList',
      component: () => import('./views/notice/list.vue')
    },
    {
      path: '/notice/detail/:id',
      name: 'noticeDetail',
      component: () => import('./views/notice/detail.vue')
    },
  ]
})
