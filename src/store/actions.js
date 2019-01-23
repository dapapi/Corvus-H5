import fetch from '@/utils/fetch'
import config from '@/utils/config'
import { Toast } from 'mint-ui'
export default {
  // 关联资源
  getResourceList ({ commit }) {
    fetch('get', '/resources').then(res => {
      commit('setResourceList', res.data)
    })
  },
  // 返回某一关联资源
  getRelatedResources ({ commit }, params) {
    fetch('get', params.url, params.data).then(res => {
      commit('setResourceData', res.data)
    })
  },
  // 获取任务类型
  getTaskTypes ({ commit }, params) {
    fetch('get', '/task_types').then(res => {
      commit('setTaskTypes', res.data)
    })
  },
  // 获取任务详情
  getTasks ({ commit }, params) {
    fetch('get', `/tasks/${params.id}`, params.data).then(res => {
      console.log(res.data)
      commit('setTaskDetail', res.data)
    })
  },
  // 添加任务
  addTask (params) {
    fetch('post', '/tasks', params)
  },
  // 添加销售线索
  addTrail (params) {
    fetch('post', '/trails', params)
  },
  // 获取所有客户
  getClients ({ commit }, params) {
    fetch('get', '/clients/all', params).then(res => {
      const clients = res.data.map(n => {
        return {
          value: n.id + '',
          label: n.company,
          grade: n.grade || ''
        }
      })
      commit('setClientsAll', clients)
    })
  },
  // 获取线索来源
  // getTrailsOrigin ({ commit }, params) {
  //   fetch('get')
  // },
  // 获取行业
  getIndustries ({ commit }, params) {
    fetch('get', '/industries/all').then(res => {
      console.log(res)
      const data = res.data.map(n => {
        return {
          label: n.name,
          value: n.id + ''
        }
      })

      commit('setIndustriesArr', data)
    })
  },
  // 获取签约的艺人和博主
  getStarAndBlogger ({ commit }, params) {
    fetch('get', '/starandblogger?sign_contract_status=2').then(res => {
      const data = res.data.map(n => {
        return {
          value: n.id + '',
          label: n.name
        }
      })
      commit('setStarAndBlogger', data)
    })
  },
  //获取艺人详情
  getArtistDetail({commit}, params){
    fetch('get', `/stars/${params.id}`, params.data).then(res => {
      commit('setArtistDetail', res.data)
    })
  },
  //添加艺人
  postArtist({commit}, params) {
    console.log(params.data)
    fetch('post', `/stars`, params.data).then(res => {
      Toast(params.toast)
      config.deviceBack(2)
    })
  },
  //编辑艺人
  putArtist({commit}, params) {
    fetch('put', `/stars/${params.id}`, params.data).then(res => {
      Toast(params.toast)
      config.deviceBack(2)
    })
  },
  //获取博主类型
  getBlogType({commit}) {
    fetch('get', '/bloggers/gettype').then(function (res) {
      commit('setBlogType',res.data)

    })
  },
  //获取博主详情
  getBlogDetail({commit}, params) {
    fetch('get', `/bloggers/${params.id}`, params.data).then(res => {
      commit('setBlogDetail', res.data)
    })
  },
  //添加博主
  postBlogger({commit}, params) {
    console.log(params.data)
    fetch('post', `/bloggers`, params.data).then(res => {
      Toast(params.toast)
      config.deviceBack(2)
    })
  },
  //编辑博主
  putBlogger({commit}, params) {
    fetch('put', `/bloggers/${params.id}`, params.data).then(res => {
      Toast(params.toast)
      config.deviceBack(2)
    })
  },
  //获取公告列表
  getNoticeList({commit}) {
    fetch('get', `/announcements?include=creator`).then(res => {
      commit('setNoticeList', res.data)
    })
  },
  //获取公告详情
  getNoticeDetail({commit},params){
    fetch('get', `/announcements/${params.id}?include=scope,creator`).then(res => {
      commit('setNoticeDetail', res.data)
    })
  },
  //获取项目详情
  getProjectDetail({commit},params){
    fetch('get', `/projects/${params.id}`,params.data).then(res => {
      // console.log(res.data)
      commit('setProjectDetail', res)
    })
  },
  //项目审批流程
  getApproval({commit},params) {
    fetch('get', `/approval_instances/${params.id}/chains`).then(res => {
      // console.log(res)
      commit('setApproval', res.data)
    })
  },
  // 获取客户信息
  getClientDetail ({ commit }, params) {
    fetch('get', `/clients/${params.id}`,{include: 'principal,creator'}, ).then(res => {
      console.log(res)
      commit('setClientDetail', res.data)
    })
  }
}