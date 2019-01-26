import axios from 'axios'
import qs from 'qs'
import config from './config'
import { Toast } from 'mint-ui'

// 临时token
const tempToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNjYTRlNzc3MTljNDVjZjZlODA4MmJhMmYyN2U3MzAyNmJmMmE2YzA2YjVlN2FjOTI5MGRlODI4MDNmZDM3NDc5OWRiZTY2MjVhNWFiMTY0In0.eyJhdWQiOiIyIiwianRpIjoiY2NhNGU3NzcxOWM0NWNmNmU4MDgyYmEyZjI3ZTczMDI2YmYyYTZjMDZiNWU3YWM5MjkwZGU4MjgwM2ZkMzc0Nzk5ZGJlNjYyNWE1YWIxNjQiLCJpYXQiOjE1NDgyNDgwOTksIm5iZiI6MTU0ODI0ODA5OSwiZXhwIjoxNTc5Nzg0MDk5LCJzdWIiOiI3Iiwic2NvcGVzIjpbIioiXX0.gPx3A7rz1_7pLRud394FioIeSsKJ6STaOYjCgRM2UeehVrvOf1x5wAwSOMkZDlAJUxCWoquZoXN_uwqUQsq57NEPChIHCB1wAMsjaJNfxA9iIFY91bJizW4FBEW07Tm6_d1aZOUXj0NAnkWTVsoZjx25JLc5AlpxtL-3iwLtEvM8ucs1oG-kQR21kROaliZjT49xlfUiQwDR1JNRhOHJuSCW23I21W95fmMkcf8Q1aTlWFVS62ooLMeXwJ8HYmgG3yHqgTORiubtsWefsCb5jBQjk69Saoq9EWDDaxLC5b6gXnM7NbKkb4cF0oewDOqcuBCAxKMwIp6_Dz3ROfvm7by4-AD3w2X9Lja4cjEm2Jmfw5Y7hadFxKvq-HcBhVvjuAPAKrSGtrQMQoVRqBVCRrHoUDv37mYXnaQacudahnoJaX_ZMrfHyz5JQyZwkK5ltgb-_EUNxWitRHhjPLPcCkBcyW_IVq0kjSPlMXMGHki0zCwcGW4GrfhMidWdx19ZkI0vG2rOe4rIUqdH2OfJXmui9eGYnX9gqApm0oha4qPvB5hQvT99BqP0Qe6p5M3Y_37vium22eY3jT9nmSepEJNoylpI8K96shXaDFNlSVtqyPf9yeVIZlKG_CLSJWItJhLd-GcX0lhchGDc-ImMu3-zQroh2oUFOWnR6X4i1SE'

// axios 配置
axios.defaults.timeout = 10000
axios.defaults.headers.common['Accept'] = 'application/vnd.Corvus.v1+json'
axios.defaults.headers.common['Access-Control-Expose-Headers'] = 'Location'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Authorization'
const token = window[config.tokenString] ? window[config.tokenString] : tempToken
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
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
  Toast(response.data.message)
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
      Toast(errors[errInfoArr[0]])
    } else {
      Toast(response.data.message)
    }
  } else if (status === 403) {

  } else {
    Toast(response.data.message)
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
