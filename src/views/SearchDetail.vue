<template>
    <div class="app-container">
        <div class="search-box clearfix">
            <input type="text" v-model="searchName" placeholder="宁可少输字，不要输错字哦~" class="search-input left">
            <span class="search-btn right" @click="search()">
                <i class="icon iconfont icon-sousuo"></i>
            </span>
        </div>
        <div>
            <!-- <div
                class="demo-infinite-container"
                v-infinite-scroll=" loadMore"
                :infinite-scroll-disabled="busy"
                :infinite-scroll-distance="10"
                > -->
                <div class="good-recommended clearfix" v-for="(item,key) in novelList" :key="key">
                    <router-link :to="{ name:'novel' , params: { id : item.url}}">
                    <img v-bind:src="item.src" alt="" class="list-title-img">
                    <div class="float:left">
                        <span class="first-recommended-title f-30">{{item.title}}</span>
                        <p class="first-recommended-title-desc f-26">{{item.desc}}</p>
                    </div>
                    </router-link>
                </div>
                <div class="prompt" v-if="busy">没有数据啦(,,・ω・,,)~</div>
            <!-- </div> -->
        </div>
        <Foot></Foot>

    </div>
</template>
<script>
import { Foot } from "../components/index.js";
import { Indicator,Toast } from 'mint-ui';
export default {
  components: {
    Foot
  },
  data() {
    return {
      searchName: "",
       novelList: [],
       firstType: '',
      secondType: '',
      novelStatus: '',
      sort: '',
      curPage: 1,
      busy:false,
    };
  },
  created() {
    this.searchName = this.$route.params.title;
    this.search("load")
  },
  methods:{
       search(type) {
        let self = this
            if(self.searchName==""){
                Toast({
                    message: '搜索内容不能为空哦',
                    position: 'middle',
                    duration: 5000
                });
            }else if(self.searchName!==""){
                this.axios.get('/api/novel/search/'+this.searchName)
                    .then(res=>{
                        let data = res.data.data;
                        if(type == 'pullup'){

                        }else if(type == 'pulldown'){
                            self.novelList = [];
                        }else{
                            self.novelList = [];
                        }
                        console.log(data.length)
                        if(data.length>0){
                            for (let i in data){
                                self.novelList.push({
                                    src: data[i]['img'],
                                    title: data[i]['title'],
                                    desc: data[i]['introduction'],
                                    url: data[i]['id']
                                })
                            }
                        }else if(data.length==0){
                            self.busy = true
                        }
                    }).catch(err=>{

                    })
            }
        // this.$http.get('/api/novel/find/type?page=' + this.curPage + '&firstType=' + this.firstType 
        //     + '&secondType=' + this.secondType + '&novelStatus=' + this.novelStatus + '&sort=' + this.sort)
        //     .then(function (response) {
        //     if (type == 'pullup') {
        //         // self.$refs.scroller.donePullup();
        //     } else if (type == 'pulldown') {
        //         self.novelList = [];
        //         // self.$refs.scroller.donePulldown();
        //         // self.$refs.scroller.enablePullup();
        //     } else {
        //         self.novelList = [];
        //     }

        //     let totalCount = response.data.total_count;
        //     if (totalCount > 0) {
        //         let data = response.data.data;
        //         for (let i in data) {
        //         self.novelList.push({
        //             src: data[i]['img'],
        //             title: data[i]['title'],
        //             desc: data[i]['introduction'],
        //             url: ''
        //         });
        //         }
        //         console.log(self.novelList)
        //     }else{
        //         this.busy = true;
        //     }
        //     })
        //     .catch(function (err) {
            
        //     });
    },
     loadMore () {
      this.curPage++;
      this.search('pullup');
    },
    refresh() {
      this.curPage = 1;
      this.search('pulldown');
      this.$refs.loadmore.onTopLoaded();
    },
  }
};
</script>
