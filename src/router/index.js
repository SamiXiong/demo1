import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/HelloWorld'
import Home from '../views/Home.vue'
import NovelList from '../views/NovelList'
import NovelType from '../views/NovelType'
import Recharge from '../views/Recharge'
import MyCenter from '../views/MyCenter'
import VipRecharge from '../views/VipRecharge'
import SignIn from '../views/SignIn'
import RechargeSignInLog from '../views/RechargeSignInLog'
import ConsumeLog from '../views/ConsumeLog'
import BookStore from '../views/BookStore'
import ReadLog from '../views/ReadLog'
import Novel from '../views/Novel'
import ChapterList from '../views/ChapterList'
import NovelChapter from '../views/NovelChapter'
import Search from '../views/Search'
import SearchDetail from '../views/SearchDetail'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      name: "novel_list",
      path: '/novel_list/:type',
      component: NovelList
    }, {
      name: "novel_type",
      path: '/novel_type',
      component: NovelType
    }, {
      name: "recharge",
      path: '/recharge',
      component: Recharge
    }, {
      name: "my_center",
      path: '/my_center',
      component: MyCenter
    }, {
      name: "vip_recharge",
      path: '/vip_recharge',
      component: VipRecharge
    }, {
      name: "signin",
      path: '/signin',
      component: SignIn
    }, {
      name: "recharge_signin_log",
      path: '/recharge_signin_log',
      component: RechargeSignInLog
    }, {
      name: "consume_log",
      path: '/consume_log',
      component: ConsumeLog
    }, {
      name: "book_store",
      path: '/book_store',
      component: BookStore
    }, {
      name: "read_log",
      path: '/read_log',
      component: ReadLog
    }, {
      name: "novel",
      path: '/novel/:id',
      component: Novel
    }, {
      name: "chapter_list",
      path: '/chapter_list/:id',
      component: ChapterList
    }, {
      name: "novel_chapter",
      path: '/novel_chapter/:novel_id/:id',
      component: NovelChapter
    },
    {
      name: "search",
      path: '/search',
      component: Search
      // 搜索模块
    },
    {
      name:"search_detail",
      path:'/search_detail/:title',
      component:SearchDetail
      // 搜索详细页
    }
  ]
})
