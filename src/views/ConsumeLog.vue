<template>
    <div class="app-container">
        <div class="consume-log">
            <div class="consume-log-title clearfix f-26">
                <p class="left">
                    余额
                    <span class="surplus">{{userInfo.virtual_money}}书币</span>
                </p>
                <p class="right">
                    总消费
                    <span class="pay">{{userInfo.pay_money}}书币</span>
                </p>
            </div>
            <mt-navbar class="page-part" v-model='currentTab'>
                <mt-tab-item id="0">章节消费</mt-tab-item>
                <mt-tab-item id="1">购书消费</mt-tab-item>
                <mt-tab-item id="2">打赏消费</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="currentTab">
                <mt-tab-container-item id="0">
                   <ul class="consume-list" v-if="isData">
                        <mt-loadmore :top-method="refresh" ref="loadmore" 
                         topPullText=""
                        >
                            <div
                            class="demo-infinite-container"
                            v-infinite-scroll=" loadMore"
                            :infinite-scroll-disabled="busy"
                            :infinite-scroll-distance="10"
                            >
                       <li v-for="(item,key) in tableData" :key="key">
                           <p class="f-29 consume-list-title clearfix">
                               {{item.title}}
                               <span class="right consume-money f-22">
                                   {{item.money}}
                               </span>
                            </p>
                           <p class="f-26 consume-list-content">{{item.desc}}</p>
                           <p class="f-26 consume-list-content">{{item.meta.source}}</p>
                       </li>
                            </div>
                        </mt-loadmore>
                   </ul>
                   <div v-if="!isData" class="none">
                       暂无数据
                   </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="1">
                    <div v-if="!isData" class="none">
                       暂无数据
                   </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <div v-if="!isData" class="none">
                       暂无数据
                   </div>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <Foot></Foot>
    </div>
</template>
<script>
import { Foot } from '../components/index.js'
export default {
  name: 'ConsumeLog',
  components: {
    Foot
  },
  created() {
    this.getData('load');
    this.getUserInfo()
  },
  data () {
    return {
      busy:false,
      isData:false,
      currentTab: "0",
      curPage: 1,
      userInfo:[],
      tableData: [],
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      }
    }
  },
  methods: {
    onItemClick(index) {
      this.currentTab = index;
      this.curPage = 1;
      this.getData();
    },
    loadMore() {
      this.curPage++;
      this.getData('pullup');
    },
    refresh() {
      this.curPage = 1;
      this.getData('pulldown');
    },
    getUserInfo() {
      let self = this;
      this.$http.get('/api/user/get_info')
        .then(function (response) {
          let data = response.data;
          console.log(data)
          self.userInfo = data;
        })
        .catch(function (err) {
          
        });
    },
    getData(type) {
      let self = this;
      let url = '';
      let actionTitle = '';
      switch (this.currentTab) {
        case "0": 
          actionTitle = '阅读';
          url = '/api/flowing_list/buy_chapter'; 
          break;
        case "1": 
          actionTitle = '购买';
          url = '/api/flowing_list/buy_book'; 
          break;
        case "2": 
          actionTitle = '打赏';
          url = '/api/flowing_list/award'; 
          break;
      }
      this.$http.get(url + '?page=' + this.curPage)
        .then(function (response) {
          if (type == 'pullup') {
            // self.$refs.scroller.donePullup();
          } else if (type == 'pulldown') {
            self.tableData = [];
            // self.$refs.scroller.donePulldown();
            // self.$refs.scroller.enablePullup();
          } else {
            self.tableData = [];
          }
          let data = response.data.data
          let totalCount = response.data.total_count;
          if (data.length > 0) {
            let data = response.data.data;
            for (let i in data) {
              self.tableData.push({
                src: '',
                title: actionTitle + ': 《' + data[i]['novel_title'] + '》 ' ,
                money: '-'+ data[i]['virtual_money'] + '书币',
                desc: self.currentTab == 0 ? '第' + data[i]['chapter_no'] + '章 ' + data[i]['chapter_title'] : data[i]['created_time'],
                url: '',
                meta: {
                  source: new Date(self.currentTab == 0 ? data[i]['created_time'] : '').toLocaleString().substring(0, 10).replace(/年|月|\//g, "-"),
                  date: '',
                  other: ''
                }
              });
            }
          }else if(data.length==0){
              self.busy = true;
          }
          if(self.tableData.length>0){
              self.isData = true
          }else if(self.tableData.length==0){
              self.isData = false
          }
        })
        .catch(function (err) {
          
        });
    },
  },
  watch: {
      currentTab: function (val, oldVal) {
          this.onItemClick(val)
           //val     切换后 id
           //oldVal  切换前 id 
      }
    },
}
</script>
