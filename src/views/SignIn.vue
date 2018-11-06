<template>
    <div class="app-container">
        <div>
            <p class="gift">
                <img src="../assets/gift.jpg" alt="">
            </p>
            <p class="f-36 gift-title" >签到送礼</p>
            <p class="f-26 gift-text">每日签到可获得30-60书币奖励</p>
            <p class="gift-btn f-33">
                <span @click="submit">点击签到</span>
            </p>
            <div class="gift-rules f-26">
                <p>说明:</p>
                <p>第一天签到赠送30书币</p>
                <p>第二天签到赠送40书币</p>
                <p>第三天签到赠送50书币</p>
                <p>以此类推，最高赠送60书币</p>
            </div>
        </div>
        <Foot></Foot>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import { Foot } from "../components/index.js";
export default {
  components: {
    Foot
  },
  data() {
    return {
      alertTitle: "",
      alertContent: ""
    };
  },
  methods: {
    submit() {
      let self = this;
      this.axios
        .post("/api/sign_in/create")
        .then(function(response) {
          let data = response.data;
          MessageBox('提示', '签到成功');
        })
        .catch(function(err) {
          MessageBox('提示', err.response.data.msg);
        });
    },
    showModule() {
      AlertModule.show({
        title: this.alertTitle,
        content: this.alertContent,
        onShow() {},
        onHide() {}
      });
    },
    showModuleAuto() {
      this.showModule();
      setTimeout(() => {
        AlertModule.hide();
      }, 3000);
    }
  }
};
</script>

