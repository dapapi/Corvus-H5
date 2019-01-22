<template>
    
    <div >
        <h4 class="head-title"><i class="iconfont icon-biaoti"></i>基本资料</h4>
        <div class="list">
            <span class="listleft">项目名称:</span>
            <span class="listright">{{projectDetail.title}}</span>
        </div>
        <div class="list">
            <span class="listleft">负责人:</span>
            <span class="listright" v-if="projectDetail.principal">{{projectDetail.principal.data.name}}</span>
        </div>
        <div class="list">
            <span class="listleft">参与人:</span>
            <span class="listright">{{participantsName}}</span>
        </div>
        <div class="list">
            <span class="listleft" v-if="projectDetail.type == 5">可见范围:</span>
            <span class="listright" v-if='projectDetail.privacy'>{{visibleRangeArr.find(item => item.value == projectDetail.privacy).name}}</span>
        </div>
        <div class="list" v-if="projectDetail.type != 5">
            <span class="listleft">项目来源:</span>
            <span class="listright" v-if="projectDetail.trail">{{trailOrigin.find(item => item.value == projectDetail.trail.data.resource_type).name}}</span>
        </div>
        <div class="list" v-if="projectDetail.type != 5">
            <span class="listleft">目标艺人:</span>
            <span class="listright" v-if="projectDetail.trail && projectDetail.trail.data.expectations">
                <template v-for="artist in projectDetail.trail.data.expectations.data">
                    <template v-if="artist.name">
                        {{ artist.name }}
                    </template>
                    <template v-else>
                        {{ artist.nickname }}
                    </template>
                </template>
            </span>
        </div>
        <div class="list">
            <span class="listleft">优先级:</span>
            <span class="listright" v-if='projectDetail.priority'>{{levelArr.find(item => item.value ==projectDetail.priority).name}}</span>
        </div>
        <div class="list">
            <span class="listleft">开始时间:</span>
            <span class="listright" v-if='projectDetail.start_at'>{{projectDetail.start_at.split(' ')[0]}}</span>
        </div>
        <div class="list">
            <span class="listleft">截止时间:</span>
            <span class="listright" v-if='projectDetail.end_at'>{{projectDetail.end_at.split(' ')[0]}}</span>
        </div>
        <div v-if="projectDetailMeta.fields">
            <div class="list" v-for="(item,index) in projectDetailMeta.fields.data" :key="index">
                <span class="listleft">{{item.key}}:</span>
                <span class="listright">{{item.values.data.value}}</span>
            </div>
        </div>
        <div class="list">
            <span class="listleft">备注:</span>
            <span class="listright">{{projectDetail.desc}}</span>
        </div>
        <h4 class="head-title isMargin"><i class="iconfont icon-biaoti"></i>其他信息</h4>
        <div class="list">
            <span class="listleft">录入人:</span>
            <span class="listright" v-if="projectDetail.creator">{{projectDetail.creator.data.name}}</span>
        </div>
        <div class="list">
            <span class="listleft">录入时间:</span>
            <span class="listright">{{projectDetail.created_at}}</span>
        </div>
        <div class="list">
            <span class="listleft">最近更新人:</span>
            <span class="listright">
                <template v-if="projectDetail.last_updated_user">
                    {{projectDetail.last_updated_user}}
                </template>
                <template v-else-if="projectDetail.creator">{{ projectDetail.creator.data.name }}</template>
            </span>
        </div>
        <div class="list">
            <span class="listleft">最近更新时间:</span>
            <span class="listright">
                <template v-if="projectDetail.last_follow_up_at">
                    {{projectDetail.last_follow_up_at}}
                </template>
                <template v-else>{{ projectDetail.created_at }}</template>
            </span>
        </div>
        <div class="list">
            <span class="listleft">关联项目:</span>
            <span class="listright" v-if="projectDetail.relate_projects">
                <span v-for="(item,index) in projectDetail.relate_projects.data" :key="index">{{item.title}}</span>
            </span>
        </div>
        <div class="list">
            <span class="listleft">关联任务:</span>
            <span class="listright" v-if="projectDetail.relate_tasks">
                <span v-for="(item,index) in projectDetail.relate_tasks.data" :key="index">{{item.title}}</span>
            </span>
        </div>
        <div class="list isMargin" v-if="projectDetail.form_instance_number">
            <ApprovalProgress :formid="projectDetail.form_instance_number"></ApprovalProgress>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import config from '@/utils/config'
import ApprovalProgress from '@/components/ApprovalProgress.vue'
export default {
    data(){
        return {
            participantsName:'',
            trailOrigin:config.trailOrigin,//项目来源
            levelArr: config.levelArr,//优先级
            visibleRangeArr: config.visibleRangeArr,//可见范围
        }
    },
    computed:{
        ...mapState([
            'projectDetail',
            'projectDetailMeta'
        ])
    },
    components:{
       ApprovalProgress
    },
    watch:{
        projectDetail(){
           
           //参与人
           let aParticipantsName = []
           this.projectDetail.participants.data.map((item)=>{
               aParticipantsName.push(item.name)
           })
           this.participantsName = aParticipantsName.join(',')


        },
        projectDetailMeta(){

        }
    },
    
    created(){
        this.getProject()
    },
    methods:{
        ...mapActions([
            'getProjectDetail'
        ]),
        getProject () {
            const params = {}
            params.data = {
                include: 'principal,participants,creator,fields,trail.expectations,trail.client,relate_tasks,relate_projects,type'
            }
            params.id = this.$route.params.id
            this.getProjectDetail(params)
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
    .isMargin{
        margin-top:0.2rem
    }
</style>


