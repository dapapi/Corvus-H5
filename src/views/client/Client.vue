<template>
  <div>
    <Field label="公司名称" v-model="companyName" />
    <Cell title="级别" @click.native="changeState('levelVisible', !levelVisible)" :value="clientLevel" isLink></Cell>
    <Selector :visible="levelVisible" :data="clientLevelArr" @change="checkLevel" />
    <Cell title="地区" @click.native="changeState('regionVisible', !regionVisible)" :value="region" isLink></Cell>
    <Regional :visible="regionVisible" @change="checkRegional" />
    <Field label="详细地址" v-model="detailAddress" />
    <Cell title="负责人" isLink></Cell>
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
      scale: '' // 规模
    }
  },

  methods: {
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
        type: '', // 需要移动端传入，新增客户的类型
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
      })
    },
    // 选择地区
    checkRegional (data) {
      this.regionVisible = !this.regionVisible
      if (data) {
        this.region = data.join('-')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
