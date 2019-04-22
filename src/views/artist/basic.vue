<template>
    <div class="details" v-if="artistDetail.name">
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
            <span class="listleft" >出生日期:</span>
            <span class="listright" v-if="artistDetail.birthday !== 'privacy'">{{artistDetail.birthday}}</span>
            <span class="listright dot" v-else>***</span>
        </div>
        <div class="list">
            <span class="listleft">年龄:</span>
            <span class="listright" v-if="artistDetail.birthday !== 'privacy'">{{artistDetail.birthday|jsGetAge}}</span>
            <span class="listright dot" v-else>***</span>
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
            <span class="listright" v-if="artistDetail.intention == 2">-{{artistDetail.intention_desc}}</span>
        </div>
        <div class="list">
            <span class="listleft">是否签约其他公司:</span>
            <span class="listright">{{yesOrNo.find(item => item.value == artistDetail.sign_contract_other).name}}</span>
            <span class="listright" v-if="artistDetail.sign_contract_other == 1">-{{artistDetail.sign_contract_other_name}}</span>
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
            <span class="listleft">潜在风险点:</span>
            <span class="listright" v-if="artistDetail.star_risk_point !== 'privacy'">{{artistDetail.star_risk_point}}</span>
            <span class="listright dot" v-else>***</span>
        </div>
        
        <div class="list">
            <span class="listleft">手机号:</span>
            <span class="listright"  v-if="artistDetail.phone !== 'privacy'">{{artistDetail.phone}}</span>
            <span class="listright dot" v-else>***</span>
        </div>
        <div class="list">
            <span class="listleft">微信:</span>
            <span class="listright"  v-if="artistDetail.wechat !== 'privacy'">{{artistDetail.wechat}}</span>
            <span class="listright dot" v-else>***</span>
        </div>
        <div class="list">
            <span class="listleft">邮箱:</span>
            <span class="listright" v-if="artistDetail.email !== 'privacy'">{{artistDetail.email}}</span>
            <span class="listright dot" v-else>***</span>
        </div>
        <div class="list">
            <span class="listleft">社交平台:</span>
            <span class="listright">{{platform}}</span>
        </div>
        <div class="list">
            <span class="listleft">微博主页地址:</span>
            <span class="listright">{{artistDetail.weibo_url}}</span>
        </div>
        <div class="list">
            <span class="listleft">微博粉丝数:</span>
            <span class="listright">{{artistDetail.weibo_fans_num}}</span>
        </div>
        <div class="list">
            <span class="listleft">抖音ID:</span>
            <span class="listright">{{artistDetail.douyin_id}}</span>
        </div>
        <div class="list">
            <span class="listleft">抖音粉丝数:</span>
            <span class="listright">{{artistDetail.douyin_fans_num}}</span>
        </div>
        <div class="list">
            <span class="listleft">签约状态:</span>
            <span class="listright">{{signState.find(item=>item.value ===
                                                    artistDetail.sign_contract_status).name}}</span>
        </div>
        <div class="list">
            <span class="listleft">备注:</span>
            <span class="listright">{{artistDetail.desc}}</span>
        </div>
        <div class="section attachment" v-if="artistDetail.affixes.data">        
            <div  class="annex-list" v-for="(affix, index) in artistDetail.affixes.data" :key="index">
                <div @click="preview(affix.url)" class="left">
                    <div class="icon">
                        <img v-if="['png','gif','bmp','jpg','jpeg'].includes(fileNameHandler(affix.url))" :src="affix.url" />
                        <i style="font-size:0.8rem;color:#37c8db" v-else-if="['doc','docx','document'].includes(fileNameHandler(affix.url))" class="iconfont icon-worddefuben"></i>
                        <i style="font-size:0.8rem;color:#9c27b0" v-else-if="['xls','xlsx'].includes(fileNameHandler(affix.url))" class="iconfont icon-word"></i>
                        <i class="iconfont icon-excel" style="font-size:0.8rem;color:#ff68e2" v-else-if="['mp4','WebM'].includes(fileNameHandler(affix.url))"></i>
                        <i class="iconfont icon-pdftubiao" style="font-size:0.8rem;color:#e00b3c" v-else-if="['pdf'].includes(fileNameHandler(affix.url))"></i>
                        <i class="iconfont icon-ppttubiao" style="font-size:0.8rem;color:#d24624" v-else-if="['ppt','pptx'].includes(fileNameHandler(affix.url))"></i>
                        <i class="iconfont icon-ZIPtubiao" style="font-size:0.8rem;color:#474de2" v-else-if="['zip'].includes(fileNameHandler(affix.url))"></i>
                        <i style="font-size:0.8rem" v-else class="iconfont icon-worddefuben"></i>
                    </div>
                    <div class="info">
                        <div class="title">{{cutName(affix.title) }}</div>
                        <div class="size">{{ (affix.size  / 1024).toFixed(1) }}k</div>
                    </div>
                </div>
            </div>
     
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
                <template v-if="artistDetail.last_updated_at">
                    {{artistDetail.last_updated_at}}
                </template>
                <template v-else>{{ artistDetail.created_at }}</template>
            </span>
        </div>
        <div v-show="videoPlay" class="modal">
           
           <div class="modal-wrapper">
               <i class="iconfont icon-guanbi1" @click="closeVideo"></i>
               <div>
                   <img v-if="['png','gif','bmp','jpg','jpeg'].includes(fileNameHandler(affixVideo))" :src="affixVideo" alt="">
                   <video v-else-if="['mp4','WebM'].includes(fileNameHandler(affixVideo))"  ref="videoPlay" controls autoplay="autoplay"  :src="affixVideo"></video>
               </div>
           </div>
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
            platform:'',
            signState:config.signState, // 签约状态
            videoPlay:false,//是否显示视频播放弹框
            affixVideo:'',//视频地址
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
        },
        //预览
        preview:function(url){
            if(config.whichDevice() === 'ios'){
                config.deviceWay('attachment',url)
            }else if(['png','gif','bmp','jpg','jpeg'].includes(this.fileNameHandler(url))){
                this.videoPlay = true
                this.affixVideo = url
            }else if(['mp4','WebM'].includes(this.fileNameHandler(url))){
                this.videoPlay = true
                this.affixVideo = url
            }else{
                config.deviceWay('attachment',url)
            }
           
        },
        closeVideo:function(){
            this.videoPlay = false;
            if(['mp4','WebM'].includes(this.fileNameHandler(this.affixVideo))){
                this.$refs.videoPlay.pause()
            }    
        },
        // 整理附件名字
        cutName (title) {
            if (title) {
                const typeIndex = title.lastIndexOf('.')
                const fileType = title.substr(typeIndex + 1)
                const fileName = title.substr(0, typeIndex)
                if (fileName.length > 19) {
                return fileName.substr(0, 10) + '...' + fileName.substr(fileName.length - 5) + '.' +fileType
                } else {
                return title
                }
            }
        },
        fileNameHandler(url) {

            return String(url).split('.').pop(); 
        },
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
    .details{
        background-color:#fff;
        padding-bottom:0.28rem;
        font-size:14px;
    }
    .list{
        margin:.2rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .listleft{
        color:#333;
        flex-shrink:0;
    }
    .listright{
        color:#a4a4a4;
        
        flex-shrink:1;
        padding-left:0.1rem;
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
        padding:0.2rem;
        padding-bottom:0px;
        margin:0px;
        background-color:#fff;
        font-weight: 500;
    }
    h4{
        i{
            margin-left:-2px;
        }
    }
    .text-left{
        text-align: left
    }
    .dot{
        position: relative;
        top:0.08rem
    }
    .attachment {
        background-color:#f3f4f5;
        padding-bottom:0.2rem;
    // .annex  {
    //     font-size: .4rem;
    //     position: relative;
    //     left: .1rem;
    // }
    .annex-list {
        background-color: #fff;
        padding: .2rem;
        min-height: 1rem;
        position: relative;
        &:after {
        content: '';
        border-top: 1px solid #D8D8D8;
        width: calc(100% - .8rem);
        position: absolute;
        bottom: 0;
        left: .4rem;
        }
        &:last-child{
            &:after{
                content: '';
                border-top: 0px solid #D8D8D8;
            }
        }
        .left {
            display: flex;
            justify-content: flex-start;
            // align-items: center;
            .icon {
                display: inline-block;
                width: 1rem;
                height: 1rem;
                margin-right: .2rem;
                flex-shrink:0;
                img {
                width: 100%;
                height: 100%;
                }
            }
            .info {
                display: inline-block;
                vertical-align: top;
                flex-shrink:1;
                .title {
                font-size: 14px;
                color: #a4a4a4;
                margin-top: .1rem;
                }
                .size {
                font-size: .24rem;
                margin-top: .1rem;
                color: #a4a4a4;
                }
            }
        }
        .right {
        float: right;
        width: 1rem;
        height: 1rem;
        border-left: 1px solid #D8D8D8;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        i {
            font-size: .4rem;
            position: relative;
            left: .1rem;
        }
        }
    }
}
.modal{
    position: fixed;
    left:0px;
    right:0px;
    top:0px;
    bottom:0px;
    background-color:rgba(0,0,0,0.2);
    display: flex;
    align-items:center;
    justify-content:center;
    .icon-guanbi1{
        position: absolute;
        top:.1rem;
        right: 0rem;
        font-size: .32rem;
        font-weight: bold;
    }
    .modal-wrapper{
        width: 100%;
        background-color:#fff;
        video,img{
            width: 100%;
        }
        

    }
}
</style>


