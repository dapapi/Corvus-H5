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
      path: '/selector',
      name: 'selector',
      component: () => import('./views/base/Selector.vue')
    },
    {
      path: '/artist/add',
      name: 'artistAdd',
      component: () => import('./views/artist/add.vue')
    },
    {
      path: '/artist/basic',
      name: 'artistBasic',
      component: () => import('./views/artist/basic.vue')
    }
  ]
})
