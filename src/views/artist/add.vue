<template>
    <div>
        <div v-show="!popupPlatform">
            <Field class="require" label="姓名" v-model="username"></Field>
            <!--性别-->
            <Cell class="require"  title="性别" is-link @click.native="changeState('popupGender',!popupGender)" :value="gender.name"></Cell>
            <Selector :visible="popupGender" :data="genderArr" @change="changeGender" />
           <!--出生日期-->
            <Cell class="require" title="出生日期" is-link @click.native="changeBornTime" :value="bornTime"></Cell>
            <DatetimePicker
                ref="bornPicker"
                type="date"
                v-model="defaultDate"
                :startDate="startDate"
                @confirm="bornConfirm"
                @visible-change="handleValueChange"
            />
            <!--艺人来源-->
            <Cell class="require" title="艺人来源" is-link @click.native="changeState('popupArtistSource',!popupArtistSource)" :value="artistSource.name"></Cell>
            <Selector :visible="popupArtistSource" :data="artistSourceArr" @change="changeArtistSource" />
            
            <Field class="require" label="邮箱" v-model="email"></Field>
            <Field class="require" label="手机号" v-model="phone"></Field>
            <Field label="微信" v-model="wechat"></Field>
            <Field label="星探姓名" v-model="scout"></Field>
            <Field label="地区" v-model="region"></Field>
            <!--平台-->
            <Cell class="require" title="平台" is-link @click.native="changeState('popupPlatform',!popupPlatform)" :value="platformName"></Cell>
            
            <Field class="text-left" label="微博主页地址" placeholder="微博主页地址" v-if="selectedPlatform.find(item => item.value ==1)" v-model="weiboUrl"></Field>
            <Field class="text-left" label="微博粉丝数" placeholder="微博粉丝数" v-if="selectedPlatform.find(item => item.value ==1)" v-model="weiboFansNum"></Field>
            <Field class="text-left" label="百科地址" placeholder="百科地址" v-if="selectedPlatform.find(item => item.value ==2)" v-model="baikeUrl"></Field>
            <Field class="text-left" label="百科粉丝数" placeholder="百科粉丝数" v-if="selectedPlatform.find(item => item.value ==2)" v-model="baikeFansNum"></Field>
            <Field class="text-left" label="抖音ID" placeholder="抖音ID" v-if="selectedPlatform.find(item => item.value ==3)" v-model="douyinId"></Field>
            <Field class="text-left" label="抖音粉丝数" placeholder="抖音粉丝数" v-if="selectedPlatform.find(item => item.value ==3)" v-model="douyinFansNum"></Field>
            <Field class="text-left" label="其他地址" placeholder="其他地址" v-if="selectedPlatform.find(item => item.value ==4)" v-model="qitaUrl"></Field>
            <Field class="text-left" label="其他地址粉丝数" placeholder="其他地址粉丝数" v-if="selectedPlatform.find(item => item.value ==4)" v-model="qitaFansNum"></Field>
            
            <!--沟通状态-->
            <Cell class="require" title="沟通状态" is-link  @click.native="changeState('popupArtistStatus',!popupArtistStatus)" :value="artistStatus.name"></Cell>
            <Selector :visible="popupArtistStatus" :data="artistStatusArr" @change="changeArtistStatus" />
            <!--与我司签约意向-->
            <Cell class="require" title="与我司签约意向" is-link @click.native="changeState('popupIntention',!popupIntention)" :value="intention.name"></Cell>
            <Selector :visible="popupIntention" :data="yesOrNo" @change="changeIntention" />
            <Field class="text-left" v-show="intention.value == 2" v-model="intentionTxt" placeholder="请填写不签约理由"></Field>
            <!--是否签约其他公司-->
            <Cell class="require" title="是否签约其他公司" is-link  @click.native="changeState('popupSign',!popupSign)" :value="sign.name"></Cell>
            <Selector :visible="popupSign" :data="yesOrNo" @change="changeSign" />
            <Field class="text-left" v-show="sign.value == 1" v-model="company" placeholder="请输入已签约公司名称"></Field>

            <Cell title="艺人头像">
                <template>
                    <FileUpload @change="upload" :accept="'image/*'">
                        <span class="avatar" v-if="uploadUrl" :style="{ backgroundImage: 'url('+uploadUrl+')'}"></span>
                        <i v-else class="uploadIcon">+</i>
                    </FileUpload>
                </template>
            </Cell>
            <Field type="textarea" ref="textarea" label="备注" v-model="remark" rows="1"></Field>
            <!-- <div style='text-align:center'>
                <button style="margin-top:10px;width:100px;height:48px;background-color:red" @click="addArtist()">提交</button>
            </div> -->
        </div>
        <!--选择平台-->
        <CheckList v-if='popupPlatform' :selectorData="artistPlatformList" :selectedData="selectedPlatform" :multiple="true" :originTitle="'新增艺人'" :newTitle="'艺人平台'" :rightClick="addArtist" :leftClick ="leftClick" @change="seletedData"/>
    </div>
