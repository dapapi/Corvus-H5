<template>
    <div>
        <ul class="nav">
            <li>
               已读
            </li>
            <li>
                未读
            </li>
            <div class="active-line"></div>
        </ul>
        <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10" class="nav-ul">
        <li v-for="(item,index) in noticeList" :key="index">
            <router-link :to="`/notice/detail/${item.id}`">
                <div class="nav-title">
                    <i class="iconfont icon-biaoti"></i>
                    <span class="title">{{item.title}}</span>
                </div>
                <div class="clearfix details">
                    <img class="float-left" :src="item.creator.data.icon_url" alt="">
                    <span class="float-left name">{{item.creator.data.name}}</span>
                    <span class="float-left type">{{classifyArr.find(classifyArr => classifyArr.value == item.classify).name}}</span>
                    <span class="float-right time">{{item.created_at}}</span>
                </div>
            </router-link>
        </li>
        </ul>
    </div>
</template>

<script>
import config from '@/utils/config.js'
import { mapState, mapActions, mapMutations } from 'vuex'
import moment from 'moment'
import Cookies from 'js-cookie'
export default {
    
    data(){
        return {
            classifyArr:config.classifyArr,
            loading:false,
        }
    },
    mounted(){
        this.getNoticeList()
    },
    computed:{
       ...mapState([
           'noticeList'
       ])
    },
    // watch:{
    //    noticeList(){
    //     //    this.loading = false
    //    }
    // },
    methods:{
       ...mapActions([
           'getNoticeList'
       ]),
       loadMore:function(){
         this.loading = true
         this.getNoticeList()
         
       },

    }
}
</script>
<style lang="scss" scoped>
    .nav{
        display: flex;
        height: 0.96rem;
        line-height: .96rem;
        li{ 
            flex: 1;
            text-align: center;
        }
    }
    .nav-ul{
       
       li{ 
           background-color:#fff;
           padding:0.2rem 0.4rem 0.32rem 0.4rem;
           border-bottom:1px solid #ECECEC ;
           .nav-title{
               margin-bottom:0.3rem;
           }
           .title{
               font-size: .32rem;
               color:#333333
           }
           img{
                width:0.48rem;
                height:0.48rem
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



