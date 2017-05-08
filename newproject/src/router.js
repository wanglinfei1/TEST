import Vue from 'vue'
import Router from 'vue-router'
import wang from './components/wang.vue'
import appTest from './components/appTest.vue'
import test from './components/test.vue'
import test1 from './components/test1.vue'
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', component: wang,
    },
    {
      path: '/appTest', component: appTest,
      children: [
        {path: 'test', component: test},
        {path: 'test1', component: test1}
      ]
    },
  ]
})

