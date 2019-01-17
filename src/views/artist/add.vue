<template>
    <div>
        <div v-show="!popupPlatform">
            <Field label="姓名" v-model="username"></Field>
            <!--性别-->
            <Cell title="性别" is-link @click.native="changeState('popupGender',!popupGender)" :value="gender.name"></Cell>
            <Selector :visible="popupGender" :data="genderArr" @change="changeGender" />

            <Cell title="出生日期" is-link></Cell>
            <!--艺人来源-->
            <Cell title="艺人来源" is-link @click.native="changeState('popupArtistSource',!popupArtistSource)" :value="artistSource.name"></Cell>
            <Selector :visible="popupArtistSource" :data="artistSourceArr" @change="changeArtistSource" />
            
            <Field label="邮箱" v-model="email"></Field>
            <Field label="手机号" v-model="phone"></Field>
            <Field label="微信" v-model="wechat"></Field>
            <Field label="星探姓名" v-model="scout"></Field>
            <Field label="地区" v-model="region"></Field>
            <!--平台-->
            <Cell title="平台" is-link @click.native="checkResource()"><span class="mint-cell-mask"></span></Cell>
            
            <Field placeholder="微博主页地址"  v-model="email"></Field>
            <Field placeholder="微博粉丝数" v-model="phone"></Field>
            <Field placeholder="百科地址" v-model="wechat"></Field>
            <Field placeholder="百科粉丝数" v-model="scout"></Field>
            <Field placeholder="抖音ID" v-model="region"></Field>
            <Field placeholder="抖音粉丝数" v-model="email"></Field>
            <Field placeholder="其他地址" v-model="phone"></Field>
            <Field placeholder="其他地址粉丝数" v-model="wechat"></Field>
            
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
        <CheckList v-show='popupPlatform' :selectorData="artistPlatformList" :multiple="true" @change="seletedData"/>
       
            
        
    </div>
</template>
<script>
import config from '@/utils/config.js'
export default {
    data(){
        return {
            username:'',//姓名
            popupGender:false,
            genderArr:config.genderArr,
            gender:{},
           
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
    methods:{
        
        changeState (name, value) {
            this[name] = value
        },
        //性别
        changeGender:function(data){
           this.popupGender = !this.popupGender
           this.gender = data
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
           this.selectedPlatform = data
           console.log(this.selectedPlatform)
           
        },
        checkResource:function(){
           this.popupPlatform = !this.popupPlatform
           
        },
        //添加艺人
        addArtist:function(){
          
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
