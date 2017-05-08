/**
 * Created by Administrator on 2017/2/17.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state= {
  todos: [
    { id: 1, text: '...', done: true },
    { id: 2, text: '...', done: false }
  ],
    count: 0
};
const getters= {
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  }
};
const mutations= {
  increment: (state,obj) => state.count+=obj.num,
  decrement: (state,n) => state.count=n
};
const actions= {
  increment (context,obj) {
    return new Promise((resolve, reject) => {
      setTimeout(function(){
        context.commit('increment',obj);
        resolve()
      },1000);
    })
  }
};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
