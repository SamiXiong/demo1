<template>
    <div class="novel-chapter">
        <p class="chapter-title f-40">
            <span>{{chapterInfo.chapter_no}}</span>
            <span>{{chapterInfo.title}}</span>
        </p>
        <div class="chapter-content">
            <p class="chapter-avater f-30">
                <img :src=novelInfo.img alt="">
                <span>{{novelInfo.title}}</span>
            </p>
            <p class="chapter-text">
                {{chapterInfo.content}}
            </p>
        </div>
        <div class="chapter-operation">
            <span @click="goPre()">上一章</span>
            <span @click="menu()">菜单</span>
            <span class="next" @click="goNext()">下一章</span>
        </div>
         <mt-actionsheet
            :actions= "data"
            v-model="sheetVisible">
        </mt-actionsheet>
        <mt-popup
        v-model="popupVisible"
        position=""
        pop-transition = 'popup-fade'
        :modal = true
        :closeOnClickModal = false
        >
        <div class="popup-window">
            <div class="font-change">
              <p class="font-change-title f-33">字体大小</p>
              <div class="font-change-box">
                <span @click="changeFont('small')">小</span>
                <span @click="changeFont('middle')">中</span>
                <span @click="changeFont('big')" class="big-change">大</span>
              </div>
            </div>
            <div class="font-change">
              <p class="font-change-title f-33">
                  背景颜色
              </p>
              <div class="font-change-box">
                <span @click="changeBg('normal')">正常</span>
                <span @click="changeBg('comfort')">舒适</span>
                <span @click="changeBg('dark')" class="big-change">黑夜</span>
              </div>
            </div>
            <p @click="close()" class="change-check">确定</p>
        </div>
        </mt-popup>
    </div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
  name: "NovelChapter",
  components: {},
  created() {
    this.novelId = this.$route.params.novel_id;
    this.chapterId = this.$route.params.id;
    this.getData();
    console.log(this.novelId);
    console.log(this.chapterId);
    this.getNovelInfo();
    document.getElementsByTagName("html")[0].style.backgroundColor = "#d0bfa5";
  },
  destroyed(){
    document.getElementsByTagName("html")[0].style.backgroundColor = "#f8f8f8";
  },
  data() {
    return {
      size:"",
      color:"",
      popupVisible:false,
      sheetVisible: false,
      showPages: [],
      novelId: 0,
      chapterId: 0,
      novelInfo: [],
      chapterInfo: [],
      data: [
        {
          name: "添加书架",
          method: this.getCamera // 调用methods中的函数
        },
        {
          name: "字体背景",
          method: this.change // 调用methods中的函数
        },
        {
          name:"我要打赏",
          method:this.getLibrary
        },
        {
          name:"返回目录",
          method:this.goList
        },
        {
          name:"返回首页",
          method:this.goHome
        },
      ]
    };
  },
  methods: {
    goList(){
        this.$router.push({path:'/chapter_list/'+this.novelId})
        // document.getElementsByTagName("html")[0].style.backgroundColor = "#f8f8f8";
    },
    goHome(){
        this.$router.push({path:'/'})
        // document.getElementsByTagName("html")[0].style.backgroundColor = "#f8f8f8";
    },
    close(){
      this.popupVisible = false;
      console.log(this.size)
      console.log(this.color)
    },
    change(){
      this.popupVisible = true;
    },
    menu() {
      this.sheetVisible = true;
    },
    changeFont(size){
      this.size = size
    },
    changeBg(color){
      this.color = color
    },
    getCamera() {
      console.log("我执行了");
    },
    getLibrary() {
      console.log("我也执行了");
    },
    getData() {
      let self = this;
      this.axios
        .get("/api/novel_chapter/get/" + this.novelId + "/" + this.chapterId)
        .then(function(response) {
          self.chapterInfo = response.data.data;
          console.log(self.chapterInfo);
          let isSignIn = response.data.is_sign_in;

          if (isSignIn) {
            // self.alertTitle = '提示';
            // self.alertContent = '';
            // self.showModuleAuto();
            MessageBox("提示", "");
          }
        })
        .catch(function(err) {});
    },
    getNovelInfo() {
      let self = this;
      this.axios
        .get("/api/novel/get/" + this.novelId)
        .then(function(response) {
          self.novelInfo = response.data;
          console.log(response.data);
        })
        .catch(function(err) {});
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
    },
    goPre() {
      let self = this;
      this.$http
        .get(
          "/api/novel_chapter/get_pre/" + this.novelId + "/" + this.chapterId
        )
        .then(function(response) {
          self.chapterInfo = response.data;
          self.chapterId = self.chapterInfo.id;
        })
        .catch(function(err) {
          MessageBox("提示", err.response.data.msg);
        });
    },
    goNext() {
      let self = this;
      this.$http
        .get(
          "/api/novel_chapter/get_next/" + this.novelId + "/" + this.chapterId
        )
        .then(function(response) {
          self.chapterInfo = response.data;
          self.chapterId = self.chapterInfo.id;
        })
        .catch(function(err) {
          MessageBox("提示", err.response.data.msg);
        });
    }
  }
};
</script>