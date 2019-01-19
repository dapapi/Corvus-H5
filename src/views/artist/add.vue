<template>
    <div>
        <div v-show="!popupPlatform">
            <Field label="姓名" v-model="username"></Field>
            <!--性别-->
            <Cell title="性别" is-link @click.native="changeState('popupGender',!popupGender)" :value="gender.name"></Cell>
            <Selector :visible="popupGender" :data="genderArr" @change="changeGender" />
           <!--出生日期-->
            <Cell title="出生日期" is-link @click.native="changeBornTime" :value="bornTime"></Cell>
            <DatetimePicker
                ref="bornPicker"
                type="date"
                v-model="defaultDate"
                :startDate="startDate"
                @confirm="bornConfirm"
            />
            <!--艺人来源-->
            <Cell title="艺人来源" is-link @click.native="changeState('popupArtistSource',!popupArtistSource)" :value="artistSource.name"></Cell>
            <Selector :visible="popupArtistSource" :data="artistSourceArr" @change="changeArtistSource" />
            
            <Field label="邮箱" v-model="email"></Field>
            <Field label="手机号" v-model="phone"></Field>
            <Field label="微信" v-model="wechat"></Field>
            <Field label="星探姓名" v-model="scout"></Field>
            <Field label="地区" v-model="region"></Field>
            <!--平台-->
            <Cell title="平台" is-link @click.native="checkResource()" :value="platformName"></Cell>
            
            <Field class="text-left" placeholder="微博主页地址" v-if="selectedPlatform.find(item => item ==1)" v-model="weiboUrl"></Field>
            <Field class="text-left" placeholder="微博粉丝数" v-if="selectedPlatform.find(item => item ==1)" v-model="weiboFansNum"></Field>
            <Field class="text-left" placeholder="百科地址" v-if="selectedPlatform.find(item => item ==2)" v-model="baikeUrl"></Field>
            <Field class="text-left" placeholder="百科粉丝数" v-if="selectedPlatform.find(item => item ==2)" v-model="baikeFansNum"></Field>
            <Field class="text-left" placeholder="抖音ID" v-if="selectedPlatform.find(item => item ==3)" v-model="douyinId"></Field>
            <Field class="text-left" placeholder="抖音粉丝数" v-if="selectedPlatform.find(item => item ==3)" v-model="douyinFansNum"></Field>
            <Field class="text-left" placeholder="其他地址" v-if="selectedPlatform.find(item => item ==4)" v-model="qitaUrl"></Field>
            <Field class="text-left" placeholder="其他地址粉丝数" v-if="selectedPlatform.find(item => item ==4)" v-model="qitaFansNum"></Field>
            
            <!--沟通状态-->
            <Cell title="沟通状态" is-link  @click.native="changeState('popupArtistStatus',!popupArtistStatus)" :value="artistStatus.name"></Cell>
            <Selector :visible="popupArtistStatus" :data="artistStatusArr" @change="changeArtistStatus" />
            <!--与我司签约意向-->
            <Cell title="与我司签约意向" is-link @click.native="changeState('popupIntention',!popupIntention)" :value="intention.name"></Cell>
            <Selector :visible="popupIntention" :data="yesOrNo" @change="changeIntention" />
            <Field class="text-left" v-show="intention.value == 2" v-model="intentionTxt" placeholder="请填写不签约理由"></Field>
            <!--是否签约其他公司-->
            <Cell title="是否签约其他公司" is-link  @click.native="changeState('popupSign',!popupSign)" :value="sign.name"></Cell>
            <Selector :visible="popupSign" :data="yesOrNo" @change="changeSign" />
            <Field class="text-left" v-show="sign.value == 1" v-model="company" placeholder="请输入已签约公司名称"></Field>

            <Cell title="艺人头像">
                <template>
                    <FileUpload />
                </template>
            </Cell>
            <Field label="备注" v-model="remark"></Field>
        </div>
        <CheckList v-show='popupPlatform' :selectorData="artistPlatformList" :selectedData="selectedPlatform" :multiple="true" @change="seletedData"/>
    </div>
