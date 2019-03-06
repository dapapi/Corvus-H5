<template>
    <div v-if="artistDetail.name">
        <h4 class="head-title"><i class="iconfont icon-biaoti"></i>基本资料</h4>
        <div class="list">
            <span class="listleft">姓名:</span>
            <span class="listright">{{artistDetail.name}}</span>
        </div>
        <div class="list">
            <span class="listleft">性别:</span>
            <span class="listright">{{genderArr.find(item =>item.value==artistDetail.gender).name}}</span>
        </div>
        <div class="list">
            <span class="listleft">出生日期:</span>
            <span class="listright">{{artistDetail.birthday}}</span>
        </div>
        <div class="list">
            <span class="listleft">年龄:</span>
            <span class="listright">{{artistDetail.birthday|jsGetAge}}</span>
        </div>
        <div class="list">
            <span class="listleft">艺人来源:</span>
            <span class="listright">{{artistSourceArr.find(item => item.value ==artistDetail.source).name}}</span>
        </div>
        <div class="list">
            <span class="listleft">沟通状态:</span>
            <span class="listright">{{artistStatusArr.find(item => item.value ==artistDetail.communication_status).name}}</span>
        </div>
        <div class="list">
            <span class="listleft">与我司签约意向:</span>
            <span class="listright">{{yesOrNo.find(item => item.value == artistDetail.intention).name}}</span>
        </div>
        <div class="list">
            <span class="listleft">是否签约其他公司:</span>
            <span class="listright">{{yesOrNo.find(item => item.value == artistDetail.sign_contract_other).name}}</span>
        </div>
        <div class="list">
            <span class="listleft">星探:</span>
            <span class="listright">{{artistDetail.artist_scout_name}}</span>
        </div>
        <div class="list">
            <span class="listleft">地区:</span>
            <span class="listright">{{artistDetail.star_location}}</span>
        </div>
        <div class="list">
            <span class="listleft">手机号:</span>
            <span class="listright">{{artistDetail.phone}}</span>
        </div>
        <div class="list">
            <span class="listleft">微信:</span>
            <span class="listright">{{artistDetail.wechat}}</span>
        </div>
        <div class="list">
            <span class="listleft">邮箱:</span>
            <span class="listright">{{artistDetail.email}}</span>
        </div>
        <div class="list">
            <span class="listleft">社交平台:</span>
            <span class="listright">{{platform}}</span>
        </div>
        <div class="list" v-if="artistDetail.weibo_url">
            <span class="listleft">微博主页地址:</span>
            <span class="listright">{{artistDetail.weibo_url}}</span>
        </div>
        <div class="list" v-if="artistDetail.weibo_fans_num">
            <span class="listleft">微博粉丝数:</span>
            <span class="listright">{{artistDetail.weibo_fans_num}}</span>
        </div>
        <div class="list" v-if="artistDetail.douyin_id">
            <span class="listleft">抖音ID:</span>
            <span class="listright">{{artistDetail.douyin_id}}</span>
        </div>
        <div class="list" v-if="artistDetail.douyin_fans_num">
            <span class="listleft">抖音粉丝数:</span>
            <span class="listright">{{artistDetail.douyin_fans_num}}</span>
        </div>
        <div class="list">
            <span class="listleft">备注:</span>
            <span class="listright">{{artistDetail.desc}}</span>
        </div>
        <div class="section" v-if="artistDetail.affixes.data">
            <Cell class="text-left" ><span class="listleft">{{attachmentTypeArr.find(item => item.value == affix.type).name}}--{{affix.title}}</span></Cell>
        </div>
        <h4 class="head-title"><i class="iconfont icon-biaoti"></i>更新信息</h4>
        <div class="list">
            <span class="listleft">录入人:</span>
            <span class="listright">{{artistDetail.creator.data.name}}</span>
        </div>
        <div class="list">
            <span class="listleft">录入时间:</span>
            <span class="listright">{{artistDetail.created_at}}</span>
        </div>
        <div class="list">
            <span class="listleft">最近更新人:</span>
            <span class="listright">
                <template v-if="artistDetail.last_updated_user">
                    {{artistDetail.last_updated_user}}
                </template>
                <template v-else>{{ artistDetail.creator.data.name }}</template>
            </span>
        </div>
        <div class="list">
            <span class="listleft">更新时间:</span>
            <span class="listright">
                <template v-if="artistDetail.last_follow_up_at">
                    {{artistDetail.last_follow_up_at}}
                </template>
                <template v-else>{{ artistDetail.created_at }}</template>
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
            artistSourceArr:config.artistSourceArr,//艺人来源
            artistStatusArr:config.artistStatusArr,//沟通状态
            yesOrNo:config.yesOrNo,
            attachmentTypeArr:config.attachmentTypeArr,//附件类型
            artistPlatformList:config.artistPlatformList,//平台列表
            platform:''
        }
    },
    computed:{
        ...mapState([
            'artistDetail'
        ])
    },
    watch:{
        artistDetail(){
           let aPlatform = this.artistDetail.platform.split(',')
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
            'getArtistDetail'
        ]),
        getArtist () {
            const params = {}
            params.data = {
                include: 'creator,affixes'
            }
            params.id = this.$route.params.id
            this.getArtistDetail(params)
        }
    },
    filters: {
        jsGetAge: function (strBirthday) {
            if (strBirthday) {
                var returnAge;
                // 根据生日计算年龄（"1995-09-25"）
                //以下五行是为了获取出生年月日，如果是从身份证上获取需要稍微改变一下
                var strBirthdayArr = strBirthday.split("-");
                var birthYear = strBirthdayArr[0];
                var birthMonth = strBirthdayArr[1];
                var birthDay = strBirthdayArr[2];

                var d = new Date();
                var nowYear = d.getFullYear();
                var nowMonth = d.getMonth() + 1;
                var nowDay = d.getDate();

                if (nowYear == birthYear) {
                    returnAge = 0;//同年 则为0岁
                }
                else {
                    var ageDiff = nowYear - birthYear; //年之差
                    if (ageDiff > 0) {
                        if (nowMonth == birthMonth) {
                            var dayDiff = nowDay - birthDay;//日之差
                            if (dayDiff < 0) {
                                returnAge = ageDiff - 1;
                            }
                            else {
                                returnAge = ageDiff;
                            }
                        }
                        else {
                            var monthDiff = nowMonth - birthMonth;//月之差
                            if (monthDiff < 0) {
                                returnAge = ageDiff - 1;
                            }
                            else {
                                returnAge = ageDiff;
                            }
                        }
                    }
                    else {
                        returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
                    }
                }
                return returnAge;//返回周岁年龄
            } else {
                return strBirthday
            }
        },
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


