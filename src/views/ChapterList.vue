<template>
    <div class="app-container">
      <div class="chapter-list">
          <div class="list-selected">
              <span class="f-26" @click="popupVisible = true" >{{currentTags?currentTags: '1-100'}}</span>
          </div>
          <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
          <!-- 此处slots为动态传入的值，通过computed来处理 -->
            <span @click="handleConfirm" class="right f-28">确认</span>
            <mt-picker :slots="getPages" :visible-item-count="3" :show-toolbar="false"  ref="picker" ></mt-picker>
          </mt-popup>

          <div class="chapter-list-title">
            <span class="f-36">
              {{novelInfo.title}}
            </span>
            <span class="f-26 chapter-book-type">
              {{ novelInfo.novel_status == 'loading' ? '连载中': '完结' }}
            </span>
          </div>
          <mt-loadmore :top-method="refresh" ref="loadmore" 
          topPullText=""
        >
          <div
              class="demo-infinite-container"
              v-infinite-scroll=" loadMore"
              :infinite-scroll-disabled="busy"
              :infinite-scroll-distance="10"
            >
          <mt-cell v-for="(item,key) in tableDatas" :key="key" :title=item.num+item.title is-link :to = item.url > 

          </mt-cell>
          </div>
        </mt-loadmore>
        <div class="prompt" v-if="busy">已经到底了哦~</div>
          <Foot></Foot>
      </div>
    </div>
</template>
<script>
import { Foot } from '../components/index.js'
export default {
  name: 'ChapterList',
  components: {
   Foot
  },
  created() {
    this.novelId = this.$route.params.id;
    this.getData('load');
    this.getNovelInfo()
  },
  data () {
    return {
      busy:false,
      currentTags:"",
      popupVisible: false,
      novelId: '',
      title: '',
      tableDatas: [],
      showPages:[],
      novelInfo:[],
      totalCount:0,
      curPage: 1,
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      },
    }
  },
  mounted(){
    console.log(this.showPages)
  },
  computed:{
     getPages(){
            var self = this
            self.showPages = []
            let count = self.totalCount
            var totalPages = parseInt(count/100);  //总共有多少个100章
            var lastPageNum = count%100;  //最后一页有多少章
            if(totalPages>0){
               for(var i = 0; i < totalPages; i++){
                  var thisPage = (i*100+1)+'-'+(i*100+100);  //从第0页开始  每页为n*100+1 到n*100+100章
                  this.showPages.push(thisPage); 
              }
              this.showPages.push((totalPages*100+1)+'-'+(totalPages*100+lastPageNum));  //最后一页  每页为n*100+1 到n*100+最后一页的章数lastPageNum
            }else if(totalPages==0){
              this.showPages.push((totalPages*100+1)+'-'+(totalPages*100+lastPageNum));  //最后一页  每页为n*100+1 到n*100+最后一页的章数lastPageNum
              self.currentTags = (totalPages*100+1)+'-'+(totalPages*100+lastPageNum)
            }
            // return showPages;
            let dateSlots = [
              {
                flex :1,
                values:this.showPages,
                className:'solt1',
                textAlign:'center'
              }
            ]
             return  dateSlots
        },
  },
  methods: {
   handleConfirm () {
      this.currentTags = this.$refs.picker.getValues()[0]
      this.popupVisible = false
      console.log(this.currentTags)
  },
    getNovelInfo() {
      let self = this;
      this.axios.get('/api/novel/get/' + this.novelId)
        .then(function (response) {
          self.novelInfo = response.data;
        })
        .catch(function (err) {
          
        });
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
      if(self.busy ==false){
        this.axios.get('/api/novel_chapter/list/' + this.novelId + '?page=' + this.curPage)
        .then(function (response) {
          console.log(response.data)
          if (type == 'pullup') {
            // self.$refs.scroller.donePullup();
          } else if (type == 'pulldown') {
            self.tableDatas = [];
            // self.$refs.scroller.donePulldown();
            // self.$refs.scroller.enablePullup();
          } else {
            self.tableDatas = [];
          }

          self.totalCount = response.data.total_count;
          let data = response.data.data;
          console.log(data.length)
          if (data.length > 0) {
            for (let i in data) {
              self.tableDatas.push({
                src: '',
                title: data[i]['title'],
                num:data[i]['chapter_no'],
                desc: '',
                url: '/novel_chapter/' + self.novelId + '/' + data[i]['id']
              });
            }
          }else if(data.length==0){
            self.busy = true
          }
        })
        .catch(function (err) {
          
        });
      }else if(self==true){
        console.log("没数据了")
      }
    },
  },
}
</script>
