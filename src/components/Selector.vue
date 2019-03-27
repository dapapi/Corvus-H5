<template>
  <Popup position="bottom" v-model="show" popup-transition="popup-fade">
    <!-- <div class="con"> -->
       <Cell v-for="(item, index) in data" :title="item.name" :key="index" @click.native="handleClick(item)">
          <span class="mint-cell-mask"></span>
      </Cell>
    <!-- </div> -->
  </Popup>
</template>

<script>
import tool from '@/utils/tool.js'
export default {
  name: 'Selector',
  props: ['visible', 'data'],
  data () {
    return {
      show: true,
    }
  },
  mounted () {
    if (this.visible === false) {
      this.show = false
    }
  },
  watch: {
    visible () {
      this.show = this.visible
    },
    show () {
      if (this.show) {
        tool.ModalHelper.afterOpen()
      } else {
        tool.ModalHelper.beforeClose()
      }
      if (this.show !== this.visible) {
        this.handleClick()
      }
    }
  },
  methods: {
    handleClick (item) {
      this.$emit('change', item)
    },
  }
}
</script>

<style lang="scss" scoped>
  
   

</style>
