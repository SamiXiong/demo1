<template>
    <div class="app-container">
        <header>
             <div class="my-book f-30">
                我的书架    
             </div>
        </header>        
        <div class="book-title f-26 clearfix">
            <span>共{{bookNum}}本</span>
            <span class="book-editor" v-if="!iseditor" @click="editor()">编辑</span>
            <span class="book-editor" v-if="iseditor" @click="editor()">取消</span>
        </div>
        <div
          class="demo-infinite-container"
          v-infinite-scroll=" loadMore"
          :infinite-scroll-disabled="busy"
          :infinite-scroll-distance="10"
        >
        <div class="book-store-list clearfix">
            <div class="one-book clearfix" v-for="(item,key) in tableData" :key="key">
             <img v-bind:src="item.src" alt="" class="">
                <div class="">
                    <span class="f-30">{{item.title}}</span>
                    <p class="f-26 one-book-title">玄幻修真</p>
                    <span class="f-21 one-book-chapter">共: 404章</span>
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
import infiniteScroll from 'vue-infinite-scroll'
import { Foot } from '../components/index.js'
export default {
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
            curPage: 1,
            bookNum:"",
            iseditor:false,
        }
    },
    created() {
    this.getData('load');
    },
    methods: {
    editor(){
        if(this.iseditor==false){
            this.iseditor=true;
        }else if(this.iseditor==true){
            this.iseditor=false;
        }
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
      this.$http.get('/api/book_store/list?page=' + this.curPage)
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
            self.bookNum = data.length
            console.log(data.length)
            for (let i in data) {
              self.tableData.push({
                src: data[i]['img'],
                title: data[i]['title'],
                desc: '',
                url: ''
              });
            }
            console.log(data)
            console.log(self.tableData)
          }
        })
        .catch(function (err) {
          
        });
    },
  },
}
</script>
