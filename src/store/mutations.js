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
  },

  //公告列表
  setNoticeList(state,data){
    state.noticeList = data
  },
  //公告详情
  setNoticeDetail(state,data){
    state.noticeDetail = data
  },
  //项目详情
  setProjectDetail(state,data){
    state.projectDetail = data.data
    state.projectDetailMeta = data.meta
  },
  setApproval(state,data){
    state.approvalProgress = data
  },
  // 设置客户详情
  setClientDetail (state, data) {
    state.clientDetail = data
  },
  setClientContact (state, data) {
    state.clientContact = data
  },
  // 设置线索详情
  setTrailDetail (state, data) {
    state.trailDetail = data
  }
}
