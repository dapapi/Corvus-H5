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
    <div style="text-align:center;margin-top:10px">
      <Button size="small" type="default" @click="changeShow()">保存</Button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['selectorData', 'multiple'],
  data () {
    return {
      checkedArr: [],
      checkedData: '',
      isHidden:false
    }
  },

  watch: {
    // checkedArr () {
    //   this.$emit('change', this.checkedArr)
    // },
    checkedData () {
      const obj = this.selectorData.find(n => n.value === this.checkedData)
      this.$emit('change', obj)
    }
  },
  methods:{
    changeShow(){
      this.isHidden = true
      const data = this.selectorData.filter(n =>
        this.checkedArr.indexOf(n.value) > -1
      )
      this.$emit('change', data, this.isHidden)
    }
  }
}
</script>

<style lang="scss" scoped>
.selector-wrap /deep/ {
  position: absolute;
  left:0px;
  top:0px;
  right:0px;
  bottom:0px;
  width: 100%;
  height: 100%;
  background-color:#fff;
  z-index:1000;
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
