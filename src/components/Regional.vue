<template>
  <div class="picker mint-datetime-picker">
    <Popup position="bottom" v-model="visiblePop" popup-transition="popup-fade" style="width: 100%">
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="close">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="check">确定</span>
      </div>
      <mt-picker ref="picker" valueKey="name" :slots="slots" @change="changeProvince"></mt-picker>
    </Popup>
  </div>
</template>

<script>
import provinceData from '@/assets/regional/province.json'
import cityData from '@/assets/regional/city.json'
import areaData from '@/assets/regional/area.json'

export default {
  name: 'Regional',
  props: ['visible'],
  data () {
    return {
      provinceId: '', // 省id
      cityId: '', // 市id
      areaId: '', // 区id
      regionalArr: [],
      visiblePop: this.visible,
      slots: [
        {
          flex: 1,
          valueKey: 'name',
          values: [], // 省
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: [], // 市
          className: 'slot3',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '-',
          className: 'slot4'
        },
        {
          flex: 1,
          values: [],
          className: 'slot5',
          textAlign: 'center'
        },
      ]
    }
  },
  mounted () {
    // this.$refs.picker.setSlotValues(0, provinceData)
    this.slots[0].values = provinceData
  },
  watch: {
    provinceId () {
      this.$refs.picker.setSlotValues(1, cityData[this.provinceId] ? cityData[this.provinceId] : [])
    },
    cityId () {
      if (this.cityId) {
        if (areaData[this.cityId][0].name === '市辖区') {
          areaData[this.cityId].shift()
        }
        this.$refs.picker.setSlotValues(2, areaData[this.cityId])
      } else {
        this.$refs.picker.setSlotValues(2, [])
      }
    },
    visible () {
      this.visiblePop = this.visible
    }
  },
  methods: {
    changeProvince (picker, values) {
      this.provinceId = values[0] ? values[0].id : ''
      this.cityId = values[1] ? values[1].id : ''
      this.regionalArr = values
    },
    close () {
      this.$emit('change')
    },
    check () {
      const arr = this.regionalArr.filter(n => n)
      this.$emit('change', arr.map(n => n ? n.name : ''))
    }
  }
}
</script>

<style lang="scss" scoped>
.picker-toolbar {
  border-bottom: 1px solid #eaeaea;
}
</style>
