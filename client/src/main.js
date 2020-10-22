import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Vuex from "vuex"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// function myxx () {
// 	console.log(66661111)
// 	var x=200
// 	// console.log(this)
// 	Vue.prototype.$x=x
// }
// Vue.use(myxx)
Vue.use(Vuex);
Vue.use(ElementUI);

const store = new Vuex.Store({

  state: {
    msg: "共享数据",
    arr: []
  },
  mutations: {
    //默认传第一个参数传state
    increment(state, obj) {
      // 变更状态
      state.arr = obj.n
    }
  }

})

axios.defaults.baseURL = " http://10.55.58.252:7001/"
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
