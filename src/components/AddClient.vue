<template>
  <div>
    <Field label="公司名称" v-model="name" />
    <Cell title="级别" :value="gradeName" @click.native="changeState('popupVisible', !popupVisible)" is-link></Cell>
    <Popup position="bottom" v-model="popupVisible" popup-transition="popup-fade" style="width: 100%">
      <Cell v-for="(item, index) in clientLevelArr" :title="item.name" @click.native="checkClientLevel(item)" :key="index">
        <span class="mint-cell-mask"></span>
      </Cell>
    </Popup>
  </div>  
</template>

<script>
import config from '@/utils/config'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      clientLevelArr: config.clientLevelArr,
      name: '',
      grade: '',
      gradeName: '',
      popupVisible: false
    }
  },
  methods: {
    ...mapMutations([
      'setNewClient'
    ]),
    checkClientLevel (item) {
      this.popupVisible = !this.popupVisible
      this.gradeName = item.name
      this.grade = item.value
    },
    changeState (name, value) {
      this[name] = value
    },
    submit () {
      const data = {
        companyName: this.name,
        grade: this.grade,
        gradeName: this.gradeName
      }
      if (!this.name) {
        toast('公司名称不能为空！')
        return
      }
      if (!this.grade) {
        toast('级别不能为空！')
        return
      }
      // this.setNewClient(data)
      this.$emit('change', data)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
