<template>
  <div>
    <Field label="公司名称" v-model="companyName" />
    <Cell title="级别" @click.native="changeState('levelVisible', !levelVisible)" :value="clientLevel" isLink></Cell>
    <Selector :visible="levelVisible" :data="clientLevelArr" @change="checkLevel" />
    <Cell title="地区" @click.native="changeState('regionVisible', !regionVisible)" :value="region" isLink></Cell>
    <Regional :visible="regionVisible" @change="checkRegional" />
    <Field label="详细地址" v-model="detailAddress" />
    <Cell title="负责人" :value="principalName" isLink></Cell>
    <Field label="联系人" v-model="contactName" />
    <Cell title="关键决策人" @click.native="changeState('keyVisible', !keyVisible)" :value="isKey" isLink></Cell>
    <Selector :visible="keyVisible" :data="yesOrNoArr" @change="checkKey" />
    <Field label="联系人电话" v-model="contactPhone" />
    <Field label="职位" v-model="position" />
    <Cell title="规模" @click.native="changeState('scaleVisible', !scaleVisible)" :value="scale" isLink></Cell>
    <Selector :visible="scaleVisible" :data="clientScaleArr" @change="checkScale" />
    <Field label="备注" v-model="desc" />
  </div>
</template>

<script>
import config from '@/utils/config'
import fetch from '@/utils/fetch'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      levelVisible: false,
      keyVisible: false,
      scaleVisible: false,
      regionVisible: false,
      clientLevelArr: config.clientLevelArr,
      yesOrNoArr: config.yesOrNo,
      clientScaleArr: config.clientScaleArr,
      companyName: '',
      clientLevel: '',
      detailAddress: '',
      contactName: '',
      contactPhone: '',
      isKey: '', // 是否是关键人
      position: '',
      desc: '',
      province: '',
      city: '',
      area: '',
      region: '', // 地区
      scale: '', // 规模
      principalName: '', // 负责人
      clientId: this.$route.params.id,
      type: this.$route.query.type,
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
      window.rightClick = this.addClient
    }
  },

  watch: {
    clientDetail () {
      console.log(this.clientDetail)
      const clientDetail = this.clientDetail
      this.companyName = clientDetail.company
      this.clientLevel = this.clientLevelArr.find(n => n.value === clientDetail.grade).name
      if (clientDetail.province) {
        this.region = clientDetail.province + '-' + clientDetail.city + '-' + clientDetail.district
      }
      this.detailAddress = clientDetail.address
      // this.contactName = clientDetail.
      // this.contactPhone = 
      this.scale = this.clientScaleArr.find(n => n.value === clientDetail.size).name
      this.desc = clientDetail.desc
      this.type = clientDetail.type
      this.principalName = clientDetail.principal && clientDetail.principal.data.name
    },
    clientContact () {
      console.log(this.clientContact)
      if (this.clientContact.length > 0) {
        this.contactName = this.clientContact[0].name
        this.contactPhone = this.clientContact[0].phone
        this.isKey = this.yesOrNoArr.find(n => n.value === this.clientContact[0].type).name
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
      this.clientLevel = data.name
    },
    // 选择决策关键人
    checkKey (data) {
      this.keyVisible = !this.keyVisible
      this.isKey = data.name
    },
    // 选择规模
    checkScale (data) {
      this.scaleVisible = !this.scaleVisible
      this.scale = data.name
    },
    // 新增客户
    addClient () {
      let data = {
        type: this.type, // 需要移动端传入，新增客户的类型
        company: this.companyName,
        grade: this.clientLevel,
        province: this.province,
        city: this.city,
        district: this.area,
        principalId: '',
        address: this.detailAddress,
        contact: {
            name: this.contactName,
            phone: this.contactPhone,
            position: this.position,
            type: this.isKey,
        },
        // keyman: this.clientDecision,
        size: this.scale,
        desc: this.desc
      }
      fetch('post', '/clients', data).then(res => {
        console.log(res)
        // 回调
      })
    },
    // 编辑客户
    editClient () {
      let data = {
        type: this.type, // 需要移动端传入，新增客户的类型
        company: this.companyName,
        grade: this.clientLevel,
        province: this.province,
        city: this.city,
        district: this.area,
        principalId: '',
        address: this.detailAddress,
        contact: {
            name: this.contactName,
            phone: this.contactPhone,
            position: this.position,
            type: this.isKey,
        },
        // keyman: this.clientDecision,
        size: this.scale,
        desc: this.desc
      }
      fetch('put', '/clients/' + this.clientId, data).then(res => {
        // 回调
      })
    },
    // 选择地区
    checkRegional (data) {
      this.regionVisible = !this.regionVisible
      if (data) {
        this.region = data.join('-')
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
