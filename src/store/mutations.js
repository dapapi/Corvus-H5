export default {
  // 设置关联资源数据
  setResourceList (state, data) {
    state.resourceList = data
  },
  // 设置选中关联资源数据
  setResourceData (state, data) {
    state.resourceData = data.map(n => {
      return {
        label: n.nickname || n.name || n.title || n.company,
        value: n.id + ''
      }
    })
  }
}
