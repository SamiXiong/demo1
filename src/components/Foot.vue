<template>
    <footer>
       <div v-for="(foot,index) in footList" :key="index">
           <router-link :to="{name:foot.name}" exact>
               <span>{{foot.txt}}</span>
           </router-link>
       </div>
   </footer>
    <!-- <div>
        <tabbar style="position:fixed;">
            <tabbar-item selected>
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item :link="{ path:'/novel_type' }">
                <span slot="label">书库</span>
            </tabbar-item>
            <tabbar-item :link="{ path:'/search'}">
                <span slot="label">搜索</span>
            </tabbar-item>
            <tabbar-item :link="{ path:'/recharge' }">
                <span slot="label">充值</span>
            </tabbar-item>
            <tabbar-item :link="{ path:'/my_center' }">
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
    </div> -->
</template>
<script>
export default {
    data(){
        return {
            footList:[
                {name:"Home",txt:"首页",path:"/"},
                {name:"novel_type",txt:"书库",path:"/novel_type"},
                {name:"search",txt:"搜索",path:"/search"},
                {name:"recharge",txt:"充值",path:"/recharge"},
                {name:"my_center",txt:"我的",path:"/my_center"},
            ]
        }
    },
    components:{
      
    }
}
</script>
<style lang="less" scoped>
    *{
        margin: 0;
        padding: 0;
    }
    footer{
        display:flex;
        flex: 1;
        position: fixed;
        z-index: 500;
        bottom: 0;
        width: 100%;
        background-color: #F7F7FA;
        border-bottom: 1px solid #C0BFC4;
        border-top: 1px solid #C0BFC4;
        div{
            flex: 1;
            height:48px;
            flex-direction:column;
            text-align: center;
            a{
                display: block;
                line-height: 48px;
                color:#999999;
                font-size: 14px;
                flex-direction:column;
                text-decoration: none;
            }
        }
    }
    .router-link-active{
            color:#f2a732;
            text-decoration: none;
	}
</style>

