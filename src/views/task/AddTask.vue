<template>
  <div>
    <Cell title="关联资源" is-link @click.native="changeVisible"></Cell>
    <Popup position="bottom" v-model="popupVisible" popup-transition="popup-fade" style="width: 100%">
      <Cell title="暂不关联资源" to="/selector"><span class="mint-cell-mask"></span></Cell>
      <Cell title="博主"><span class="mint-cell-mask"></span></Cell>
      <Cell title="艺人"><span class="mint-cell-mask"></span></Cell>
      <Cell title="项目"><span class="mint-cell-mask"></span></Cell>
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
  </div>
</template>

<script>
export default {
  name: 'AddTask',
  data () {
    return {
      popupVisible: false
    }
  },
  methods: {
    changeVisible () {
      this.popupVisible = !this.popupVisible
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
</style>
