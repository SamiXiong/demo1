<template>
    <div class="app-container">
    <div>
        <header class="clearfix header">
            <img src="../assets/timg.jpg" alt="" v-if="!isAvater" class="avater">
            <img :src="url" alt="" class="avater" v-if="isAvater">
            <mt-search v-model="searchName"></mt-search>
        </header>
        <div class="tab">
            <span @click="changeTab(0)" class="tab-btn f-30 tab-btn-selecd">女频</span>
            <span @click="changeTab(1)" class="tab-btn f-30">男频</span>
        </div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,key,index) in bannerList" :key="index" style="margin-bottom:40px;">
                <img :src="item.img" alt="" class="bannerImg">
            </mt-swipe-item>
        </mt-swipe>
        <div class="species">
            <router-link to="/novel_type">
                <span class="species-type f-30">
                <img src="../assets/type1.png" alt="">
                分类
            </span>
            </router-link>
            <router-link to="/novel_list/range">
                <span class="species-type f-30">
                <img src="../assets/type2.png" alt="">
                排行
            </span>
            </router-link>
            <router-link to="/novel_list/free_time">
                <span class="species-type f-30">
                <img src="../assets/type3.png" alt="">
                免费
            </span>
            </router-link>
            <router-link to="/novel_list/novel_status">
                <span class="species-type f-30">
                <img src="../assets/type4.png" alt="">
                完本
            </span>
            </router-link>
        </div>
      <!-- <search :auto-fixed="false"
      @on-submit = "search"
      v-model="searchName"
      ></search> -->
    
      <!-- <button-tab v-model="currentTab">
        <button-tab-item @on-item-click="changeTab()">女频</button-tab-item>
        <button-tab-item @on-item-click="changeTab()">男频</button-tab-item>
      </button-tab> -->
      
      <!-- <swiper :list="bannerList" auto style="width:100%;margin:0 auto;" dots-class="custom-bottom" dots-position="center"></swiper> -->

      <!-- <grid :show-lr-borders="false" :show-vertical-dividers="false">
        <grid-item :link="{ path:'/novel_type' }">
          <img slot="icon" src="../assets/type1.png"/>
          <span slot="label">分类</span>
        </grid-item>
        <grid-item :link="{ path:'/novel_list/range' }">
          <img slot="icon" src="../assets/type2.png"/>
          <span slot="label">排行</span>
        </grid-item>
        <grid-item :link="{ path:'/novel_list/free_time' }">
          <img slot="icon" src="../assets/type3.png"/>
          <span slot="label">免费</span>
        </grid-item>
        <grid-item :link="{ path:'/novel_list/novel_status' }">
          <img slot="icon" src="../assets/type4.png"/>
          <span slot="label">完本</span>
        </grid-item>
      </grid> -->
      <!-- 主编推荐 -->
      <div class="recommended">
        <div class="the-title">
            <span class="title-name f-28">主编推荐</span>
            <span class="more">
              <router-link to='/novel_list/main_recommand'>
               更多
              <i></i>
              </router-link>
            </span>
        </div>
        <!-- <panel :list="mainRecommandList" type="1"></panel> -->
        <div class="clearfix">
          <router-link :to="{ name:'novel' , params: { id : firstRecommended.url}}">
            <div class="first-recommended clearfix">
               <img v-bind:src='firstRecommended.src' alt="" class="title-img">
              <div class="float:left">
                <span class="first-recommended-title">{{firstRecommended.title}}</span>
                <p class="first-recommended-title-desc">{{firstRecommended.desc}}</p>
              </div>
              <div class="first-recommended-foot">
                <span class="f-26 first-recommended-chapter"></span>
                <span class="f-26 first-recommended-type">{{firstRecommended.type}}</span>
              </div>
            </div>
          </router-link>
          <div class="other-recommended clearfix">
            <div class="one-recommended" v-for="(item,key) in mainRecommandList" :key="key">
              <router-link :to="{ name:'novel' , params: { id : item.url}}">
                 <img v-bind:src="item.src" alt="">
                <p class="f-24 one-recommended-title">{{item.title}}</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- 上架新书 -->
      <div class="new-book">
        <div class="the-title">
            <span class="title-name f-28">上架新书</span>
           <span class="more">
              <router-link to='/novel_list/is_new'>
               更多
              <i></i>
              </router-link>
            </span>
        </div>
        <div class="other-recommended clearfix">
            <div class="one-recommended" v-for="(item,key) in isNewList" :key="key">
              <router-link :to="{ name:'novel' , params: { id : item.url}}">
                 <img v-bind:src="item.src" alt="">
                <p class="f-24 one-recommended-title">{{item.title}}</p>
              </router-link>
            </div>
        </div>
      </div>
      <!-- <group>
        <cell title="上架新书" value="更多" is-link :link="{ path:'/novel_list/is_new' }"></cell>
      </group> -->
      <!-- <panel :list="isNewList" type="1"></panel> -->
      <!-- 精品推荐 -->
      <div class="new-book">
        <div class="the-title">
            <span class="title-name f-28">精品推荐</span>
            <span class="more">
              <router-link to='/novel_list/good_recommand'>
               更多
              <i></i>
              </router-link>
            </span>
        </div>
        <div class="good-recommended clearfix" v-for="(item,key) in goodRecommandList" :key="key">
            <router-link :to="{ name:'novel' , params: { id : item.url}}">
              <img v-bind:src="item.src" alt="" class="title-img">
              <div class="float:left">
                <span class="first-recommended-title">{{item.title}}</span>
                <p class="first-recommended-title-desc">{{item.desc}}</p>
              </div>
              <div class="good-recommended-foot">
                <span class="f-26 first-recommended-chapter"></span>
                <span class="f-26 first-recommended-type">{{item.type}}</span>
              </div>
            </router-link>
        </div>
      </div>
      <!-- <group>
        <cell title="精品推荐" value="更多" is-link :link="{ path:'/novel_list/good_recommand' }"></cell>
      </group> -->
      <!-- <panel :list="goodRecommandList" type="1"></panel> -->
    
      <!-- <group>
        <cell title="猜你喜欢" value="更多" is-link></cell>
      </group> -->
      <!-- 猜你喜欢 -->
      <div class="you-like">
        <div class="the-title">
            <span class="title-name f-28">猜你喜欢</span>
            <span class="more">
              <!-- <router-link to='/novel_list/you_like'> -->
              <router-link to='/novel_list/free_time'>
               更多
              <i></i>
              </router-link>
            </span>
        </div>
        <div class="other-recommended clearfix">
            <div class="like-recommended" v-for="(item,key) in isNewList" :key="key">
              <router-link :to="{ name:'novel' , params: { id : item.url}}">
                 <img v-bind:src="item.src" alt="">
                <p class="f-24 one-recommended-title">{{item.title}}</p>
              </router-link>
            </div>
        </div>
      </div>
      <!-- 限时免费 -->
      <!-- <group>
        <cell title="限时免费" value="更多" is-link :link="{ path:'/novel_list/free_time' }"></cell>
      </group> -->
      <div class="free-time">
        <div class="the-title">
            <span class="title-name f-28">限时免费</span>
            <span class="more">
              <router-link to='/novel_list/free_time'>
               更多
              <i></i>
              </router-link>
            </span>
        </div>
        <div class="other-recommended clearfix">
            <div class="one-recommended" v-for="(item,key) in isNewList" :key="key">
              <router-link :to="{ name:'novel' , params: { id : item.url}}">
                <img v-bind:src="item.src" alt="">
                <p class="f-24 one-recommended-title">{{item.title}}</p>
              </router-link>
            </div>
        </div>
      </div>
      <!-- <panel :list="freeTimeList" type="1"></panel> -->
      <!-- 畅销书单 -->
      <div class="rang-book">
         <div class="the-title">
            <span class="title-name f-28">畅销书单</span>
            <span class="more">
              <router-link to='/novel_list/range'>
               更多
              <i></i>
              </router-link>
            </span>
        </div>
        <ul class="rang-list">
          <li  v-for="(item,key) in isNewList" :key="key" class="f-30">
            <router-link :to="{ name:'novel' , params: { id : item.url}}">
              <span class="book-type f-30">
                【{{item.type}}】
              </span>
              {{item.title}}
            </router-link>
          </li>
        </ul>
      </div>
      <!-- <group>
        <cell title="畅销书单" value="更多" is-link :link="{ path:'/novel_list/range' }"></cell>
      </group>
      <panel :list="rangeList" type="1"></panel> -->

      <div style='text-align:center;'>
        <div class="f-28"><span>电话:{{ wechatPublicInfo.telephone }}</span><span style='margin-left:20px;'>时间:{{ wechatPublicInfo.work_time }}</span></div>
        <div class="f-28">QQ客服:{{ wechatPublicInfo.qq }}</div>
        <div style="text-algin:center"><img :src="wechatPublicInfo.qrcode" style='width: 50%;'/></div>
      </div>
    </div>
     <Foot></Foot>
  </div>
