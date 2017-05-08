// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Hello from './components/Hello'
import HelloFromVux from './components/HelloFromVux'
import Test from './components/Test.vue'
import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)
import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)
import Vuex from 'vuex'
Vue.use(Vuex)
let store = new Vuex.Store({

})
store.registerModule('vux', { // 名字自己定义
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})
Vue.use(VueRouter)
const routes = [
  {
  path: '/',
  component: Hello
  },
  {
  path: '/HelloFromVux',
  component: HelloFromVux
  },
  {
  path: '/Test',
  component: Test
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})
router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
  if (window.ga) {
    window.ga('set', 'page', to.fullPath) // 你可能想根据请求参数添加其他参数，可以修改这里的 to.fullPath
    window.ga('send', 'pageview')
  }
})
FastClick.attach(document.body)



/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
