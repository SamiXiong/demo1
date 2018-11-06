<template>
  <div class="app-container">

        <!-- <a-input-search placeholder="请输入书名,不要打错哦~" @search="onSearch" class="search-input"/> -->
       <!-- <search :auto-fixed="false"
        @on-submit = "search"
        v-model="searchName"
        ></search> -->
        <!-- <header>
            <mt-search v-model="searchName" class="Type-search"></mt-search>
        </header> -->
    <div class="search-box clearfix">
            <input type="text" v-model="searchName" placeholder="宁可少输字，不要输错字哦~" class="search-input left">
            <span class="search-btn right" @click="search()">
                <i class="icon iconfont icon-sousuo"></i>
            </span>
    </div>
    <div class="content">
        <div class="one clearfix">
            <div class="class-type f-30">【分类】:</div>
            <div class="little-type clearfix">
              <div v-for="(item,key) in secondTypeItems" :key="key" class="one-type">
                <span  class="one-type" @click=" checkerItemChange(item,key,'second')" :class="{'one-type-selected':key==second}">{{item.value}}</span>
              </div>
            </div>
        </div>
        <div class="two clearfix">
            <div class="class-type f-30">【频道】:</div>
            <div class="little-type">
              <div class="one-type" v-for="(item, key) in firstTypeItems" :key="key">
                <span  class="one-type" @click=" checkerItemChange(item,key,'first')" :class="{'one-type-selected':key==first}">{{item.value}}</span>
              </div>
            </div>
        </div>
        <div class="three clearfix">
            <div class="class-type f-30">【状态】:</div>
            <div class="little-type">
              <div class="one-type" v-for="(item, key) in novelTypeItems" :key="key">
                <span  class="one-type" @click=" checkerItemChange(item,key,'novelType')" :class="{'one-type-selected':key==novelType}">{{item.value}}</span>
              </div>
            </div>
        </div>
        <div class="four clearfix">
            <div class="class-type f-30">【排序】:</div>
            <div class="little-type">
              <div class="one-type" v-for="(item, key) in sortTypeItems" :key="key">
                <span  class="one-type" @click=" checkerItemChange(item,key,'sortType')" :class="{'one-type-selected':key==sortType}">{{item.value}}</span>
              </div>
            </div>
        </div>
      <!-- <flexbox class="input-box">
        <flexbox-item :span="3" class="f-30 type" style="padding-left:15px;">【分类】:</flexbox-item>
        <flexbox-item :span="8">
          <checker v-model="secondType" default-item-class="demo1-item" selected-item-class="demo1-item-selected" @on-change="checkerItemChange">
            <checker-item :value="item.key" v-for="(item, index) in secondTypeItems" :key="index">{{item.value}}</checker-item>
          </checker>
        </flexbox-item>
      </flexbox>
      <flexbox class="input-box">
        <flexbox-item :span="3" class="f-30 type" style="padding-left:15px;">【频道】:</flexbox-item>
        <flexbox-item :span="8">
          <checker v-model="firstType" default-item-class="demo1-item" selected-item-class="demo1-item-selected" @on-change="checkerItemChange">
            <checker-item :value="item.key" v-for="(item, index) in firstTypeItems" :key="index">{{item.value}}</checker-item>
          </checker>
        </flexbox-item>
      </flexbox>
      <flexbox class="input-box">
        <flexbox-item :span="3" class="f-30 type" style="padding-left:15px;">【状态】:</flexbox-item>
        <flexbox-item :span="8">
          <checker v-model="novelStatus" default-item-class="demo1-item" selected-item-class="demo1-item-selected" @on-change="checkerItemChange">
            <checker-item value="">全部</checker-item>
            <checker-item value="loading" style="padding:5px 15px 5px 11px;">连载</checker-item>
            <checker-item value="finish" style="padding:5px 15px 5px 11px;">完结</checker-item>
          </checker>
        </flexbox-item>
      </flexbox>
      <flexbox class="input-box">
        <flexbox-item :span="3" class="f-30 type" style="padding-left:15px;">【排序】:</flexbox-item>
        <flexbox-item :span="8">
          <checker v-model="sort" default-item-class="demo1-item" selected-item-class="demo1-item-selected" @on-change="checkerItemChange">
            <checker-item value="">全部</checker-item>
            <checker-item value="is_new"  style="padding:5px 15px 5px 11px;">最新</checker-item>
            <checker-item value="range" style="padding:5px 15px 5px 11px;">热门</checker-item>
          </checker>
        </flexbox-item>
      </flexbox> -->
      </div>
      <div class="blank"></div>
      <!-- 新列表 -->
       <mt-loadmore :top-method="refresh" ref="loadmore" 
        topPullText=""
       >
        <div
            class="demo-infinite-container"
            v-infinite-scroll=" loadMore"
            :infinite-scroll-disabled="busy"
            :infinite-scroll-distance="10"
          >
          <div class="good-recommended clearfix" v-for="(item,key) in novelList" :key="key">
            <router-link :to="{ name:'novel' , params: { id : item.url}}">
              <img v-bind:src="item.src" alt="" class="list-title-img">
              <div class="float:left">
                <span class="first-recommended-title f-30">{{item.title}}</span>
                <p class="first-recommended-title-desc f-26">{{item.desc}}</p>
              </div>
            </router-link>
          </div>
        </div>
      </mt-loadmore>
      <!-- 老列表 -->
      <!-- <scroller lock-x scrollbar-y use-pullup use-pulldown height="100%" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
        <div class="box2">
          <panel :list="novelList" type="1"></panel>
        </div> -->
        <!--pullup slot-->
        <!-- <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
          <span v-show="status.pullupStatus === 'default'"></span>
          <span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
          <span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
        </div>
      </scroller> -->

      <!--<panel :list="novelList" type="1"></panel>-->
    <Foot></Foot>
  </div>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
