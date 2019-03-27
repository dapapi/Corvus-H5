import axios from 'axios'
import qs from 'qs'
import config from './config'
import store from '.././store/index'
// 临时token
const tempToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjkyYWYxNDczYmQyNjZjZTMxMjc1ODdiYjkwYWMwYzA0YmE2NTRjODczODIxOTIwMGYyMjZmZWZlOGJmNjRmZTBiMjEzNzc0YzA2MWNiNjQ3In0.eyJhdWQiOiIyIiwianRpIjoiOTJhZjE0NzNiZDI2NmNlMzEyNzU4N2JiOTBhYzBjMDRiYTY1NGM4NzM4MjE5MjAwZjIyNmZlZmU4YmY2NGZlMGIyMTM3NzRjMDYxY2I2NDciLCJpYXQiOjE1NTMxNDAyNjgsIm5iZiI6MTU1MzE0MDI2OCwiZXhwIjoxNTg0NzYyNjY4LCJzdWIiOiIxMSIsInNjb3BlcyI6WyIqIl19.OmwFrQJVbXlnvOBIMCh6f48gbZi1JkIoNLDEj91j_4y5S1l8iJ4G56_5BbkLN1poc0Cw3GW_pG-Pm5jtts5LRNnAIhcW2fFOcdkJADf7JzJ9pTwqWRpVX8OyTo1MH6H2ErpMaz2wtDyJWIMAiIjbG_ZQCMDVLpBWhjy5l1HHctzm5JpmBhzQKbRp96xdhF_2kdL5KtBROfE1UnGOhl3FWUEJj5Zdx-a8PTE-2_YNpfRC8WFHKsvp3kwRJjf-1jyX1dFXdcqJJlQiRlmHkHkmSOncougU9SLkeauWpz05-QwiJEy47Bj_SajK_sl9RKmet0btUFiktF3vIJZdagXPIk3HcYlrGCysVCL-yY_g99cxUhG9mRPN5cL8QatVzpyWcSr9PLjH48ZkdEgrZcEflQBeDMQzcUWuRLHozj5zq6w2Bmu6LlsDXF-puT6PZrFG-0mvD_CfXbSRGC33wEyXgbIhHI0nGmeU031_CUFcvrF9nSKt0mcDLdWWOsbcwWxEAhOZU81vknDHcI8IETZGLLM40gYjqtWb0uXhjY5dbF6GcGEUvsXsJ-xspLIrlA-PRIIoPP8K8LEVKHMwCv56sKZ_DQJFhxjB0ZaJZSwa2oRfA3VN1Z4HpGBOwxJR21LJAYu9ulg9zIdw5TATNksrWVKcFb9D2bT8OIvo37RHgAA'

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
