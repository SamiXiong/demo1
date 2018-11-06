<template>
  <div class="app-container">
    <div>
      <div class="user-info my-info">
        <img src="../assets/timg.jpg" alt="" v-if="!isAvater" class="big-avater">
            <img :src="url" alt="" class="big-avater" v-if="isAvater">
        <div>
          <p style="margin-bottom:9px;">{{userInfo.nickname}}</p>
          <div class="clearfix">
            <span class="f-18" style="float:left">ID:{{userInfo.userno}}</span>
          </div>
        </div>
      </div>
      <div class="cell-box">
          <div class="cell-one">
              <i class="icon iconfont icon-jinbi cell-icon"></i>
              <div class="cell-one-content">
                  <span class="cell-one-content-money">{{userInfo.virtual_money}}</span>
                  书币
                  <span class="go-recharge f-26" @click="goRecharge()">立即充值</span>
              </div>
          </div>
          <mt-cell title="签到送礼" is-link class="cell" to = '/signin'>
              <i class="icon iconfont icon-ziyuan cell-icon"></i>
          </mt-cell>
      </div>
      <div class="cell-box">
          <mt-cell title="充值/签到记录" is-link class="cell" to='/recharge_signin_log'>
            <i class="icon iconfont icon-chongzhijilu cell-icon"></i>
          </mt-cell>
          <mt-cell title="消费记录" is-link class="cell" to='/consume_log'>
              <i class="icon iconfont icon-tubiaozhizuomoban cell-icon"></i>
          </mt-cell>
      </div>
      <div class="cell-box">
          <mt-cell title="我的书架" is-link class="cell" to='/book_store'>
              <i class="icon iconfont icon-shujia cell-icon"></i>
          </mt-cell>
          <mt-cell title="阅读记录" is-link class="cell" to='/read_log'>
              <i class="icon iconfont icon-shu cell-icon"></i>
          </mt-cell>
      </div>
      <!-- <checker v-model="money" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
        <checker-item :value="item.key" v-for="(item, index) in moneyItems" :key="index">{{item.value}}</checker-item>
      </checker> -->
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import { Cell } from 'mint-ui';
import { Foot } from "../components/index.js";
export default {
  name: 'MyCenter',
  components: {
    Foot
  },
  created() {
    this.getUserInfo();
  },
  data () {
    return {
      money: '',
      moneyItems: [],
      userInfo: [],
      url:'',
      isAvater:false,
      type:0,
      num:0,
      title:""
    }
  },
  methods: {
    goRecharge(){
        this.$router.push({
            path:'/recharge'
        })
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

