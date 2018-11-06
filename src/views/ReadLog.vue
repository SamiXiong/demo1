<template>
    <div class="app-container">
        <header>
             <div class="my-book f-30">
                阅读记录  
             </div>
        </header>        
        <div class="red-log-title f-26 clearfix">
            <div class="log-title-left">
                余额
                <span class="cell-one-content-money">{{userInfo.virtual_money}}</span>
            </div>
            <div class="log-title-right">
                总消费
                <span class="cell-one-content-money">{{expense}} </span>
                <span class="expense-btn" @click="go()">
                    明细
                </span>
            </div>
        </div>
        <div
          class="demo-infinite-container"
          v-infinite-scroll=" loadMore"
          :infinite-scroll-disabled="busy"
          :infinite-scroll-distance="10"
        >
        <div class="read-log-list">
             <div class=" clearfix one-read-log" v-for="(item,key) in tableData " :key="key">
                 <div class="left">
                     <div class="read-log-title f-28">{{item.title}}</div>
                     <div class="read-log-desc">{{item.desc}}</div>
                     <div class="read-log-time">{{item.meta.source}}</div>
                 </div>
                 <div class="right">
                     <span class="read-log-delete-btn" @click="deleteReadLog(item)">
                         删除
                     </span>
                 </div>
             </div>
        </div>
      </div>
      <div class="submit-btn-box" v-if="iseditor">
          <span class="delete-book-btn">
              确定删除
          </span>
      </div>
        <!-- tab-container -->
        <Foot></Foot>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import infiniteScroll from 'vue-infinite-scroll'
import { Foot } from '../components/index.js'
export default {
    name:'ReadLog',
    components:{
        Foot
    },
    data(){
        return{
            // 提示框
            loading: false,
            // 是否还有内容
            busy: false,
            tableData :[],
            userInfo:[],
            curPage: 1,
            bookNum:"",
            expense:50,
            iseditor:false,
        }
    },
    created() {
    this.getData('load');
    this.getUserInfo();
    },
    methods: {
    go(){
        this.$router.push({path:'/consume_log'})
        },
    deleteReadLog(item){
        // console.log(item)
        MessageBox.confirm('', { 
            message: '确定删除记录？', 
            title: '提示', 
            confirmButtonText: '确定', 
            cancelButtonText: '取消' 
            }).then(action => { 
            if (action == 'confirm') {     //确认的回调
            console.log(1); 
            }
            }).catch(err => { 
            if (err == 'cancel') {     //取消的回调
            console.log(2);
            } 
        });
    },
    editor(){
        if(this.iseditor==false){
            this.iseditor=true;
        }else if(this.iseditor==true){
            this.iseditor=false;
        }
    },
    add(){
        
    },
    loadMore() {
      this.curPage++;
      this.getData('pullup');
    },
    refresh() {
      this.curPage = 1;
      this.getData('pulldown');
    },
    getData(type) {
      let self = this;
      this.$http.get('/api/read_log/list?page=' + this.curPage)
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

          let totalCount = response.data.total_count;
          if (totalCount > 0) {
            let data = response.data.data;
            for (let i in data) {
              self.tableData.push({
                src: '',
                title: data[i]['novel_title'],
                desc: '第' + data[i]['chapter_no'] + '章 ' + data[i]['chapter_title'],
                url: '',
                meta: {
                  source: data[i]['created_time'],
                  date: '',
                  other: ''
                }
              });
            }
            console.log(data)
            console.log(self.tableData)
          }
        })
        .catch(function (err) {
          
        });
    },
    getUserInfo() {
      let self = this;
      this.$http.get('/api/user/get_info')
        .then(function (response) {
          let data = response.data;
          self.userInfo = data;
          if(data.headimageurl||data.headimageurl.length>0){
              self.isAvater = true
              self.url = data.headimageurl
          }
        })
        .catch(function (err) {
          
        });
    },
  },
}
</script>