</template>
<script>
import config from '@/utils/config.js'
import tool from '@/utils/tool.js'
import { mapState, mapActions, mapMutations } from 'vuex'
import moment from 'moment'
import fetch from '@/utils/fetch'
import { Toast } from 'mint-ui'
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
            uploadUrl:'',//艺人头像
            remark:'',//备注
            txtHeight:0,//备注框高度
            handler:function(e){
                e.preventDefault()
            },
            reSubmit:false //重复提交参数
        }
    },
    computed:{
        ...mapState([
            'artistDetail',
            'isLoading'
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
            this.intentionTxt = this.artistDetail.intention_desc
            this.sign = this.yesOrNo.find(item => item.value == this.artistDetail.sign_contract_other)
            this.company = this.artistDetail.sign_contract_other_name
            this.remark = this.artistDetail.desc
           
            this.weiboUrl =this.artistDetail.weibo_url
            this.weiboFansNum=this.artistDetail.weibo_fans_num
            this.douyinId=this.artistDetail.douyin_id
            this.douyinFansNum=this.artistDetail.douyin_fans_num
            this.baikeUrl=this.artistDetail.baike_url
            this.baikeFansNum=this.artistDetail.baike_fans_num
            this.qitaUrl=this.artistDetail.qita_url
            this.qitaFansNum=this.artistDetail.qita_fans_num
            this.uploadUrl = this.artistDetail.avatar

            let rPlatform = this.artistDetail.platform.split(',')
            let aPlatformName =[]
            for (let i = 0; i < this.artistPlatformList.length; i++) {               
                if(rPlatform.find(item => item ==this.artistPlatformList[i].value)){
                    this.selectedPlatform.push({
                        value:this.artistPlatformList[i].value,
                        label:this.artistPlatformList[i].label
                    })
                    aPlatformName.push(this.artistPlatformList[i].label)
                }
            }
            this.platformName = aPlatformName.join(',')
       },
       remark:function(){
           const el = this.$refs.textarea.$el.querySelector('textarea')
           el.style.height = el.scrollHeight - 4 + 'px'

       },
    //    isLoading:function(){
    //        if(this.isLoading == true){
    //         //    alert(111)
    //            Indicator.open();
    //        }else{
    //         //    alert(222)
    //            Indicator.close();
    //        }
    //    }
    },

    created(){
        this.startDate = new Date('1900')
        if(this.$route.params.id){
            this.getArtist()
        }
        window.rightClick = this.addArtist
       
    },
    mounted () {
        window.leftClick = this.leftClick
        let el = this.$refs.textarea.$el.querySelector('textarea')
        console.log(el.offsetHeight)
    },
    methods:{
        ...mapActions([
            'getArtistDetail',//获取艺人详情
            // 'postArtist',//添加艺人
            // 'putArtist',//编辑艺人
        ]),
        //返回
        leftClick:function(){
            config.deviceWay('back',2)
            
        },
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
        // 性别
        changeGender:function(data){
           this.popupGender = !this.popupGender
           this.gender = data
        },
        // 出生日期
        changeBornTime:function (){
            if (!this.bornTime) {
               this.bornTime = moment(this.defaultDate).format('YYYY-MM-DD')
            }
           this.$refs.bornPicker.open()            
        },
        bornConfirm (date) {
            this.bornTime = moment(date).format('YYYY-MM-DD')
        },
        // 艺人来源
        changeArtistSource:function(data){
            
            this.popupArtistSource = !this.popupArtistSource
            this.artistSource = data
        },
        // 沟通状态
        changeArtistStatus:function(data){
            this.popupArtistStatus = !this.popupArtistStatus
            this.artistStatus = data

        },
        // 签约意向
        changeIntention:function(data){
            this.popupIntention = !this.popupIntention
            this.intention = data
            if(this.intention.value == 1){
                this.intentionTxt = ''
            }
        },
        // 签约公司
        changeSign:function(data){
            this.popupSign = !this.popupSign
            this.sign = data
            if(this.sign.value == 1){
                this.company = ''
            }
        },
        // 平台
        seletedData:function(data,isHidden){
            this.popupPlatform = !this.popupPlatform
       
           let platformName =[]
           this.selectedPlatform = data
           data.map(n => {
               platformName.push(n.label)
           })
           this.platformName = platformName.join(',')
           
        },
        //上传头像
        upload:function(url){
           this.uploadUrl = url
        },
        //添加--编辑艺人
        addArtist:function(){
            if(this.reSubmit){
                Toast('正在提交数据,请勿重复提交')
                return false
            }
            this.reSubmit = !this.reSubmit
            let plat =[]
            let platform= ''
            let toast,id
            id = this.$route.params.id
            if(this.selectedPlatform){
                for (let i = 0; i < this.selectedPlatform.length; i++) {
                    plat.push(this.selectedPlatform[i].value)
                }
                platform = plat.join(',')
            }
            // console.log(platform)
            if(id){
                toast = '编辑艺人成功'
            }else{
                toast = '添加艺人成功'
            }
            let params= {
                toast:toast,
                data:{},
                id:id,
            }
            if(!this.username){
                Toast('请输入姓名')
                return false
            }
            if(!this.gender.value){
                Toast('请选择性别')
                return false
            }
            if(!this.bornTime){
                Toast('请选择出生日期')
                return false
            }
            if(!this.artistSource.value){
                Toast('请选择艺人来源')
                return false
            }
            if(!this.email){
                Toast('请输入邮箱')
                return false
            }
            if(!this.phone){
                Toast('请输入手机号码')
                return false
            }
            if(!this.artistStatus.value){
                Toast('请选择沟通状态')
                return false
            }
            if(!this.intention.value){
                Toast('请选择签约意向')
                return false
            }
            if(this.intention.value == 2&&!this.intentionTxt){
                Toast('请输入不签约理由')
                return false
            }
            if(!this.sign.value){
                Toast('请选择是否签约其他公司')
                return false
            }
            if(this.sign.value == 1&&!this.company){
                Toast('请输入签约其他公司名称')
                return false
            }
            if(!platform){
                Toast('请选择平台')
                return false
            }
            // this.$store.commit('setLoading',true)
            Indicator.open()
            params.data = {
                name: this.username,//名字
                gender: this.gender.value,//性别
                birthday: this.bornTime,//生日
                source: this.artistSource.value, //艺人来源
                email: this.email, //邮箱
                phone: this.phone, //手机
                wechat: this.wechat, //微信
                communication_status: this.artistStatus.value, //沟通状态  value 1是 2否
                intention: this.intention.value, //签约意向
                intention_desc: this.intentionTxt, //不签约理由
                sign_contract_other: this.sign.value, //是否签约其他公司
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
                desc: this.remark,//  备注
                avatar: this.uploadUrl
            }
            //id存在 编辑  否则添加
            id?this.putArtist(params):this.postArtist(params)
        },
        //添加艺人
        postArtist(params) {
            fetch('post', `/stars`, params.data).then(res => {
            Indicator.close()
            Toast(params.toast)
            this.reSubmit = false
            setTimeout(() => {
                config.deviceBack(2)
            }, 1000);
            }).catch((error) => {
                Indicator.close()
                this.reSubmit = false
                // console.log(error)
            })
        },
        //编辑艺人
        putArtist(params) {
            fetch('put', `/stars/${params.id}`, params.data).then(res => {
            Indicator.close()
            Toast(params.toast)
            this.reSubmit = false
            setTimeout(() => {
                config.deviceBack(2)
            }, 1000);
            }).catch((error) => {
                Indicator.close()
                this.reSubmit = false
                // console.log(error)
            })
        },
        //滚动穿透调用的方法
        handleValueChange: function (val) {
            if(val) {
                tool.ModalHelper.afterOpen()
            } else {
                tool.ModalHelper.beforeClose()
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.attachment {
  margin-top: .2rem;
  padding: .2rem;
  background-color: #fff;
}
.avatar{
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    background-size:cover;
}
.text-left{
    input{
        text-align:left!important;
    }
}
.uploadIcon{
    display: inline-block;
    width: .56rem;
    height: .56rem;
    border-radius: 50%;
    background-color:#eee;
    color:#fff;
    font-weight: bold;
    font-size: .48rem;
    line-height: .56rem;
    text-align: center;
    font-style: normal;
    margin-right:-0.2rem;
}

</style>
