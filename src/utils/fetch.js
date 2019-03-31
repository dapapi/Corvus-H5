import axios from 'axios'
import qs from 'qs'
import config from './config'
import store from '.././store/index'
// 临时token
// const tempToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ3YWMyNzAyY2FmNDMxOGQ1NTljNGZhYWQ0OTRhZTRlM2U4OTMxZDI5ODc2NDJiODk0NGJhYWViMGMwMWMyMWU4YzljYWYwNzJmZWE1OWRkIn0.eyJhdWQiOiIyIiwianRpIjoiZDdhYzI3MDJjYWY0MzE4ZDU1OWM0ZmFhZDQ5NGFlNGUzZTg5MzFkMjk4NzY0MmI4OTQ0YmFhZWIwYzAxYzIxZThjOWNhZjA3MmZlYTU5ZGQiLCJpYXQiOjE1NTM4MzIyNDksIm5iZiI6MTU1MzgzMjI0OSwiZXhwIjoxNTg1NDU0NjQ5LCJzdWIiOiI1NzMiLCJzY29wZXMiOlsiKiJdfQ.LVmhJUU32NzUK96LsSmQyMCeuKPD4oL-goAUieSz_f0G2ueBi30Ken_wPQsnuRr5tY6pZKlqBTGA2VW21gDlH7Rnq9dxq8ctFsZE9Y5qvHZoN32VQoJSdg21nVeg6VfuSP91bXCdPZLSTtfTPFGk1KUg13HKH7Yu8pkJl2sOYPSzmm7Gqg82iYjSjm3Du9u0ROi2wEJDcYy6h-4Hj1jH9FKvWGyXLoTrtfmXtA6Duo3Gr0hnL7l3Ghz1UuP48B9Qlg3i_dC_OEgiovXj6gQS9cjT76gfIszc6Wu27Gum9U2AxxdwG19QYuodprD6clQCZgj78ZqY-stCMtvjNq0WUlpNCiScpP0Jg_j82MsTd8r6wGoBSbyru99YJEYmJoSITubxA_Ooq4EHOJFeB6MF4R2EpdqVNA29V2F0WWXCTA6guwbuPJJw35pGvfTy2f99p3skKMWDlPiK_7l2MW3hbQBwN9NB0e06J3FL8410FOSeaiPeuA6eMyK8SwhilPiXt3jRvLpph7KDSEpu7HO0DR7YUzRx2EHKo_PJeDPef7Fu3SMNNSzFSAfkRpQ2gVtcG8KQL2QzaTut0aVKUHB8-2JTIuF0MKMwNIPSjRZTVTHpSIBPHDLdTjHmIUEvvkMRivhtpQZDUZtTcWiHoydzgYiueYFona90s1MQ2LejJRc'

// axios 配置
axios.defaults.timeout = 10000
axios.defaults.headers.common['Accept'] = 'application/vnd.Corvus.v1+json'
axios.defaults.headers.common['Access-Control-Expose-Headers'] = 'Location'
// axios.defaults.headers.common['Cache-Control'] = 'no-cache'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Authorization'
// console.log(config.token)
// let token = config.token ? config.token : tempToken
let token = config.token ? config.token : ''
if (token.substr(0, 7) !== 'Bearer ') {
  token = 'Bearer ' + token
}
axios.defaults.headers.common['Authorization'] = token
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = config.apiUrl

// POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    // let flag = true
    // for (const key in config.data) {
    //   if (Array.isArray(config.data[key]) && config.data[key].length === 0) {
    //     flag = false
    //     break
    //   }
    // }
    // if(flag == true){
    //   config.data = qs.stringify(config.data)
    // }
    config.data = qs.stringify(config.data)
    // console.log(typeof config.data)
  }
  return config
}, (error) => {
  const { response } = error
  toast(response.data.message+'')
  return Promise.reject(error)
})

// 返回状态判断
axios.interceptors.response.use(res => {
  if (res.status < 200 && res.status > 300) {
    return Promise.reject(res)
  }
  return res
}, (error) => {
  const { response: { status } } = error
  const { response } = error
  if (status === 401) {
    // config.getStatusCode()[401]()
  } else if (status === 422) {
    const errors = response.data.errors
    const errInfoArr = Object.keys(errors)
    if (errInfoArr.length > 0) {

      toast(errors[errInfoArr[0]]+'')
      // console.log(error[errInfoArr[0]])
    } else {
      toast(response.data.message+'')
    }
  } else if (status === 403) {
      toast(response.data.message + '')
  } else {
    toast(response.data.message+'')
  }
  return Promise.reject(error)
})

export default function fetch (method = 'post', url, params) {
  return new Promise((resolve, reject) => {
    axios[method](url, method.toLowerCase() === 'get' ? { params } : params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
