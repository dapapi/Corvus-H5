<template>
  <Popup class="isScroll" position="bottom" v-model="show" popup-transition="popup-fade">
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
      if(this.visible) {
            tool.ModalHelper.afterOpen()
        } else {
            tool.ModalHelper.beforeClose()
        }

    }
  },
  methods: {
    handleClick (item) {
      this.$emit('change', item)
    }
  }
}
</script>

<style lang="scss" scoped>
   .isScroll{
     overflow:scroll;
     width:100%;
     max-height:100vh
   }
</style>
