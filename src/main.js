import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import 'lib-flexible'
import './style/index.css'
import axios from 'axios'
import FastClick from 'fastclick'
import store from "./vuex/store"
import '../src/assets/iconFont/iconfont.css'
import 'mint-ui/lib/style.css';
Vue.config.productionTip = false
import VueAxios from 'vue-axios'
var infiniteScroll =  require('vue-infinite-scroll');
Vue.use(infiniteScroll);
Vue.use(VueAxios,axios);
// axios.defaults.baseURL = 'http://api1.fox2338.wang'
Vue.use(Mint);

console.log(axios.interceptors)

axios.interceptors.request.use(
  config => {
    // 这里写死一个token，你需要在这里取到你设置好的token的值
    const token = localStorage.getItem("host") + '+' + localStorage.getItem("openid");
    store.commit('SETTOKEN',token)
    if (token) {
        // 这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
        config.headers.Authorization = token;
        axios.defaults.headers['Authorization'] = token;
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
);
FastClick.attach(document.body)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