</template>
<script>
import $ from 'jquery';
import { getRecommendedList } from "../api/home.js";
import { Swipe, SwipeItem } from 'mint-ui';
import { Foot } from "../components/index.js";
export default {
  name: "Home",
  created() {
    this.currentTab = parseInt(window.localStorage.getItem('firstType') || '0');
    this.currentType = this.currentTab;

    this.getBannerPic();
    this.refreshPage();
    this.getWechatPublic();
      $(function(){
          $('.tab span').each(function(){
                $(this).click(function(){
                    $(".tab span").addClass("tab-btn").removeClass("tab-btn-selecd");
                    $(this).addClass("tab-btn-selecd").removeClass("tab-btn");
                })
            
            });
        
      })
  },
  
  data() {
    return {
      id:"",
      searchName:"",
      currentTab: 0,
      currentType: 0,
      searchName: "",
      mainRecommandList: [],
      isNewList: [],
      goodRecommandList: [],
      freeTimeList: [],
      rangeList: [],
      bannerList: [],
      wechatPublicInfo: {},
      firstRecommended: {},
      userInfo:{},
      url:'',
      isAvater:false
    };
  },
  components: {
    Foot,
   
  },
  methods: {
    search() {
      console.log(this.searchName);
    },
    demo(id){
        alert(id)
    },
    changeTab(item) {
      if (this.currentTab == this.cFurrentType) {
        return;
      }
      this.currentTab = item  
      window.localStorage.setItem("firstType", this.currentTab);
    //   this.currentType = this.currentTab;
      this.refreshPage();
    },
    refreshPage() {
      this.getMainRecommand();
      this.getIsNew();
      this.getGoodRecommand();
      this.getFreeTime();
      this.getRange();
      this.getUserInfo()
    },
    getBannerPic() {
      let self = this;
      this.axios
        .get("/api/banner_pic/find")
        .then(function(response) {
          let data = response.data;
          if (data.length > 0) {
            for (let i in data) {
              self.bannerList.push({
                url: "javascript:",
                img: data[i]["img"]
              });
            }
          }
        })
        .catch(function(err) {});
    },
    getUserInfo() {
      let self = this;
      this.axios('/api/user/get_info')
        .then(function (response) {
          let data = response.data;
          self.userInfo = data;
          console.log(self.userInfo)
          if(data.headimageurl||data.headimageurl.length>0){
              self.isAvater = true
              self.url = data.headimageurl
          }
        })
        .catch(function (err) {
          
        });
    },
    getWechatPublic() {
      let self = this;
      this.axios
        .get("/api/wechat_public/get_info")
        .then(function(response) {
          let data = response.data;
          self.wechatPublicInfo = data;
        })
        .catch(function(err) {});
    },
    getMainRecommand() {
      let self = this;
        let params = {
            page:1,
            limit:4,
            firstType:this.currentTab
        }
        getRecommendedList(params).then(res=>{
          self.mainRecommandList = [];
          console.log(res)
          let totalCount = res.data.total_count;
          if (totalCount > 0) {
            let data = res.data.data;
            // for (let i in data) {
            //   self.mainRecommandList.push({
            //     src: data[i]['img'],
            //     title: data[i]['title'],
            //     desc: data[i]['introduction'],
            //     // url: '/novel/' + data[i]['id']
            //     url: data[i]['id']
            //   });
            // }
            for (let i = 0; i <= 3; i++) {
              self.mainRecommandList.push({
                src: data[i]["img"],
                title: data[i]["title"],
                desc: data[i]["introduction"],
                // url: '/novel/' + data[i]['id']
                url: data[i]["id"],
                type: data[i]["novel_type"]
              });
            }
            self.firstRecommended = self.mainRecommandList[0];
            console.log(self.firstRecommended)
            self.mainRecommandList.splice(0, 1);
          }
        }).catch(err=>{
        })
      // this.axios
      //   .get(
      //     "/api/novel/find/main_recommand?page=1&limit=4&firstType=" +
      //       this.currentTab
      //   )
      //   .then(function(response) {
      //     self.mainRecommandList = [];
      //     let totalCount = response.data.total_count;
      //     if (totalCount > 0) {
      //       let data = response.data.data;
      //       // for (let i in data) {
      //       //   self.mainRecommandList.push({
      //       //     src: data[i]['img'],
      //       //     title: data[i]['title'],
      //       //     desc: data[i]['introduction'],
      //       //     // url: '/novel/' + data[i]['id']
      //       //     url: data[i]['id']
      //       //   });
      //       // }
      //       for (let i = 0; i <= 3; i++) {
      //         self.mainRecommandList.push({
      //           src: data[i]["img"],
      //           title: data[i]["title"],
      //           desc: data[i]["introduction"],
      //           // url: '/novel/' + data[i]['id']
      //           url: data[i]["id"],
      //           type: data[i]["novel_type"]
      //         });
      //       }
      //       self.firstRecommended = self.mainRecommandList[0];
      //       self.mainRecommandList.splice(0, 1);
      //     }
      //   })
      //   .catch(function(err) {});
    },
     getIsNew() {
      let self = this;
      this.$http.get('/api/novel/find/is_new?page=1&limit=4&firstType=' + this.currentTab)
        .then(function (response) {
          self.isNewList = [];
          let totalCount = response.data.total_count;
          if (totalCount > 0) {
            let data = response.data.data;
            // for (let i in data) {
            //   self.isNewList.push({
            //     src: data[i]['img'],
            //     title: data[i]['title'],
            //     desc: data[i]['introduction'],
            //     url: data[i]['id']
            //   });
            // }
            for( let i =0 ;i<3;i++){
               self.isNewList.push({
                type:data[i]['novel_type'],
                src: data[i]['img'],
                title: data[i]['title'],
                desc: data[i]['introduction'],
                url: data[i]['id']
              });
            }
          }
        })
        .catch(function (err) {
          
        });
    },
    getGoodRecommand() {
      let self = this;
      this.$http.get('/api/novel/find/good_recommand?page=1&limit=4&firstType=' + this.currentTab)
        .then(function (response) {
          self.goodRecommandList = [];
          let totalCount = response.data.total_count;
          if (totalCount > 0) {
            let data = response.data.data;
            for(let i=0;i<3;i++){
               self.goodRecommandList.push({
                src: data[i]['img'],
                title: data[i]['title'],
                desc: data[i]['introduction'],
                url: data[i]['id'],
                type:data[i]['novel_type']
              });
            }
          }
        })
        .catch(function (err) {
          
        });
    },
    getYouLike() {

    },
    getFreeTime() {
      let self = this;
      this.$http.get('/api/novel/find/free_time?page=1&limit=4&firstType=' + this.currentTab)
        .then(function (response) {
          self.freeTimeList = [];
          let totalCount = response.data.total_count;
          if (totalCount > 0) {
            let data = response.data.data;
            for (let i in data) {
              self.freeTimeList.push({
                src: data[i]['img'],
                title: data[i]['title'],
                desc: data[i]['introduction'],
                url: data[i]['id']
              });
            }
          }
        })
        .catch(function (err) {
          
        });
    },
    getRange() {
      let self = this;
      this.$http.get('/api/novel/find/range?page=1&limit=10&firstType=' + this.currentTab)
        .then(function (response) {
          self.rangeList = [];
          let totalCount = response.data.total_count;
          if (totalCount > 0) {
            let data = response.data.data;
            for (let i in data) {
              self.rangeList.push({
                src: data[i]['img'],
                title: data[i]['title'],
                desc: data[i]['introduction'],
                url: data[i]['id']
              });
            }
          }
        })
        .catch(function (err) {
          
        });
    },
  }
};
</script>


