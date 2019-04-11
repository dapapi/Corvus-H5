<template>
  <div>
    <Field class="require" label="公司名称" v-model="companyName" />
    <Cell class="require" title="级别" @click.native="changeState('levelVisible', !levelVisible)" :value="clientLevelName" isLink></Cell>
    <Selector :visible="levelVisible" :data="clientLevelArr" @change="checkLevel" />
    <Cell title="地区" @click.native="changeState('regionVisible', !regionVisible)" :value="region" isLink></Cell>
    <Regional :visible="regionVisible" @change="checkRegional" />
    <Field label="详细地址" v-model="detailAddress" />
    <Cell title="负责人" class="require" @click.native="checkKeyMan" isLink>
        <img class="avatar" v-for="(item, index) in principalIconArr" :src="item.icon_url" :key="index">
      </Cell>
    <Field label="联系人" class="require" v-model="contactName"  @blur.native="return false" />
    <Cell title="关键决策人" class="require" @click.native="changeState('keyVisible', !keyVisible)" :value="isKeyName" isLink></Cell>
    <Selector :visible="keyVisible" :data="yesOrNoArr" @change="checkKey" />
    <Field label="联系人电话" class="require" v-model="contactPhone" />
    <Field label="微信" v-model="wechat"></Field>
    <Field label="其他联系方式" v-model="otherContactWays"></Field>
    <Field label="职位" class="require" v-model="position" />
    <Cell title="规模" @click.native="changeState('scaleVisible', !scaleVisible)" :value="scaleName" isLink></Cell>
    <Selector :visible="scaleVisible" :data="clientScaleArr" @change="checkScale" />
    <Cell class="require" title="客户评级" @click.native="changeState('ratingVisible', !ratingVisible)" :value="ratingName" isLink></Cell>
    <Selector :visible="ratingVisible" :data="ratingArr" @change="checkRating" />
    <Field label="备注" v-model="desc" />
    <!-- <Button @click.native="addClient">新增</Button> -->
  </div>
</template>

<script>
import config from '@/utils/config'
import fetch from '@/utils/fetch'
import { mapState, mapActions } from 'vuex'
import tool from '@/utils/tool'
import verify from '@/utils/verify'

