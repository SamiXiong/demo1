<template>
    <div class="app-container">
        <mt-navbar class="page-part" v-model="selected">
            <mt-tab-item id="1">充值记录</mt-tab-item>
            <mt-tab-item id="2">签到记录</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <ul class="signin-list clearfix">
                    <li v-for="(item,key) in signIn" :key = key>
                        <p class="f-28">充值成功：+{{item.money}}书币</p>
                        <div>{{item.time}}</div>
                    </li>
                </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                 <ul class="signin-list clearfix">
                    <li v-for="(item,key) in signIn" :key = key>
                        <p class="f-28">今日签到：+{{item.money}}书币</p>
                        <div>{{item.time}}</div>
                    </li>
                </ul>
            </mt-tab-container-item>
        </mt-tab-container>
        <Foot></Foot>
    </div>
</template>
<script>
import { Foot } from '../components/index'
export default {
    components: {
        Foot
    },
    data(){
        return{
            selected:"2",
            curPage:1,
            signIn:[],
            recharge:[],
        }
    },
    created(){
        this.getSignIn(),
        this.getRecharge()
    },
    methods:{
         loadMore () {
            this.curPage++;
            this.getData('pullup');
        },
        refresh() {
            this.curPage = 1;
            this.getData('pulldown');
        },
        getSignIn(){
            this.axios.get('/api/flowing_list/signin?page=' + this.curPage).then(res=>{
                
                let self = this
                let data = res.data.data
                if(res.data.total_count>0){
                    for(var i in data){
                        self.signIn.push({
                                 
                            time:new Date(parseInt(data[i].created_time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '),
                            money:data[i].virtual_money
                        })
                    }
                   
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        getRecharge(){
            this.axios.get('/api/flowing_list/recharge?page=' + this.curPage).then(res=>{
                let self = this 
                let data = res.data.data
                if(res.data.total_count>0){
                    for(var i in data){
                        self.recharge.push({
                            time:data[i].created_time,
                            money:data[i].virtual_money
                        })
                    }
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>
