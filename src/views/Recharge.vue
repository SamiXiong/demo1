<template>
  <div class="app-container">
    <div>
      <div class="user-info">
        <img src="../assets/timg.jpg" alt="" v-if="!isAvater" class="big-avater">
            <img :src="url" alt="" class="big-avater" v-if="isAvater">
        <div>
          <p style="margin-bottom:9px;">{{userInfo.nickname}}</p>
          <div class="clearfix">
            <span class="f-18" style="float:left">ID:{{userInfo.userno}}</span>
            <span class="f-18" style="float:right">余额:{{userInfo.virtual_money}}书币</span>
          </div>
        </div>
      </div>
      <div class="recharge-num">
          充值金额
      </div>
      <div class="recharge-box clearfix">
        <div class="recharge-amount f-28" v-for="(item, key) in moneyItems" :key="key" v-if="item.key!=5">
          <span @click="changeNum(item.key,type,key)" :class="{'recharge-amount-active':key==type}">{{item.value}}(元)</span>
        </div>
        <div v-for="(item, key) in moneyItems" :key="key" v-if="item.key==5" class="recharge-vip">
          <span class="recharge-vip f-28" @click="changeNum(item.key,type,key)" :class="{'recharge-vip-active':key==type}">{{item.value}}(元)</span>
        </div>
      </div>
       <div class="submit-btn f-33" @click="submit()">提交充值</div>
       <div class="statement f-26">
         <p class="">*书币属于虚拟商品，充值后无法退款，敬请谅解</p>
         <p class="">*电话：1546-78498122
           <span style="color:#cb536c">(咨询时提供ID:1000000)</span>
         </p>
         <p class="">*工作时间:8:30AM-9:00PM</p> 
       </div>
      <!-- <checker v-model="money" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
        <checker-item :value="item.key" v-for="(item, index) in moneyItems" :key="index">{{item.value}}</checker-item>
      </checker> -->
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import { Foot } from "../components/index.js";
export default {
  name: 'Recharge',
  components: {
    Foot
  },
  created() {
    this.getUserInfo();
    this.getRechargeMoney();
  },
  data () {
    return {
      money: '',
      moneyItems: [],
      userInfo: {},
      url:'',
      isAvater:false,
      type:0,
      num:0,
    }
  },
  methods: {
     changeNum(item,type,index){
        this.type = index
          this.num = item
    },
    submit(){
      console.log(this.num)
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
    getRechargeMoney() {
      let self = this;
      this.$http.get('/api/recharge_money/find')
        .then(function (response) {
          let data = response.data;
          for (let i in data) {
            self.moneyItems.push({
              key: data[i]['id'],
              value: data[i]['money']
            });
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
.mint-button--large{
  width: 684px;
}
</style>

