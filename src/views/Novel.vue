<template>
  <div class="app-container">
    <Foot></Foot>
    <div>
        <!-- 书籍基本信息 -->
        <div class="book-info clearfix">
            <div class="left clearfix">
                <img :src="novelInfo.img" alt="">
            </div>
            <div class="left clearfix">
                <p class="f-33">{{novelInfo.title}}</p>
                <p class="one-info f-26">书  号:{{ novelInfo.novel_no }}(回复{{ novelInfo.novel_no }}即可阅读)</p>
                <p class="one-info f-26">状  态:{{ novelInfo.novel_status == 'loading' ? '连载中': '完结' }}</p>
                <p class="one-info f-26">作  者:{{ novelInfo.author }}</p>
                <p class="one-info f-26">字  数:{{ novelInfo.total_word }}</p>
                <p class="one-info f-26">版  权:由{{ novelInfo.copyright }}授权发布</p>
            </div>
        </div>
    
        <div class="one-info-btn clearfix">
            <span class="one-info-see-btn">开始阅读</span>
            <button class="one-info-add-btn" @click="joinBookStore()" :disabled="joinBookStoreDisable">{{ bookStoreActionTitle }}</button>
        </div>
        <div class="book-synopsis">
            <p class="book-synopsis-title f-30">
                简介
            </p>
            <p class="book-synopsis-content f-26">{{ novelInfo.introduction }}</p>
        </div>
        <!-- 目录模块 -->
        <div class="book-directory">
            <p class="book-directory-title f-30 clearfix">
                目录
                <span class="right f-26" style="color:#b6b6b6">
                    最新更新：{{novelInfo.updated_time}}
                </span>
            </p>
            <div v-for="(item,key) in novelChapters" :key="key">
                <mt-cell :title=item.num+item.title is-link class="cell" :to = item.url >
                </mt-cell>
            </div>
            <router-link :to="{ name:'chapter_list' , params: { id : novelId}}">
              <div class="all-directory f-26" >全部目录</div>
            </router-link>
        </div>
        <!-- 打赏点赞模块 -->
        <div class="book-like clearfix">
            <div class="like left clearfix">
                <div class="clearfix">
                     <i class="icon iconfont icon-dianzan like-icon left" ></i>
                     <div class="clearfix left ">
                        <p class="f-30" style="margin-bottom:6px;">{{ novelInfo.like_num }}</p>
                        <p class="f-26" style="color:#9f9f9f">点赞</p>
                     </div>
                </div>
                <button class="book-like-btn" @click="setLike()" :disabled="isGiveLike">我要点赞</button>
            </div>
            <div class="exceptional clearfix left">
                <div class="clearfix">
                     <i class="icon iconfont icon-qiandai money-icon left" ></i>
                     <div class="clearfix left">
                        <p class="f-30" style="margin-bottom:6px;">{{ novelInfo.like_num }}</p>
                         <p class="f-26" style="color:#9f9f9f">打赏</p>
                     </div>
                </div>
                <p class="book-exceptional-btn" @click="award()">我要打赏</p>
            </div>
        </div>
        <!-- 打赏榜单 -->
      <div class="award">
          <p class="award-title f-30">
              打赏榜单
          </p>
          <ul class="award-list">
             <li class="award-first clearfix">
                  <div class="left">
                        <span class="rank">1</span>
                        <img src="../assets/timg.jpg" alt="" v-if="!isAvater">
                        <img :src="first.img" alt="" v-if="isAvater">
                        <span class="f-30">{{first.name}}</span>
                  </div>
                  <div class="right right-money">
                      <span class="">
                           <i class="icon iconfont icon-qiandai" ></i>
                            <span class="award-money">{{first.money}}</span>
                      </span>
                  </div>
              </li>
              <li class="award-first clearfix">
                  <div class="left">
                        <span class="rank" style="background-color:#e9a914">2</span>
                        <img src="../assets/timg.jpg" alt="" v-if="!isAvater">
                        <img :src="second.img" alt="" v-if="isAvater">
                        <span class="f-30">{{second.name}}</span>
                  </div>
                  <div class="right right-money">
                      <span class="">
                           <i class="icon iconfont icon-qiandai" ></i>
                            <span class="award-money">{{second.money}}</span>
                      </span>
                  </div>
              </li>
              <li class="award-first clearfix">
                  <div class="left">
                        <span class="rank" style="background-color:#f4d24a">3</span>
                        <img src="../assets/timg.jpg" alt="" v-if="!isAvater">
                        <img :src="three.img" alt="" v-if="isAvater">
                        <span class="f-30">{{three.name}}</span>
                  </div>
                  <div class="right right-money">
                      <span class="">
                           <i class="icon iconfont icon-qiandai" ></i>
                            <span class="award-money">{{three.money}}</span>
                      </span>
                  </div>
              </li>
          </ul>
          <div class="all-directory f-26" style="color:#222">查看全部</div>
      </div>
      <!-- 全部评论 -->
      <!-- <div class="all-comments">
          <div class="clearfix all-comments-head">
               <div class="all-comments-title f-30 left">全部评论</div>
               <div class="right write-comment f-28">发表评论</div>
          </div>
          <ul class="all-comments-content clearfix">
              <li class="one-comments">
                  <div class="one-comments-head clearfix">
                      <img src="../assets/timg.jpg" alt="" v-if="!isAvater" class="left">
                        <img :src="second.img" alt="" v-if="isAvater">
                        <div class="left">
                            <p class="comment-name">圈圈圆圆</p>
                            <p>10-28 22-20</p>
                            <i class="icon iconfont icon-qiandai" ></i>
                        </div>
                  </div>
                  <div class="one-comments-content">
                    <p  class="comments-gift f-26">赚送<i class="icon iconfont icon-jinbi"></i>x 1个礼物给作者</p>
                    <p class="comments-content f-26">支持作者文思泉涌，妙笔生花</p>
                  </div>
              </li>
              <li class="one-comments">
                  <div class="one-comments-head clearfix">
                      <img src="../assets/timg.jpg" alt="" v-if="!isAvater" class="left">
                        <img :src="second.img" alt="" v-if="isAvater">
                        <div class="left">
                            <p class="comment-name">圈圈圆圆</p>
                            <p>10-28 22-20</p>
                            <i class="icon iconfont icon-qiandai" ></i>
                        </div>
                  </div>
                  <div class="one-comments-content">
                    <p  class="comments-gift f-26">赚送<i class="icon iconfont icon-jinbi"></i>x 1个礼物给作者</p>
                    <p class="comments-content f-26">支持作者文思泉涌，妙笔生花</p>
                  </div>
              </li>
          </ul>
      </div> -->
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import { Foot } from '../components/index.js'
export default {
  name: 'Novel',
  components: {
    Foot
  },
  created() {
    let date = new Date()
    let year = date.getFullYear(); //年
    let month = date.getMonth() + 1;  //月
    let day = date.getDate(); //日
    let nowTime = Math.round(Date.parse(year+month+day)/1000).toString()
    this.time = localStorage.getItem('time')
    if(nowTime==this.time){
      this.isGiveLike = true;
      console.log(this.isGiveLike)
    }
    this.novelId = this.$route.params.id;
    this.footer.url = '/chapter_list/' + this.novelId;
    this.getNovelInfo();
    this.getIsJoinBookStore();
    this.getNovelChapter();
    this.getAward();
  },
  data () {
    return {
      time:0,
      isGiveLike:false,
      isAvater:false,
      url:'../assets/timg.jpg',
      novelId: 0,
      novelInfo: {},
      novelChapters: [],
      first:{
              name:"第一名",
              money:"1000",
              img:""
      },
      second:{
              name:"第二名",
              money:"700",
              img:"",
      },
      three:{
              name:"第三名",
              money:"500",
              img:""
      },
      awards: [],
      bookStoreActionTitle: '添加书架',
      joinBookStoreDisable: false,
      footer: {
        title: '更多',
        url: ''
      },
    }
  },
  methods: {
    getNovelInfo() {
      let self = this;
      this.axios.get('/api/novel/get/' + this.novelId)
        .then(function (response) {
          self.novelInfo = response.data;
        })
        .catch(function (err) {
          
        });
    },
    getIsJoinBookStore() {
      let self = this;
      this.axios.get('/api/book_store/is_join/' + this.novelId)
        .then(function (response) {
          if (response.data.isJoin) {
            self.bookStoreActionTitle = '已添加书架';
            self.joinBookStoreDisable = true;
          } else {
            self.bookStoreActionTitle = '添加书架';
            self.joinBookStoreDisable = false;
          }
        })
        .catch(function (err) {
          
        });
    },
    getNovelChapter() {
      let self = this;
      this.axios.get('/api/novel_chapter/list/' + this.novelId + '?page=1')
        .then(function (response) {
          let data = response.data.data;
          for (let i =0;i<3 ;i++) {
            self.novelChapters.push({
              src: '',
              num:data[i]['chapter_no'],
              title: data[i]['title'],
              desc: '',
              url: '/novel_chapter/' + self.novelId + '/' + data[i]['id']
            });
          }
          console.log(self.novelChapters)
        })
        .catch(function (err) {
          
        });
    },
    getAward() {
      let self = this;
      this.axios.get('/api/award/list/' + this.novelId)
        .then(function (response) {
          let data = response.data.data;
          console.log(data)
          self.awards = [];
          for (let i in data) {
            self.awards.push({
              src: '',
              title: data[i]['nickname'] + ' ' + data[i]['virtual_money'],
              desc: '',
              url: ''
            });
          }
        //   self.first = self.awards[0]
        //   self.second = self.awards[1]
        //   self.three = self.awards[2]
        //   console.log(1)
        //   console.log(2)
        //   console.log(3)
        })
        .catch(function (err) {
          
        });
    },
    submit() {
      
    },
    joinBookStore() {
      let self = this;
      this.axios.post('/api/book_store/create', { novelId: this.novelId })
        .then(function (response) {
          self.bookStoreActionTitle = '已添加书架';
          self.joinBookStoreDisable = true;

        //   self.alertTitle = '提示';
        //   self.alertContent = response.data.msg;
        //   self.showModuleAuto();
          MessageBox('提示', response.data.msg);
        })
        .catch(function (err) {
        //   self.alertTitle = '提示';
        //   self.alertContent = err.response.data.msg;
        //   self.showModuleAuto();
           MessageBox('提示', err.response.data.msg);
        });
    },
    setLike() {
      let self = this;
      this.axios.post('/api/novel/set_like/' + this.novelId)
        .then(function (response) {
          let date = new Date()
          let year = date.getFullYear(); //年
          let month = date.getMonth() + 1;  //月
          let day = date.getDate(); //日
          let time = Math.round(Date.parse(year+month+day)/1000).toString()
          localStorage.setItem('time', time)
          self.novelInfo.like_num = response.data.like_num;
          self.isGiveLike = true;
          MessageBox('提示', response.data.msg);
        })
        .catch(function (err) {
         MessageBox('提示', err.response.data.msg);
        });
    },
    award() {
      let self = this;
      this.axios.post('/api/award/create/' + this.novelId, { virtualMoney: 10 })
        .then(function (response) {
          MessageBox('提示', response.data.msg);

          self.getAward();
        })
        .catch(function (err) {
          MessageBox('提示', err.response.data.msg);
        });
    },
    showModule () {
      AlertModule.show({
        title: this.alertTitle,
        content: this.alertContent,
        onShow () {
        },
        onHide () {
        }
      })
    },
    showModuleAuto () {
      this.showModule();
      setTimeout(() => {
        AlertModule.hide()
      }, 3000);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ximg-demo {
  width: 100%;
  height: auto;
}
</style>
