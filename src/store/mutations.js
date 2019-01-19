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
  // 设置所有客户
  setClientsAll (state, data) {
    state.clientsAll = data
  },
  // 设置新客户
  setNewClient (state, data) {
    state.client.company = data.company
    state.client.grade = data.grade
    state.client.gradeName = data.gradeName
  },
  // 设置行业
  setIndustriesArr (state, data) {
    state.industriesArr = data
  },
  // 艺人和博主
  setStarAndBlogger (state, data) {
    state.starAndBlogger = data
  }
}
