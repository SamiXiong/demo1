<template>
  <div class="app-container">
    <Foot></Foot>
    <div style='margin-bottom:50px;'>
      <!-- <group>
        <cell :title="title"></cell>
      </group> -->
       <div class="the-title">
            <span class="title-name f-33" style="font-weight:bold">{{title}}</span>
        </div>
      <!-- <scroller lock-x scrollbar-y use-pullup use-pulldown height="100%" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
        <div class="box2"> -->
          <!--<p v-for="i in n">placeholder {{i}}</p>-->
          <!-- <panel :list="novelList" type="1"></panel>
        </div> -->
        <!--pullup slot-->
        <!-- <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
          <span v-show="status.pullupStatus === 'default'"></span>
          <span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
          <span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
        </div>
      </scroller> -->
      <!-- 列表 -->
      <mt-loadmore :top-method="refresh" ref="loadmore" 
        topPullText=""
      >
      <div
          class="demo-infinite-container"
          v-infinite-scroll=" loadMore"
          :infinite-scroll-disabled="busy"
          :infinite-scroll-distance="10"
        >
        <div class="good-recommended clearfix" v-for="(item,key) in novelList" :key="key" style="border-bottom:1px solid #c1c1c1">
             <img v-bind:src="item.src" alt="" class="list-title-img">
            <div class="float:left">
              <span class="first-recommended-title f-30">{{item.title}}</span>
              <p class="first-recommended-title-desc f-26">{{item.desc}}</p>
            </div>
        </div>
      </div>
      </mt-loadmore>
      <!-- <panel :list="novelList" type="1"></panel> -->
    </div>
  </div>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
import { Foot } from "../components/index.js";
export default {
  directives: { infiniteScroll },
  name: 'NovelList',
  components: {
    Foot
  },
  created() {
    this.type = this.$route.params.type;
    this.firstType = parseInt(window.localStorage.getItem('firstType') || '0');
    switch (this.type) {
      case 'range': this.title = '总排行'; break;
      case 'main_recommand': this.title = '主编推荐'; break;
      case 'good_recommand': this.title = '精品推荐'; break;
      case 'is_new': this.title = '上架新书'; break;
      case 'free_time': this.title = '限时免费'; break;
      case 'novel_status': this.title = '完本'; break;
      // case 'you_like' : this.title = '猜你喜欢'; break
      default: break;
    }
    this.getData('load');
  },
  data () {
    return {
      loading: false,
      busy: false,

      title: '',
      novelList: [],
      type: '',
      firstType: '',
      curPage: 1,
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      }
    }
  },
  methods: {
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
      this.$http.get('/api/novel/find/' + this.type + '?page=' + this.curPage + '&firstType=' + this.firstType)
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
                url: ''
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
</style>
