import axios from 'axios'
import qs from 'qs'
import config from './config'
import store from '.././store/index'
// 临时token
// const tempToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc1YWEwZTFiODMzN2Q4YjMwMjkwN2RmMzNiYWU4OGM3OWE5NmU4OTRhYzEyMDg5YjE2NGNkYzc3MTYzMzk3NmY5ZTMwNDJhZjg3OWY5NDJiIn0.eyJhdWQiOiIyIiwianRpIjoiNzVhYTBlMWI4MzM3ZDhiMzAyOTA3ZGYzM2JhZTg4Yzc5YTk2ZTg5NGFjMTIwODliMTY0Y2RjNzcxNjMzOTc2ZjllMzA0MmFmODc5Zjk0MmIiLCJpYXQiOjE1NTI4OTM0NDUsIm5iZiI6MTU1Mjg5MzQ0NSwiZXhwIjoxNTg0NTE1ODQ1LCJzdWIiOiI0Iiwic2NvcGVzIjpbIioiXX0.luSpDkAG192KOCX0p7S31HAVX6DjmB-BX7m5VXq6YlJoN1cw8HDvDMdKD-EW8YweCC4JKdbHrdjdGRwteKKrt6C6HguX-NyQAtPbm9R6wDAH8BRlYIfPOnDNLzqhJkaUisxfEDA4PrAcThRtEzPtwj0I2l_EA7xnJq4vREo9rqIspu-8vCJANvU0IKaI_ioIY1_LrtfMvla3mtD8IT6TLbXZcy0W-uIyHFua2JTWQz_4YjpOBRO61by5rSncWUIjcuYz1nFspVKSbf_4N2pZof0qpLa59WPgTrYYGbkukpZCNN8eXYHObr97XTY8Sr0BRNXGZDpj8BUTJ0FKzJKq7NbYvGACkcV5rE6ORALkLDKbAr_WMPVPwut3tZkOzqQhVTUTjR48CS-XH2S2npjTIa7sS0lsGCno-3s0TMTPfVyLjxAoAAJQPlxbcjSchUDU54Ci08QaCVCnH-2hxQmpzxenbEZ6A-LFXynXfdWWjgZo-PyGNBUeEAuYHG34fjytDJxmLa5chIU0v9x9SWxfBsFdfLqrjY103u9wsFxSSkvnj950Ovs0iI3CkaGJVVn_BH6m56YzJrhgpp5SlERxHkeyZzkkzQxUbUiiflzqT7d-0VdyB_RvWI6xo_QUnlJe6Z3w-0nEGlyOz_UuN5963Y17HcWSeISom-a8W5CFRII'

// axios 配置
axios.defaults.timeout = 10000
axios.defaults.headers.common['Accept'] = 'application/vnd.Corvus.v1+json'
axios.defaults.headers.common['Access-Control-Expose-Headers'] = 'Location'
// axios.defaults.headers.common['Cache-Control'] = 'no-cache'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Authorization'
console.log(config.token)
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
