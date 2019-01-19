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
  },
  // 设置任务类型
  setTaskTypes (state, data) {
    state.taskTypes = data.map(n => {
      return { name: n.title, value: n.id }
    })
  },
  // 设置任务详情
  setTaskDetail (state, data) {
    state.taskDetail = data
  },
  //艺人详情
  setArtistDetail(state, data){
    state.artistDetail = data
  },

  //博主类型
  setBlogType(state, data) {
    state.blogType = data.map(n => {
      return {
        name: n.name,
        value: n.id
      }
    })
  },
  //博主详情
  setBlogDetail(state,data){
    state.blogDetail = data
  },

  //设置提示信息
  setToastTxt(state,data){
    state.toastTxt = data
  }
}
