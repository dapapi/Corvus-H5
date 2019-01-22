<template>
    <div>
        <div v-show="!popupPlatform">
            <Field label="昵称" v-model="username"></Field>
            
            <!--平台-->
            <Cell title="平台" is-link @click.native="checkResource()" :value="platformName"></Cell>
            
            <Field class="text-left" placeholder="微博主页地址" v-if="selectedPlatform.find(item => item ==1)" v-model="weiboUrl"></Field>
            <Field class="text-left" placeholder="微博粉丝数" v-if="selectedPlatform.find(item => item ==1)" v-model="weiboFansNum"></Field>
            <Field class="text-left" placeholder="抖音ID" v-if="selectedPlatform.find(item => item ==2)" v-model="douyinId"></Field>
            <Field class="text-left" placeholder="抖音粉丝数" v-if="selectedPlatform.find(item => item ==2)" v-model="douyinFansNum"></Field>
            <Field class="text-left" placeholder="小红书链接" v-if="selectedPlatform.find(item => item ==3)" v-model="xhsUrl"></Field>
            <Field class="text-left" placeholder="小红书粉丝数" v-if="selectedPlatform.find(item => item ==3)" v-model="xhsFansNum"></Field>
            
            <!--类型-->
            <Cell title="类型" is-link  @click.native="changeState('popupBlogType',!popupBlogType)" :value="blogTypeSelect.name"></Cell>
            <Selector :visible="popupBlogType" :data="blogType" @change="changeBlogType" />
            <!--沟通状态-->
            <Cell title="沟通状态" is-link  @click.native="changeState('popupArtistStatus',!popupArtistStatus)" :value="artistStatus.name"></Cell>
            <Selector :visible="popupArtistStatus" :data="artistStatusArr" @change="changeArtistStatus" />
            <!--与我司签约意向-->
            <Cell title="与我司签约意向" is-link @click.native="changeState('popupIntention',!popupIntention)" :value="intention.name"></Cell>
            <Selector :visible="popupIntention" :data="yesOrNo" @change="changeIntention" />
            <Field class="text-left" v-show="intention.value == '0'" v-model="intentionTxt" placeholder="请填写不签约理由"></Field>
            <!--是否签约其他公司-->
            <Cell title="是否签约其他公司" is-link  @click.native="changeState('popupSign',!popupSign)" :value="sign.name"></Cell>
            <Selector :visible="popupSign" :data="yesOrNo" @change="changeSign" />
            <Field class="text-left" v-show="sign.value == 1" v-model="company" placeholder="请输入已签约公司名称"></Field>

            <Cell title="头像">
                
                <template>
                    <FileUpload @change="upload">
                        <span class="avatar" v-if="uploadUrl" :style="{ backgroundImage: 'url('+uploadUrl+')'}"></span>
                        <i v-else class="iconfont icon-tianjiatupian" style="font-size:0.8rem;border-radius:50%"></i>
                    </FileUpload>
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
            this.artistStatus = this.artistStatusArr.find(item => item.value == this.blogDetail.communication_status)
            this.intention = this.yesOrNo.find(item => item.value == this.blogDetail.intention)
            this.sign = this.yesOrNo.find(item => item.value == this.blogDetail.sign_contract_other)
            this.remark = this.blogDetail.desc
            
            this.weiboUrl =this.blogDetail.weibo_url
            this.weiboFansNum=this.blogDetail.weibo_fans_num
            this.douyinId=this.blogDetail.douyin_id
            this.douyinFansNum=this.blogDetail.douyin_fans_num
            this.xhsUrl=this.blogDetail.baike_url
            this.xhsFansNum=this.blogDetail.baike_fans_num
            
            
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
            console.log(this.selectedPlatform)
            this.platformName = aPlatformName.join(',')
       }
    },
    created(){
        this.startDate = new Date('1900')
        this.getBlogType()
        if(this.$route.params.id){
            this.getBlog()
        }
        window.addArtist = this.addArtist
    },
    methods:{
        ...mapActions([
            'getBlogDetail',
            'getBlogType'
        ]),
        //获取博主详情
        getBlog () {
            const params = {}
            params.data = {
                include: 'creator,affixes'
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
        // 平台
        seletedData:function(data,isHidden){
           if(isHidden){
               this.popupPlatform = false
           }
           let platformName =[]
           this.selectedPlatform = data
       
           data.map(n => {
               platformName.push(n.label)
           })
           this.platformName = platformName.join(',')
           
        },
        //博主类型
        changeBlogType:function(data){
           this.popupBlogType = !this.popupBlogType
           this.blogTypeSelect = data
        },
        checkResource:function(){
           this.popupPlatform = !this.popupPlatform           
        },
        //上传头像
        upload:function(url){
            console.log('上唇'+url)
           this.uploadUrl = url
        },
        //添加和编辑博主
        addBlog:function(){
            let params = {
                
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
.text-left{
    input{
        text-align:left!important;
    }
}
.avatar{
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    background-size:cover;
}
</style>