export default {
  data () {
    return {
      levelVisible: false,
      keyVisible: false,
      scaleVisible: false,
      regionVisible: false,
      clientLevelArr: config.clientLevelArr,
      ratingArr: config.taskLevelArr,
      yesOrNoArr: config.isKey,
      clientScaleArr: config.clientScaleArr,
      ratingVisible: false,
      companyName: '',
      clientLevel: '', // 级别
      clientLevelName: '', // 级别
      detailAddress: '',
      contactName: '',
      contactPhone: '',
      wechat: '',
      otherContactWays: '',
      isKey: '', // 是否是关键人
      isKeyName: '', // 是否是关键人
      position: '',
      desc: '',
      province: '',
      city: '',
      area: '',
      region: '', // 地区
      scale: '', // 规模
      scaleName: '', // 规模
      principalId: '', // 负责人
      principalIconArr: [],
      ratingName: '', // 客户评级
      rating: '', // 客户评级
      clientId: this.$route.params.id,
      type: this.$route.query.type,
      leftClick: null , // 左侧按钮触发的事件
      isLoading: false
    }
  },

  computed: {
    ...mapState([
      'clientDetail',
      'clientContact'
    ])
  },
  mounted () {
    if (this.$route.name === 'client/edit') {
      this.getClientInfo()
      this.getClientContactInfo()
      window.rightClick = this.editClient
    } else {
      this.getUserInfo()
      window.rightClick = this.addClient
    }
    this.leftClick = this.leftClickTemp
    window.leftClick = this.leftClick
  },

  watch: {
    clientDetail () {
      const clientDetail = this.clientDetail
      this.companyName = clientDetail.company
      this.clientLevel = this.clientDetail.grade
      this.clientLevelName = this.clientLevelArr.find(n => n.value === clientDetail.grade).name
      this.province = clientDetail.province
      this.city = clientDetail.city
      this.area = clientDetail.district
      if (clientDetail.province) {
        this.region = clientDetail.province + '-' + clientDetail.city + '-' + clientDetail.district
      }
      this.principalId = clientDetail.principal.data.id
      this.principalIconArr.push({
        id: clientDetail.principal.data.id,
        name: clientDetail.principal.data.name,
        icon_url: clientDetail.principal.data.icon_url
      })
      this.detailAddress = clientDetail.address
      this.scaleName = this.clientScaleArr.find(n => n.value === clientDetail.size).name
      this.scale = this.clientScaleArr.find(n => n.value === clientDetail.size).value
      this.desc = clientDetail.desc
      this.type = clientDetail.type
      this.rating = clientDetail.client_rating
      this.ratingName = this.ratingArr.find(n => n.value == clientDetail.client_rating).name
    },
    clientContact () {
      if (this.clientContact.length > 0) {
        this.contactName = this.clientContact[0].name
        this.contactPhone = this.clientContact[0].phone
        this.wechat = this.clientContact[0].wechat
        this.otherContactWays = this.clientContact[0].other_contact_ways
        this.position = this.clientContact[0].position
        this.isKeyName = this.yesOrNoArr.find(n => n.value === this.clientContact[0].type).name
        this.isKey = this.yesOrNoArr.find(n => n.value === this.clientContact[0].type).value
      }
    },
    isLoading () {
      if (this.isLoading) {
        Indicator.open()
      } else {
        Indicator.close()
      }
    }
  },

  methods: {
    ...mapActions([
      'getClientDetail',
      'getClientContact'
    ]),
    changeState (name, value) {
      this[name] = value
    },
    // 选择级别
    checkLevel (data) {
      this.levelVisible = !this.levelVisible
      this.clientLevel = data.value
      this.clientLevelName = data.name
    },
    // 选择决策关键人
    checkKey (data) {
      console.log(data)
      this.keyVisible = !this.keyVisible
      this.isKey = data.value
      this.isKeyName = data.name
    },
    // 选择规模
    checkScale (data) {
      this.scaleVisible = !this.scaleVisible
      this.scaleName = data.name
      this.scale = data.value
    },
    // 新增客户
    addClient () {
      if (this.isLoading) {
        return
      }

      if (!this.checkField()) {
        return
      }
      
      let data = {
        type: this.type, // 需要移动端传入，新增客户的类型
        company: this.companyName,
        grade: this.clientLevel,
        province: this.province,
        city: this.city,
        district: this.area,
        principal_id: this.principalId,
        address: this.detailAddress,
        contact: {
            name: this.contactName,
            phone: this.contactPhone,
            position: this.position,
            type: this.isKey,
            other_contact_ways: this.otherContactWays,
            wechat: this.wechat
        },
        size: this.scale,
        desc: this.desc,
        client_rating: this.rating
      }
      this.isLoading = true
      fetch('post', '/clients', data).then(res => {
        this.isLoading = false
        toast('添加成功!')
        setTimeout(() => {
          this.leftClick()
        }, 900)
      }).catch( res => {
          this.isLoading = false
        })
    },
    // 编辑客户
    editClient () {
      if (this.isLoading) {
        return
      }

      if (!this.checkField()) {
        return
      }
      let data = {
        type: this.type, // 需要移动端传入，新增客户的类型
        company: this.companyName,
        grade: this.clientLevel,
        province: this.province,
        city: this.city,
        district: this.area,
        principal_id: this.principalId,
        address: this.detailAddress,
        contact: {
            name: this.contactName,
            phone: this.contactPhone,
            position: this.position,
            type: this.isKey,
            other_contact_ways: this.otherContactWays,
            wechat: this.wechat
        },
        size: this.scale,
        desc: this.desc,
        client_rating: this.rating
      }
      this.isLoading = true
      fetch('put', '/clients/' + this.clientId, data).then(res => {
        // 回调
        this.isLoading = false
        toast('修改成功!')
        setTimeout(() => {
          this.leftClick()
        }, 900)
      }).catch( res => {
          this.isLoading = false
        })
    },
    // 选择地区
    checkRegional (data) {
      this.regionVisible = !this.regionVisible
      if (data) {
        this.region = data.join('-')
        this.province = data[0]
        this.city = data[1]
        this.area = data[2]
      }
    },
    // 获取客户信息
    getClientInfo () {
      const params = {
        id: this.clientId
      }
      this.getClientDetail(params)
    },
    // 获取联系人
    getClientContactInfo () {
      const params = {
        id: this.clientId
      }
      this.getClientContact(params)
    },
    leftClickTemp () {
      tool.nativeEvent('back', 2)
    },
      // 选择负责人
    checkKeyMan () {
      window.setMemberData = this.setPrincipalData
      const params = {
        type: 1,
        data: this.principalIconArr
      }
      tool.nativeEvent('selectOrganizational', JSON.stringify(params))
    },
    // 设置负责人数据
    setPrincipalData (data) {
      this.principalIconArr = JSON.parse(data)
      this.principalId = this.principalIconArr[0].id || ''
    },
    // 客户评级
    checkRating (data) {
      this.ratingVisible = !this.ratingVisible
      this.rating = data.value
      this.ratingName = data.name
    },
    // 必填字段校验
    checkField () {
      if (!this.companyName) {
        toast('公司名称不能为空！')
        return
      }
      if (!this.clientLevel) {
        toast('级别不能为空！')
        return
      }
      if (!this.principalId) {
        toast('负责人不能为空！')
        return
      }
      if (!this.contactName) {
        toast('联系人不能为空！')
        return
      }
      if (this.contactPhone && !verify.phone(this.contactPhone)) {
        toast('联系人电话号码格式错误！')
        return
      }
      if (!this.isKey) {
        toast('关键决策人不能为空！')
        return
      }
      if (!this.position) {
        toast('职位不能为空！')
        return
      }
      if (!this.rating) {
        toast('客户评级不能为空！')
        return
      }
      return true
    },
    // 获取用户信息
    getUserInfo () {
      fetch('get', `/users/my`).then(res => {
        const data = res.data
        this.principalIconArr.push({
          id: data.id,
          name: data.name,
          icon_url: data.icon_url
        })
        this.principalId = this.principalIconArr[0].id || ''
      })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
