import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


import HelloWorld from '@/components/HelloWorld'
import count from '@/vuex/Count'


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
    	path: '/vuex',
    	component: count
    }
  ]
})
