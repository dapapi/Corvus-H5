<template>
    <div>
        <div v-show="!popupPlatform">
            <Field class="require" label="昵称" v-model="username"></Field>
            
            <!--平台-->
            <Cell class="require" title="平台" is-link @click.native="checkResource()" :value="platformName"></Cell>
            
            <Field class="text-left" label="微博主页地址" placeholder="微博主页地址" v-if="selectedPlatform.find(item => item.value ==1)" v-model="weiboUrl"></Field>
            <Field class="text-left" label="微博粉丝数" placeholder="微博粉丝数" v-if="selectedPlatform.find(item => item.value ==1)" v-model="weiboFansNum"></Field>
            <Field class="text-left" label="抖音ID" placeholder="抖音ID" v-if="selectedPlatform.find(item => item.value ==2)" v-model="douyinId"></Field>
            <Field class="text-left" label="抖音粉丝数" placeholder="抖音粉丝数" v-if="selectedPlatform.find(item => item.value ==2)" v-model="douyinFansNum"></Field>
            <Field class="text-left" label="小红书链接" placeholder="小红书链接" v-if="selectedPlatform.find(item => item.value ==3)" v-model="xhsUrl"></Field>
            <Field class="text-left" label="小红书粉丝数" placeholder="小红书粉丝数" v-if="selectedPlatform.find(item => item.value ==3)" v-model="xhsFansNum"></Field>
            <!--孵化期-->
            <div class="angry mint-cell" v-if="this.$route.params.id">
                <div class="mint-cell-wrapper">
                    <span class="veryAngry">孵化期</span>
                    <span v-if='blogDetail.hatch_star_at !== "privacy"&&blogDetail.hatch_end_at!== "privacy"'>
                    <span class="isAngry" @click="changeStartTime">{{hatch_star_at||`请选择开始时间`}}</span>至
                    <span class="isAngry" @click="changeEndTime">{{hatch_end_at||`请选择结束时间`}}</span> 
                    </span>
                    <span v-else>***</span>
                </div>
            </div>
            <!-- <Cell title="孵化期" is-link class="angry" > 
                
            </Cell> -->
            <DatetimePicker
                ref="startPicker"
                type="date"
                v-model="defaultDate"
                :startDate="startDate"
                @confirm="startConfirm"
                @visible-change="handleValueChange"
            />
            <DatetimePicker
                ref="endPicker"
                type="date"
                v-model="defaultDate"
                :startDate="startDate"
                @confirm="endConfirm"
                @visible-change="handleValueChange"
            />
            <!--类型-->
            <Cell class="require" title="类型" is-link  @click.native="changeState('popupBlogType',!popupBlogType)" :value="blogTypeSelect.name"></Cell>
            <Selector :visible="popupBlogType" :data="blogType" @change="changeBlogType" />
            <!--沟通状态-->
            <Cell class="require" title="沟通状态" is-link  @click.native="changeState('popupArtistStatus',!popupArtistStatus)" :value="artistStatus.name"></Cell>
            <Selector :visible="popupArtistStatus" :data="artistStatusArr" @change="changeArtistStatus" />
            <!--与我司签约意向-->
            <Cell class="require" title="与我司签约意向" is-link @click.native="changeState('popupIntention',!popupIntention)" :value="intention.name"></Cell>
            <Selector :visible="popupIntention" :data="yesOrNo" @change="changeIntention" />
            <Field class="text-left" v-show="intention.value == '0'" v-model="intentionTxt" placeholder="请填写不签约理由"></Field>
            <!--是否签约其他公司-->
            <Cell class="require" title="是否签约其他公司" is-link  @click.native="changeState('popupSign',!popupSign)" :value="sign.name"></Cell>
            <Selector :visible="popupSign" :data="yesOrNo" @change="changeSign" />
            <Field class="text-left" v-show="sign.value == 1" v-model="company" placeholder="请输入已签约公司名称"></Field>

            <Cell title="头像">
                
                <template>
                    <FileUpload @change="upload">
                        <span class="avatar" v-if="uploadUrl" :style="{ backgroundImage: 'url('+uploadUrl+')'}"></span>
                        <i v-else class="uploadIcon">+</i>
                    </FileUpload>
                </template>
            
            </Cell>
            <Field type="textarea" ref="textarea" label="备注" v-model="remark"></Field>
            <!-- <div style='text-align:center'>
                <button style="margin-top:10px;width:100px;height:48px;background-color:red" @click="addBlog()">提交</button>
            </div> -->
        </div>
        <CheckList v-if='popupPlatform' :selectorData="artistPlatformList" :selectedData="selectedPlatform" :originTitle="'新增博主'" :newTitle="'博主平台'" :rightClick="addBlog" :leftClick ="leftClick" :multiple="true" @change="seletedData"/>
    </div>
