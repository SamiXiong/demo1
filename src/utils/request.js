import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
import store from '../vuex/store'
// import { getToken,removeToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  // baseURL: '/trc',
  baseURL: '',
  timeout: 5000 // 请求超时时间
})
// console.log(res)
// if(res.data.code == 401 || res.data.code == 2100){
//   removeToken()
//   router.push({path: '/login'})
// }
service.interceptors.request.use(config=>{
  const token = localStorage.getItem("host") + '+' + localStorage.getItem("openid");
  if(token){
    config.headers['Authorization'] = token
  }
  return config
},error=>{
  console.log(error)
  Promise.reject(error)
}
)

export default service