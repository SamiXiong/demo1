// 首页接口列表
// import request from '@/utils/request'
import request from '../utils/request'
import store from '../vuex/store'
import { mapState,mapActions,mapGetters } from "vuex";

// 获取主编推荐
export function getRecommendedList(params) {
    return request({
      url: '/api/novel/find/main_recommand',
      method: 'GET',
      params:params,
      headers:{
        
      }
    })
  }
  
  //获取banner图
  export function getBannerList() {
      return request({
        url: '/api/banner_pic/find',
        method: 'GET',
      })
  }
  
  //获取微信用户信息
  export function getWechatPublic() {
      return request({
        url: '/api/wechat_public/get_info',
        method: 'GET',
      })
  }
  //获取新书推荐
  export function getNewList(params) {
      return request({
        url: '/api/novel/find/is_new',
        method: 'GET',
        data:params
      })
  }
  
  //获取好书推荐
  export function getGoodRecommendedList(params) {
      return request({
        url: '/api/novel/find/good_recommand',
        method: 'GET',
        params:params
      })
  }
  //获取猜你喜欢列表
  export function getYouLike(params) {
      return request({
        url: '/api/system/uploadImage',
        method: 'GET',
        data:params
      })
    }
    //获取限时免费列表
  export function getFreeTime(params) {
    return request({
      url: '/api/novel/find/free_time',
      method: 'GET',
      data:params
    })
  }
    //获取畅销书单列表   
  export function getBestSelling(params) {
    return request({
      url: '/api/novel/find/range',
      method: 'GET',
      data:params
    })
  }
  