</template>
<script>
import config from '@/utils/config.js'
import { mapState, mapActions, mapMutations } from 'vuex'
import moment from 'moment'
export default {
    data(){
        return {
            username:'',//姓名
            popupGender:false,//性别
            genderArr:config.genderArr,
            gender:{},
            bornTime:'',//出生日期
            startDate:null,
            defaultDate:new Date(),

            artistSourceArr:config.artistSourceArr,//艺人来源
            popupArtistSource:false,
            artistSource:{},

            email:'',//邮箱
            phone:'',//手机
            wechat:'',//微信
            scout:'',//星探
            region:'',//地区

            artistPlatformList:config.artistPlatformList,//平台列表
            popupPlatform:false,
            selectedPlatform:[],//选中的平台
            platformName:'',
            weiboUrl: '',
            weiboFansNum: '',
            douyinId: '',
            douyinFansNum: '',
            baikeUrl: '',
            baikeFansNum: '',
            qitaUrl: '',
            qitaFansNum: '',

            artistStatusArr:config.artistStatusArr,//沟通状态
            popupArtistStatus:false,
            artistStatus:{},
            yesOrNo:config.yesOrNo,
            popupIntention:false,//签约意向
            intention:{},
            intentionTxt:'',//不签约 ---原因
            popupSign:false,//是否与其他公司签约
            sign:{},
            company:'',//签约公司名称
            remark:'',//备注
        }
    },
    computed:{
        ...mapState([
            'artistDetail'
        ])
    },
    watch:{
        artistDetail(){
            this.username = this.artistDetail.name
            this.gender = this.genderArr.find(item =>item.value == this.artistDetail.gender)
            this.bornTime = this.artistDetail.birthday
            this.defaultDate = this.artistDetail.birthday
            this.artistSource = this.artistSourceArr.find(item => item.value == this.artistDetail.source)
            this.email = this.artistDetail.email
            this.phone = this.artistDetail.phone
            this.wechat = this.artistDetail.wechat
            this.region =this.artistDetail.star_location
            this.artistStatus = this.artistStatusArr.find(item => item.value == this.artistDetail.communication_status)
            this.intention = this.yesOrNo.find(item => item.value == this.artistDetail.intention)
            this.sign = this.yesOrNo.find(item => item.value == this.artistDetail.sign_contract_other)
            this.remark = this.artistDetail.desc
           
            this.weiboUrl =this.artistDetail.weibo_url
            this.weiboFansNum=this.artistDetail.weibo_fans_num
            this.douyinId=this.artistDetail.douyin_id
            this.douyinFansNum=this.artistDetail.douyin_fans_num
            this.baikeUrl=this.artistDetail.baike_url
            this.baikeFansNum=this.artistDetail.baike_fans_num
            this.qitaUrl=this.artistDetail.qita_url
            this.qitaFansNum=this.artistDetail.qita_fans_num
            
            this.selectedPlatform = this.artistDetail.platform.split(',')
            let aPlatformName =[]
            for (let i = 0; i < this.artistPlatformList.length; i++) {               
                if(this.selectedPlatform.find(item => item ==this.artistPlatformList[i].value)){
                    aPlatformName.push(this.artistPlatformList[i].label)
                }
            }
            this.platformName = aPlatformName.join(',')
       }
    },
    created(){
        this.startDate = new Date('1900')
        if(this.$route.params.id){
            this.getArtist()
        }
        this.addArtist()
        window.addArtist = this.addArtist
        window.editArtist = this.editArtist
    },
    methods:{
        ...mapActions([
            'getArtistDetail',//获取艺人详情
            'postArtist',//添加艺人
            'putArtist',//编辑艺人
        ]),
        //获取艺人详情
        getArtist () {
            const params = {}
            params.data = {
                include: 'creator,affixes'
            }
            params.id = this.$route.params.id
            this.getArtistDetail(params)
        },
        changeState (name, value) {
            this[name] = value
        },
        //性别
        changeGender:function(data){
           this.popupGender = !this.popupGender
           this.gender = data
        },
        //出生日期
        changeBornTime:function(){
            if(!this.bornTime){
               this.bornTime = moment(this.defaultDate).format('YYYY-MM-DD')
            }
           this.$refs.bornPicker.open()
        },
        bornConfirm (date) {
            this.bornTime = moment(date).format('YYYY-MM-DD')
        },
        //艺人来源
        changeArtistSource:function(data){
            
            this.popupArtistSource = !this.popupArtistSource
            this.artistSource = data
        },
        //沟通状态
        changeArtistStatus:function(data){
            this.popupArtistStatus = !this.popupArtistStatus
            this.artistStatus = data
        },
        //签约意向
        changeIntention:function(data){
            this.popupIntention = !this.popupIntention
            this.intention = data
        },
        //签约公司
        changeSign:function(data){
            this.popupSign = !this.popupSign
            this.sign = data
        },
        //平台
        seletedData:function(data,isHidden){
           if(isHidden){
               this.popupPlatform = false
           }
           let platformName =[]
           this.selectedPlatform = data
           for (let i = 0; i < this.artistPlatformList.length; i++) {
               if(this.selectedPlatform.find(item => item ==this.artistPlatformList[i].value)){
                   platformName.push(this.artistPlatformList[i].label)
               }
               
           }
           this.platformName = platformName.join(',')
           
        },
        checkResource:function(){
           this.popupPlatform = !this.popupPlatform           
        },
        
        //添加--编辑艺人
        addArtist:function(id){
            
            let platform = this.selectedPlatform.join(',')
            let params= {
                toast:'添加艺人成功',
                data:{},
                id:id
            }
            
            params.data = {
                name: this.username,//名字
                gender: this.gender.value,//性别
                birthday: this.bornTime,//生日
                source: this.artistSource.value, //艺人来源
                email: this.email, //邮箱
                phone: this.phone, //手机
                wechat: this.wechat, //微信
                communication_status: this.artistStatus.value, //沟通状态
                intention: this.intention.value, //签约意向
                intention_desc: this.intentionTxt, //不签约理由
                sign_contract_other: this.sign, //是否签约其他公司
                sign_contract_other_name: this.company, //签约其他公司名称
                artist_scout_name: this.scout,//星探名称
                star_location: this.region, //明星地区
                platform: platform,//社交平台
                weibo_url: this.weiboUrl,
                weibo_fans_num: this.weiboFansNum,
                baike_url: this.baikeUrl,
                baike_fans_num: this.baikeFansNum,
                douyin_id: this.douyinId,
                douyin_fans_num: this.douyinFansNum,
                qita_url: this.qitaUrl,
                qita_fans_num: this.qitaFansNum,
                // affix: this.affixes,//附件
                desc: this.artistDesc,//  备注
                // avatar: this.uploadUrl
            }
            //id存在 编辑  否则添加
            id?this.putArtist(params):this.postArtist(params)
            
        }
    }
}
</script>
<style lang="scss">
.attachment {
  margin-top: .2rem;
  padding: .2rem;
  background-color: #fff;
}
.text-left{
    input{
        text-align:left!important;
    }
}

</style>
