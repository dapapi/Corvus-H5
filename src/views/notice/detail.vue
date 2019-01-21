<template>
    <div>
        <div class="detail-title">
            <div class="nav-title">
                <i class="iconfont icon-biaoti"></i>
                <span class="title">{{noticeDetail.title}}</span>
            </div>
            <div class="clearfix details">
                <img v-if="noticeDetail.creator" class="float-left" :src="noticeDetail.creator.data.icon_url" alt="">
                <span v-if="noticeDetail.creator" class="float-left name">{{noticeDetail.creator.data.name}}</span>
                <span v-if="noticeDetail.classify" class="float-left type">{{classifyArr.find(classifyArr => classifyArr.value == noticeDetail.classify).name}}</span>
                <span class="float-right time">{{noticeDetail.created_at}}</span>
            </div>
        </div>
        <div class="desc" v-html="noticeDetail.desc"></div>
    </div>
</template>
<script>
import config from '@/utils/config.js'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
    data(){
        return {
            classifyArr:config.classifyArr
        }
    },
    created(){
       this.getNoticeDetail({id:this.$route.params.id})
    },
    
    computed:{
        ...mapState([
            'noticeDetail'
        ])
    },
    methods:{
        ...mapActions([
            'getNoticeDetail'
        ])
    }
}
</script>

<style lang="scss" scoped> 
    .detail-title{ 
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
    .desc{
        background-color:#fff;
        padding:0.4rem;
        font-size: .28rem;
        line-height: 2;
        color:#666
    }
</style>

