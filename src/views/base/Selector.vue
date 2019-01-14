<template>
  <div>
    <CheckList
      :selectorData="resourceData"
      :multiple="selectorInfo.multiple"
      @change="seletedData"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'selectorInfo'
    ])
  },
  methods: {
    ...mapMutations([
      'setSelectorCheckedData'
    ]),
    // 返回选中数据
    seletedData (data) {
      this.setSelectorCheckedData(data)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
