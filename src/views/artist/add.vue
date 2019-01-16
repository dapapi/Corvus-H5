<template>
    <div>
        <Field label="姓名" v-model="username"></Field>
        <Cell title="性别" is-link @click.native="changeVisible"></Cell>
        <Popup position="bottom" v-model="popupVisible" popup-transition="popup-fade" style="width: 100%">
            <Cell title="男"><span class="mint-cell-mask"></span></Cell>
            <Cell title="女"><span class="mint-cell-mask"></span></Cell>
        </Popup>
        <Cell title="出生日期" is-link></Cell>
        <Cell title="艺人来源" is-link @click.native="changeArtistSource"></Cell>
        <Popup position="bottom" v-model="artistSource" popup-transition="popup-fade" style="width: 100%">
            <Cell v-for="(item,index) in artistSourceArr" :key="index" :title="item.name"><span class="mint-cell-mask" ></span></Cell>
        </Popup>
        <Field label="邮箱" v-model="email"></Field>
        <Field label="手机号" v-model="phone"></Field>
        <Field label="微信" v-model="wechat"></Field>
        <Field label="星探姓名" v-model="scout"></Field>
        <Field label="地区" v-model="region"></Field>
        <Cell title="平台" is-link to="/selector"><span class="mint-cell-mask"></span></Cell>
        <Cell title="沟通状态" is-link @click.native="changeArtistStatus"></Cell>
        <Popup position="bottom" v-model="artistStatus" popup-transition="popup-fade" style="width: 100%">
            <Cell v-for="(item,index) in artistStatusArr" :key="index" :title="item.name"><span class="mint-cell-mask" ></span></Cell>
        </Popup>
        
        <Cell title="与我司签约意向" is-link @click.native="changeIsInput"></Cell>
        <Popup position="bottom" v-model="isInput" popup-transition="popup-fade" style="width: 100%">
            <Cell v-for="(item,index) in yesOrNo" :key="index" :title="item.name"><span class="mint-cell-mask" ></span></Cell>
        </Popup>
        <Field label="" v-model="username" placeholder="请填写不签约理由"></Field>
        <Cell title="是否签约其他公司" is-link @click.native="changeIsInput"></Cell>
        <Popup position="bottom" v-model="isInput" popup-transition="popup-fade" style="width: 100%">
            <Cell v-for="(item,index) in yesOrNo" :key="index" :title="item.name"><span class="mint-cell-mask" ></span></Cell>
        </Popup>
        <Field label="公司名称" v-model="username" placeholder="请输入已签约公司名称"></Field>
        <Cell title="艺人头像">
            <template>
                <FileUpload />
            </template>
        </Cell>
        <Field label="备注" v-model="remark"></Field>
    </div>
</template>
<script>
import config from '@/utils/config.js'
export default {
    data(){
        return {
            username:'',//姓名
            gender:false,
            email:'',//邮箱
            phone:'',//手机
            wechat:'',//微信
            scout:'',//星探
            region:'',//地区
            genderArr:config.genderArr,
            popupVisible:false,
            artistSourceArr:config.artistSourceArr,
            artistSource:false,
            artistStatusArr:config.artistStatusArr,
            artistStatus:false,
            yesOrNo:config.yesOrNo,
            isInput:false,
            remark:'',//备注
        }
    },
    methods:{
        changeGender:function(){
           this.gender = true
        },
        changeVisible:function(){
            this.popupVisible = !this.popupVisible
        },
        changeArtistSource:function(){
            // alert(111)
            this.artistSource = !this.artistSource
        },
        changeArtistStatus:function(){
            this.artistStatus = !this.artistStatus
        },
        changeIsInput:function(){
            this.isInput = !this.isInput
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
</style>
