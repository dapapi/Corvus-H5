<template>
    <div >
        <ul class="nav">
            <li @click="changeActive(item.value)" :class="isActive == item.value?'active':''" v-for="(item,index) in navList" :key="index">{{item.name}}</li>
            <div class="active-line" :style="{left:`${posLeft}%`,width:`${activeLineWidth}%`}"></div>
        </ul>
        <ul class="nav-ul">
        <li v-for="(item,index) in noticeList" :key="index" v-show="item.readflag ==isActive " @click="changeState(item.id)">
            <!-- <router-link :to="`/notice/detail/${item.id}`"> -->
                <div class="nav-title">
                    <i class="iconfont icon-biaoti"></i>
                    <span class="title">{{item.title}}</span>
                </div>
                <div class="clearfix details">
                    <img class="float-left picImg" v-if="item.creator" :src="item.creator.data.icon_url" alt="">
                    <span class="float-left name" v-if="item.creator">{{item.creator.data.name}}</span>
                    <span class="float-left type">{{noticeType.find(notice => notice.id == item.classify).name}}</span>
                    <span class="float-right time">{{item.created_at}}</span>
                </div>
            <!-- </router-link> -->
        </li>
        </ul>
    </div>
</template>

<script>
import config from '@/utils/config.js'
import { mapState, mapActions, mapMutations } from 'vuex'
import fetch from '@/utils/fetch.js'
import moment from 'moment'
import Cookies from 'js-cookie'
export default {
    
    data(){
        return {
            // classifyArr:config.classifyArr,
            loading:false,
            noticeList:[],
            navList:[
                {
                    value:0,
                    name:'未读',
                    
                },
                {
                    value:1,
                    name:'已读',
                }
            ],
            isActive:0,
            posLeft:0,//选中状态的位置
            activeLineWidth:0,//选中状态的宽度
        }
    },
    computed:{
        ...mapState([
            'noticeType'
        ])
    },
    created(){
        this.getNoticeType()
        window.leftClick = this.leftClick
    },
    mounted(){
        this.getNoticeList(0)
        this.isActive = this.navList[0].value
        this.posLeft = (100/this.navList.length/4)
        this.activeLineWidth =(100/this.navList.length/2)
        
    },
    
    methods:{
       ...mapActions([
            'getNoticeType'
        ]),
        leftClick:function(){
            config.deviceWay('back',2)
        },
        loadMore:function(){
         this.loading = true
         this.getNoticeList()
         
       },
       changeActive:function(value){
           this.isActive = value
           this.posLeft = (100/this.navList.length/4)+(100/this.navList.length*(value))
           this.getNoticeList(value)
       },
       //readflag 0 未读 1 已读
       getNoticeList(value){
           Indicator.open();
           let data ={
               readflag:value
           }
           fetch('get', `/announcements?include=creator`,data).then(res => {
               this.noticeList = res.data
               Indicator.close();
           })
       },
       changeState(id){
            let data = {
                readflag:1
            }
            if(this.isActive == 0){
                fetch('put', `/announcements/${id}/readflag`,data).then(res => {
                    this.$router.push({
                        path:`/notice/detail/${id}`
                    })
                })
            }else{
                this.$router.push({
                    path:`/notice/detail/${id}`
                })
            }
            
       }

    }
}
</script>
<style lang="scss" scoped>
    .nav{
        display: flex;
        height: 0.96rem;
        line-height: .96rem;
        background-color:#fff;
        position: relative;
        li{ 
            flex: 1;
            text-align: center;
        }
        .active{
            color:#3F51B5;
        }
        .active-line{
            background-color:#3F51B5;
            height: 1px;
            
            position: absolute;
            bottom: 0px;
            
        }
    }
    .nav-ul{
       
       li{ 
           background-color:#fff;
           padding:0.2rem 0.4rem 0.32rem 0.4rem;
           border-top:1px solid #ECECEC ;
           &:hover{
               background-color:#F9F9F9;
           }
           .nav-title{
               margin-bottom:0.3rem;
           }
           .title{
               font-size: .32rem;
               color:#333333
           }
           img{
                width:0.48rem;
                height:0.48rem;
                border-radius: 50%;
           }
           .details{
               .name{
                  margin-left:0.1rem;
                  padding-right:0.1rem;
                  border-right:1px solid #ECECEC;
                  color:#666
               }
               .type{
                  margin-left:0.1rem;
                  color:#666;
               }
               .time{
                   color:#A4A4A4;
                   font-size:.24rem;
               }
           }
       }
    }
</style>



