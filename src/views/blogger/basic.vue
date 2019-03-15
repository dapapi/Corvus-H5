<template>
    <div v-if="blogDetail.nickname">
        <h4 class="head-title"><i class="iconfont icon-biaoti"></i>基本资料</h4>
        <div class="list">
            <span class="listleft">昵称:</span>
            <span class="listright">{{blogDetail.nickname}}</span>
        </div>
        
        <div class="list">
            <span class="listleft">沟通状态:</span>
            <span class="listright">{{artistStatusArr.find(item => item.value ==blogDetail.communication_status).name}}</span>
        </div>
        <div class="list">
            <span class="listleft">与我司签约意向:</span>
            <span class="listright">{{yesOrNo.find(item => item.value == blogDetail.intention).name}}</span>
            <span class="listright" v-if="blogDetail.intention == false&&blogDetail.intention_desc">-{{blogDetail.intention_desc}}</span>
        </div>
        <div class="list">
            <span class="listleft">是否签约其他公司:</span>
            <span class="listright">{{yesOrNo.find(item => item.value == blogDetail.sign_contract_other).name}}</span>
            <span class="listright" v-if="blogDetail.sign_contract_other == 1&&blogDetail.sign_contract_other_name">{{blogDetail.sign_contract_other_name}}</span>
        </div>
        <div class="list">
            <span class="listleft">社交平台:</span>
            <span class="listright">{{platform}}</span>
        </div>
        <div class="list">
            <span class="listleft">微博主页地址:</span>
            <span class="listright">{{blogDetail.weibo_url}}</span>
        </div>
        <div class="list">
            <span class="listleft">微博粉丝数:</span>
            <span class="listright">{{blogDetail.weibo_fans_num}}</span>
        </div>
        <div class="list">
            <span class="listleft">抖音ID:</span>
            <span class="listright">{{blogDetail.douyin_id}}</span>
        </div>
        <div class="list">
            <span class="listleft">抖音粉丝数:</span>
            <span class="listright">{{blogDetail.douyin_fans_num}}</span>
        </div>
        <div class="list" >
            <span class="listleft">博主级别:</span>
            <span class="listright" v-if="blogDetail.level">{{taskLevelArr.find(item => item.value == blogDetail.level).name}}</span>
        </div>
        <div class="list" v-if='blogDetail.hatch_star_at !== "privacy"'>
            <span class="listleft">孵化期:</span>
            <span class="listright">{{blogDetail.hatch_star_at + '至' + blogDetail.hatch_end_at}}</span>
        </div>
        <div class="list">
            <span class="listleft">商务合作要求:</span>
            <span class="listright">{{blogDetail.cooperation_demand}}</span>
        </div>
        <div class="list">
            <span class="listleft">备注:</span>
            <span class="listright">{{blogDetail.desc}}</span>
        </div>
        <h4 class="head-title" style="margin-top:0.1rem"><i class="iconfont icon-biaoti" ></i>更新信息</h4>
        <div class="list">
            <span class="listleft">录入人:</span>
            <span class="listright">{{blogDetail.creator.data.name}}</span>
        </div>
        <div class="list">
            <span class="listleft">录入时间:</span>
            <span class="listright">{{blogDetail.created_at}}</span>
        </div>
        <div class="list">
            <span class="listleft">最近更新人:</span>
            <span class="listright">
                <template v-if="blogDetail.last_updated_user">
                    {{blogDetail.last_updated_user}}
                </template>
                <template v-else>{{ blogDetail.creator.data.name }}</template>
            </span>
        </div>
        <div class="list">
            <span class="listleft">更新时间:</span>
            <span class="listright">
                <template v-if="blogDetail.last_follow_up_at">
                    {{blogDetail.last_follow_up_at}}
                </template>
                <template v-else>{{ blogDetail.created_at }}</template>
            </span>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import config from '@/utils/config'
export default {
    data(){
        return {
            genderArr:config.genderArr,//性别
            artistStatusArr:config.papiCommunicationStatusArr,//沟通状态
            yesOrNo:config.blogBoolean,
            taskLevelArr:config.taskLevelArr,
            artistPlatformList:config.platformArr,//平台列表
            platform:''
        }
    },
    computed:{
        ...mapState([
            'blogDetail'
        ])
    },
    watch:{
        blogDetail(){
           let aPlatform = this.blogDetail.platform.split(',')
           let aPlatformName =[]
           for (let i = 0; i < this.artistPlatformList.length; i++) {               
               if(aPlatform.find(item => item ==this.artistPlatformList[i].value)){
                   aPlatformName.push(this.artistPlatformList[i].label)
               }
           }
           this.platform = aPlatformName.join(',')
       }
    },
    
    created(){
        this.getArtist()
    },
    methods:{
        ...mapActions([
            'getBlogDetail'
        ]),
        getArtist () {
            const params = {}
            params.data = {
                include: 'creator'
            }
            params.id = this.$route.params.id
            this.getBlogDetail(params)
        }
    }
}
</script>

<style lang="scss" scoped>
    .list{
        font-size:0.28rem;
        padding:0 0.4rem 0.16rem 0.4rem;
        background-color:#fff;
        display: flex;
        justify-content: flex-start;
        span{
            display: inline-block;
        }
    }
    .listleft{
        color:#666;
        flex-shrink:0;
    }
    .listright{
        margin-left:0.12rem;
        color:#151515;
        flex-shrink:1;
    }
    .bg-white{
        background-color:#fff
    }
    .section{
        margin:0.12rem 0;
        text-align: left
    }
    .head-title{
        color:#333333;
        padding:0.2rem 0.4rem;
        margin:0px;
        background-color:#fff;
    }
    h4{
        i{
            margin-left:-2px;
        }
    }
    .text-left{
        text-align: left
    }
</style>