</template>
<script>
import config from '@/utils/config.js'
import tool from '@/utils/tool.js'
import { mapState, mapActions, mapMutations } from 'vuex'
import moment from 'moment'
import { Toast } from 'mint-ui'
import fetch from '@/utils/fetch'
export default {
    data(){
        return {
            username:'',//姓名
            
            popupBlogType:false,//博主类型
            blogTypeSelect:{},
            artistPlatformList:config.platformArr,//平台列表
            popupPlatform:false,
            selectedPlatform:[],//选中的平台
            platformName:'',
            weiboUrl: '',
            weiboFansNum: '',
            douyinId: '',
            douyinFansNum: '',
            xhsUrl: '',
            xhsFansNum: '',
            
            artistStatusArr:config.papiCommunicationStatusArr,//沟通状态
            popupArtistStatus:false,
            artistStatus:{},
            yesOrNo:config.blogBoolean,
            popupIntention:false,//签约意向
            intention:{},
            intentionTxt:'',//不签约 ---原因
            popupSign:false,//是否与其他公司签约
            sign:{},
            uploadUrl:'',//头像
            company:'',//签约公司名称
            remark:'',//备注
            reSubmit:false,//是否提交
            hatch_star_at:'',
            hatch_end_at:'',
            defaultDate:new Date(),
            startDate:null

        }
        
    },
    computed:{
        ...mapState([
            'blogDetail',
            'blogType'
        ])
    },
    watch:{
        blogDetail(){
            this.username = this.blogDetail.nickname
            this.blogTypeSelect = this.blogType.find(item =>item.value == this.blogDetail.type.data.id)
            this.artistStatus = this.artistStatusArr.find(item => item.value == this.blogDetail.communication_status)
            if(this.blogDetail.intention == false){
                this.intention = this.yesOrNo.find(item => item.value == 0)
            }else{
                this.intention = this.yesOrNo.find(item => item.value == 1)
            }
            
            this.intentionTxt = this.blogDetail.intention_desc
            this.sign = this.yesOrNo.find(item => item.value == this.blogDetail.sign_contract_other)
            this.company = this.blogDetail.sign_contract_other_name
            this.remark = this.blogDetail.desc
            
            this.weiboUrl =this.blogDetail.weibo_url
            this.weiboFansNum=this.blogDetail.weibo_fans_num
            this.douyinId=this.blogDetail.douyin_id
            this.douyinFansNum=this.blogDetail.douyin_fans_num
            this.xhsUrl=this.blogDetail.xiaohongshu_url
            this.xhsFansNum=this.blogDetail.xiaohongshu_fans_num
            this.uploadUrl = this.blogDetail.avatar

            this.hatch_star_at = this.$route.params.id&&this.blogDetail.hatch_star_at==='privacy'?'***':this.blogDetail.hatch_star_at
            this.hatch_end_at = this.$route.params.id&&this.blogDetail.hatch_end_at==='privacy'?'***':this.blogDetail.hatch_end_at

            let rPlatform = this.blogDetail.platform.split(',')
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
            // console.log(this.selectedPlatform)
            this.platformName = aPlatformName.join(',')
       },
       remark:function(){
           const el = this.$refs.textarea.$el.querySelector('textarea')
           el.style.height = el.scrollHeight - 4 + 'px'

       }
    },
    created(){
        this.startDate = new Date('1900')
        this.getBlogType()
        if(this.$route.params.id){
            this.getBlog()
        }
        this.startDate = new Date('1900')
        window.rightClick = this.addBlog
        window.leftClick = this.leftClick
    },
    methods:{
        ...mapActions([
            'getBlogDetail',
            'getBlogType',
            // 'postBlogger',//添加艺人
            // 'putBlogger',//编辑艺人
        ]),
        //返回
        leftClick:function(){
            
            config.deviceWay('back',2)
            
        },
        //获取博主详情
        getBlog () {
            const params = {}
            params.data = {
                include: 'creator,affixes,type'
            }
            params.id = this.$route.params.id
            this.getBlogDetail(params)
        },
        changeState (name, value) {
            this[name] = value
        },
        
        //沟通状态
        changeArtistStatus:function(data){
            this.popupArtistStatus = !this.popupArtistStatus
            if(data){
                this.artistStatus = data
            }
        },
        //签约意向
        changeIntention:function(data){
            this.popupIntention = !this.popupIntention
            if(data){
                this.intention = data
            }
            if(this.intention.value == 1){
                this.intentionTxt = ''
            }
        },
        //签约公司
        changeSign:function(data){
            this.popupSign = !this.popupSign
            if(data){
                this.sign = data
            }
            if(this.sign.value == 1){
                this.company = ''
            }
        },
        // 平台
        seletedData:function(data,isHidden){
           if(isHidden){
               this.popupPlatform = false
           }
           let platformName =[]
           this.selectedPlatform = data
        //    console.log(this.selectedPlatform)
           data.map(n => {
               platformName.push(n.label)
           })
           this.platformName = platformName.join(',')
           
        },
        // 孵化期开始时间
        changeStartTime:function (){
            if (!this.hatch_star_at) {
               this.hatch_star_at = moment(this.defaultDate).format('YYYY-MM-DD')
            }
           this.$refs.startPicker.open()            
        },
        // 孵化期结束时间
        changeEndTime:function (){
            if (!this.hatch_end_at) {
               this.hatch_end_at = moment(this.defaultDate).format('YYYY-MM-DD')
            }
           this.$refs.endPicker.open()            
        },
        startConfirm (date) {
            this.hatch_star_at = moment(date).format('YYYY-MM-DD')
        },
        endConfirm (date) {
            alert(111)
            this.hatch_end_at = moment(date).format('YYYY-MM-DD')
        },
        //博主类型
        changeBlogType:function(data){
           this.popupBlogType = !this.popupBlogType
           if(data){
               this.blogTypeSelect = data
           }
        },
        checkResource:function(){
           this.popupPlatform = !this.popupPlatform           
        },
        //上传头像
        upload:function(url){
            // console.log('上唇'+url)
           this.uploadUrl = url
        },
        //添加和编辑博主
        addBlog:function(){
            if(this.reSubmit){
                Toast('正在提交数据,请勿重复提交')
                return false
            }
            this.reSubmit = !this.reSubmit
            let plat =[]
            let platform= ''
            if(this.selectedPlatform){
                for (let i = 0; i < this.selectedPlatform.length; i++) {
                    plat.push(this.selectedPlatform[i].value)
                }
                platform = plat.join(',')
            }
            
            let id,toast
            id = this.$route.params.id
            if(id){
                toast = '编辑博主成功'
            }else{
                toast = '添加博主成功'
            }
            let params = {
                toast:toast,
                data:{},
                id:id
            }
            if(!this.username){
                Toast('请输入昵称')
                return false
            }
            if(!platform){
                Toast('请选择平台')
                return false
            }
            if(!this.blogTypeSelect.value){
                Toast('请选择博主类型')
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
            Indicator.open()
            params.data = {
                nickname: this.username,
                type_id: this.blogTypeSelect.value,
                communication_status: this.artistStatus.value,
                intention: this.intention.value, //签约意向
                intention_desc: this.intentionTxt, //不签约理由
                sign_contract_other: this.sign.value, //是否签约其他公司
                sign_contract_other_name: this.company, //签约其他公司名称
                platform: platform,//平台id
                star_douyin_infos: {url: this.douyinId,avatar: this.douyinFansNum},
                star_weibo_infos: {url: this.weiboUrl,avatar: this.weiboFansNum},
                star_xiaohongshu_infos: {url: this.xhsUrl,avatar: this.xhsFansNum},
                desc: this.remark,//  备注
                avatar: this.uploadUrl,
            }
            if(id&&this.hatch_star_at!=='***'&&this.hatch_end_at!=='***'){
                params.data.hatch_star_at = this.hatch_star_at
                params.data.hatch_end_at = this.hatch_end_at
            }
            id?this.putBlogger(params):this.postBlogger(params)
        },
         //添加博主
        postBlogger(params) {
            fetch('post', `/bloggers`, params.data).then(res => {
            Indicator.close()
            Toast(params.toast)
            this.reSubmit = false
            setTimeout(() => {
                config.deviceBack(2)
            }, 1000);
            
            }).catch((error) => {
                this.reSubmit = false
                Indicator.close()
            })
        },
        //编辑博主
        putBlogger(params) {
            fetch('put', `/bloggers/${params.id}`, params.data).then(res => {
            this.reSubmit = false
            Indicator.close()
            Toast(params.toast)
            setTimeout(() => {
                config.deviceBack(2)
            }, 1000);
            }).catch((error) => {
                this.reSubmit = false
                Indicator.close()
                // console.log(error)
            })
        },
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
<style lang="scss">
.attachment {
  margin-top: .2rem;
  padding: .2rem;
  background-color: #fff;
}
// .text-left{
//     input{
//         text-align:left!important;
//     }
// }
.avatar{
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    background-size:cover;
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
}
.angry input{
    height: 100%;
    text-align: left !important;
    display: flex
}
.angry .isAngry{
    display: inline-block;
    margin:0 10px;
    color:#666 ;
    
}
.veryAngry{
    flex: 1
}
</style>

