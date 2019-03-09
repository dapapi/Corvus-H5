<template>
  <div class="selector-wrap">
    <Search 
      v-model="serchValue"
      v-if="needSearch"
      cancel-text=""
    >
    </Search>
    <mt-checklist
      v-if="multiple"
      v-model="checkedArr"
      :options="selectorDataCopy"
      align="right"
    >
    </mt-checklist>
    <mt-radio
      v-else
      v-model="checkedData"
      :options="selectorDataCopy"
      align="right"
    >
    </mt-radio>
    <!-- <div v-if="multiple" style="text-align:center;margin-top:10px">
      <Button size="small" type="default" @click="changeShow()">保存</Button>
    </div> -->
  </div>
</template>

<script>
import tool from '@/utils/tool'

export default {
  props: ['selectorData', 'multiple','selectedData', 'needSearch', 'originTitle', 'newTitle', 'leftClick', 'rightClick'],
  data () {
    return {
      checkedArr: [],
      checkedData: '',
      isHidden:false,
      serchValue: '',
      selectorDataCopy: [...this.selectorData]
    }
  },
  watch: {
    checkedData () {
      const obj = this.selectorData.find(n => n.value === this.checkedData)
      this.$emit('change', obj)
    },
    selectorData () {
      this.selectorDataCopy = [...this.selectorData]
    },
    selectedData(){
      //去重
      if(this.multiple){
          let arrCheck = []
          for (let i = 0; i < this.checkedArr.length; i++) {
            for (let t = 0; t < this.selectedData.length; t++) {
               if(this.checkedArr[t]!=this.selectedData[i].value){
                 arrCheck.push(this.selectedData[i].value)
               }
            }
          }
          this.checkedArr.concat(arrCheck)
        }else{
          this.checkedData = this.selectedData.value
        }
    },
    serchValue () {
      const key = this.serchValue.trim().toLowerCase()
      this.selectorDataCopy = this.selectorData.filter(n => n.label.substr(0, key.length).toLowerCase() === key)
    }
  },
  mounted () {
    if (this.rightClick) {
      window.rightClick = this.changeShow
    }
    window.leftClick = this.changeHidden
    tool.nativeEvent('setTitle', this.newTitle)
  },
  beforeDestroy () {
    if (this.rightClick) {
      window.rightClick = this.rightClick
    }
    if (this.leftClick) {
      window.leftClick = this.leftClick
    }
    if (this.rightClick) {
      tool.nativeEvent('setTitle', this.originTitle)
    }
  },
  methods:{
    changeShow(){
      this.isHidden = true
      const data = this.selectorData.filter(n =>
        this.checkedArr.indexOf(n.value) > -1
      )
      this.$emit('change', data, this.isHidden)
    },
    changeHidden(){
      this.isHidden = true
      this.$emit('change', [], this.isHidden)
    },
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
  .mint-search {
    height: 1rem;
  }
  .mint-searchbar {
    background-color: #fff;
  }
  .mint-searchbar-inner {
    border-radius: 1rem;
  }
  .mint-searchbar-inner, .mint-searchbar-core {
    background-color: #f6f6f6;
  }
  .mint-searchbar-cancel {
    margin: 0;
  }
}

</style>
