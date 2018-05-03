import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import Schedule from '@/components/Schedule'
import Login from '@/components/Login'
import Lock from '@/components/Lock'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Hello',
      component: Login
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/Schedule',
      name: 'Schedule',
      component: Schedule
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Lock',
      name: 'Lock',
      component: Lock
    }
  ]
})
