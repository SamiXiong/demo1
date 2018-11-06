<template>
    <div class="app-container">
        <div class="search">
            <div class="search-box clearfix">
                <input type="text" v-model="searchName" placeholder="宁可少输字，不要输错字哦~" class="search-input left">
                <span class="search-btn right" @click="search()">
                    <i class="icon iconfont icon-sousuo"></i>
                </span>
            </div>
            <div class="search-history clearfix">
                <div class="clearfix history-title">
                    <span class="left f-33">历史搜索</span>
                    <span class="right clear f-29" @click="clear()">
                        <i class="icon iconfont icon-icon--"></i>
                        清空
                    </span>
                </div>
                <div class="no-history" v-if="!isHistory">
                    空空如也哦(((ﾟдﾟ)))~
                </div>
                <div class="history-list clearfix">
                    <span class="one-history" v-for="(item,key) in historyList" :key="key" @click="quick(item.title)">
                        {{item.title}}
                    </span>
                </div>
            </div>  
            <div class="search-hot">
                <div class="history-title">
                    <span class="f-33">热门搜索</span>
                </div>
                <div class="hot-list clearfix">
                    <div class="one-hot left" @click="quick(firstHot.title)">
                        <span class="one-hot-head hot-first">{{firstHot.key}}</span>
                        {{firstHot.title}}
                    </div>
                    <div class="one-hot left" @click="quick(secondHot.title)">
                        <span class="one-hot-head hot-second">{{secondHot.key}}</span>
                        {{secondHot.title}}
                    </div>
                    <div class="one-hot left" @click="quick(threeHot.title)">
                        <span class="one-hot-head hot-three">{{threeHot.key}}</span>
                        {{threeHot.title}}
                    </div>
                    <div class="one-hot left" v-for="(item,key) in hotList" :key="key" @click="quick(item.title)">
                        <span class="one-hot-head">{{item.key}}</span>
                        {{item.title}}
                    </div>
                </div>
            </div>
        </div>
        <Foot></Foot>
    </div>
</template>
<script>
import { Indicator,Toast } from 'mint-ui';
import { Foot } from '../components/index.js'
export default {
    components:{
        Foot
    },
    data () {
        return {
        searchName:"",
        isHistory:false,
        isHot:false,
        historyList:[
            // {
            //     title:"小说599"
            // }
        ],
        hotList:[
            // {
            //     title:"凡人修仙传",
            //     key:4
            // },
            // {
            //     title:"青云志",
            //     key:5
            // }
        ], 
        firstHot:
                {
                    // title:"神雕侠侣",
                    // key:1
                },
        secondHot:
                {
                    // title:"诛仙",
                    // key:2
                } 
        ,
        threeHot:
                {
                    // title:"天龙八部",
                    // key:3
                }
        
        }
    },
    created(){
        this.getHistory()
    },
    methods:{
        quick(title){
            this.searchName = title
            this.search()
        },
        search(){
            if(this.searchName==""){
                Toast({
                    message: '搜索内容不能为空哦',
                    position: 'middle',
                    duration: 5000
                });
            }else if(this.searchName!==""){
                this.$router.push({path:'/search_detail/'+this.searchName})
            }
            // let self = this
            // this.axios.get('/api/novel/search/'+this.searchName)
            // .then(res=>{
            //     console.log(res.data)
            // }).catch(err=>{

            // })
        },
        clear(){
            this.axios.post('/api/search_log/delete_all').then(res=>{
                console.log(res.data)
            }).catch(err=>{
                
            })
            // Indicator.open({
            // text: '清除中...',
            // spinnerType: 'fading-circle'
            // });
        },
        getHistory(){
            let self = this
            this.axios.get('/api/search_log/find')
            .then(res=>{
                let data = res.data
                if(data.length>0){
                    self.isHistory = true
                    console.log(data)
                    for (let i in data ){
                        self.historyList.push({
                            title:data[i]['content']
                        })
                    }
                }
            }).catch(err=>{
                
            })
        },
        getHot(){
            
        } 
    }
}
</script>
