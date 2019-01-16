<template>
  <Popup position="bottom" v-model="show" popup-transition="popup-fade" style="width: 100%">
    <Cell v-for="(item, index) in data" :title="item.name" :key="index" @click.native="handleClick(item)">
      <span class="mint-cell-mask"></span>
    </Cell>
  </Popup>
</template>

<script>
export default {
  name: 'Selector',
  props: ['visible', 'data'],
  data () {
    return {
      show: true
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

</style>