import { Indicator,Toast } from 'mint-ui';
import { Foot } from "../components/index.js";
export default {
  directives: { infiniteScroll },
  name: 'NovelType',
  components: {
    Foot,
  },
  created() {
    this.getNovelType();
    this.getData('load');
  },
  data () {
    return {
      paymentMainPersonnel:1,
      firstTypeItems: [{
        key: '',
        value: '全部'
      }],
      secondTypeItems: [{
        key: '',
        value: '全部'
      }],
      sortTypeItems:[
        {
          key:'',
          value:"全部"
        },
        {
          key:'is_new',
          value:"最新"
        },
        {
          key:"range",
          value:"热门"
        }
      ],
      novelTypeItems:[
        {
          key:'',
          value:'全部'
        },
        {
          key:'loading',
          value:"连载"
        },
        {
          key:'finish',
          value:"完结"
        }
      ],
      searchName:"",
      loading: false,
      busy: false,
      novelList: [],
      first:'',
      second:'',
      sortType:'',
      novelType:'',
      firstType: '',
      secondType: '',
      novelStatus: '',
      sort: '',
      curPage: 1,
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      }
    }
  },
  methods: {
    checkerItemChange(item,index,type) {
      if(type=="second"){
        this.second = index
        this.secondType = item.key
      }else if(type=='first'){
        this.first = index
        this.firstType = item.key
      }else if(type == 'sortType'){
        this.sortType = index
        this.sort = item.key
      }else if(type == 'novelType'){
        this.novelType = index
        this.novelStatus = item.key
      }
      this.curPage = 1;
      this.getData('load');
    },
    search(){
       if(this.searchName==""){
              Toast({
                  message: '搜索内容不能为空哦',
                  position: 'middle',
                  duration: 5000
              });
          }else if(this.searchName!==""){
              this.$router.push({path:'/search_detail/'+this.searchName})
          }
    },
    loadMore () {
      this.curPage++;
      this.getData('pullup');
    },
    refresh() {
      this.curPage = 1;
      this.getData('pulldown');
      this.$refs.loadmore.onTopLoaded();
    },
    getData(type) {
      let self = this;
      this.$http.get('/api/novel/find/type?page=' + this.curPage + '&firstType=' + this.firstType 
        + '&secondType=' + this.secondType + '&novelStatus=' + this.novelStatus + '&sort=' + this.sort)
        .then(function (response) {
          if (type == 'pullup') {
            // self.$refs.scroller.donePullup();
          } else if (type == 'pulldown') {
            self.novelList = [];
            // self.$refs.scroller.donePulldown();
            // self.$refs.scroller.enablePullup();
          } else {
            self.novelList = [];
          }

          let totalCount = response.data.total_count;
          if (totalCount > 0) {
            let data = response.data.data;
            for (let i in data) {
              self.novelList.push({
                src: data[i]['img'],
                title: data[i]['title'],
                desc: data[i]['introduction'],
                url: data[i]['id']
              });
            }
          }else{
            this.busy = true;
          }
        })
        .catch(function (err) {
          
        });
    },
    getNovelType() {
      let self = this;
      this.$http.get('/api/novel_type/find/all')
        .then(function (response) {
          let data = response.data;
          for (let i in data) {
            if (data[i]['parent_id'] == 0) {
              self.firstTypeItems.push({
                key: data[i]['id'],
                value: data[i]['type']
              });
            } else {
              self.secondTypeItems.push({
                key: data[i]['id'],
                value: data[i]['type']
              });
            }
          }

        })
        .catch(function (err) {
          
        });
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo1-item {
  border: 1px solid #ececec;
  padding: 5px 15px;
}
.demo1-item-selected {
  border: 1px solid green;
}
.app-container .mint-   search {
  height: 60px;
}
</style>
