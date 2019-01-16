<template>
  <div>
    <template v-if="!checkListVisible">
      <Cell title="关联资源" is-link @click.native="changeVisible" :value="linkResourceName ? linkResourceName : noneResource "></Cell>
      <Popup position="bottom" v-model="popupVisible" popup-transition="popup-fade" style="width: 100%">
        <Cell title="暂不关联资源" @click.native="checkResource('')"><span class="mint-cell-mask"></span></Cell>
        <Cell v-for="(item, index) in resourceList" :title="item.title" @click.native="checkResource(item)" :key="index">
          <span class="mint-cell-mask"></span>
        </Cell>
      </Popup>
      <Cell title="任务类型" is-link></Cell>
      <Field label="任务名称" />
      <Cell title="负责人" is-link></Cell>
      <Cell title="参与人" is-link></Cell>
      <Cell title="任务优先级" is-link></Cell>
      <Cell title="开始时间" is-link></Cell>
      <Cell title="截止时间" is-link></Cell>
      <Field type="textarea" rows="1" label="任务说明" />
      <div class="attachment">
        <FileUpload />
      </div>
    </template>
    <div v-else class="resource">
      <CheckList
        :selectorData="resourceData"
        :multiple="false"
        @change="seletedData"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'AddTask',
  data () {
    return {
      popupVisible: false,
      checkListVisible: false,
      resourceName: '',
      resourceId: '',
      resourceableName: '',
      resourceableId: '',
      noneResource: ''
    }
  },
  computed: {
    ...mapState([
      'resourceData',
      'resourceList'
    ]),
    linkResourceName () {
      let _name = ''
      if (this.resourceName && this.resourceableName) {
        _name = this.resourceName + '-' + this.resourceableName
      }
      return _name
    }
  },
  mounted () {
    this.getResourceList()
  },
  methods: {
    ...mapMutations([
      'setSelectorCheckedData'
    ]),
    // 返回选中数据
    seletedData (data) {
      this.resourceableName = data.label
      this.resourceableId = data.value
      this.checkListVisible = false
    },
    ...mapActions([
      'getResourceList',
      'getRelatedResources'
    ]),
    changeVisible () {
      this.popupVisible = !this.popupVisible
    },
    // 选中关联资源
    checkResource (data) {
      this.popupVisible = false
      if (!data) {
        this.resourceName = ''
        this.noneResource = '暂不关联资源'
        this.resourceId = ''
        this.resourceableName = ''
        this.resourceableId = ''
        return
      }
      this.noneResource = ''
      this.checkListVisible = true
      this.resourceName = data.title
      this.resourceId = data.id

      const code = data.code
      let params = {
        url: code,
        data: {}
      }
      if (code === 'bloggers' || code === 'stars') {
        params.data.sign_contract_status = 2
      }
      this.getRelatedResources(params)
    }
  }
}
</script>

<style lang="scss" scoped>
.attachment {
  margin-top: .2rem;
  padding: .2rem;
  background-color: #fff;
}
.resource {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
