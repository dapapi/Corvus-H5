<template>
  <div class="selector-wrap">
    <mt-checklist
      v-if="multiple"
      v-model="checkedArr"
      :options="selectorData"
      align="right"
    >
    </mt-checklist>
    <mt-radio
      v-else
      v-model="checkedData"
      :options="selectorData"
      align="right"
    >
    </mt-radio>
  </div>
</template>

<script>
export default {
  props: ['selectorData', 'multiple'],
  data () {
    return {
      checkedArr: [],
      checkedData: ''
    }
  },

  watch: {
    checkedArr () {
      this.$emit('change', this.checkedArr)
    },
    checkedData () {
      const obj = this.selectorData.find(n => n.value === this.checkedData)
      this.$emit('change', obj)
    }
  }
}
</script>

<style lang="scss" scoped>
.selector-wrap /deep/ {
  .mint-checklist-title, .mint-radiolist-title {
    margin: 0;
  }
 .mint-checkbox-core, .mint-radio-core {
    border: none;
  }
  .mint-checkbox-input:checked + .mint-checkbox-core, .mint-radio-input:checked + .mint-radio-core {
    background-color: #fff;
    border-color: #fff;
  }
 .mint-checkbox-input:checked + .mint-checkbox-core::after, .mint-radio-input:checked + .mint-radio-core::after {
    border-color: #3F51B5;
    background-color: #fff;
  }
  .mint-checkbox-core::after {
    width: 6px;
    height: 11px;
    top: 1px;
 }
  .mint-radio-core::after {
    border: 2px solid transparent;
    border-left: 0;
    border-top: 0;
    border-radius: 0;
    transform: rotate(45deg) scale(1);
    top: 1px;
    left: 6px;
    width: 6px;
    height:11px;
  }
  .mint-radiolist-label {
    padding: 0;
  }
}

</style>
