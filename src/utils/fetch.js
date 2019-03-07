import axios from 'axios'
import qs from 'qs'
import config from './config'
import { Toast } from 'mint-ui'

// 临时token
const tempToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImZkNDc4ZDJjNTdmZjA1MDE1N2VjMzMzMWM0N2M1NmZlNmMyNWE5NWI2OTNjMDkxY2ZkZTkwYWU2YjU0MjFlYTIzZWFmYTNjOTI1MDFjNDJkIn0.eyJhdWQiOiIyIiwianRpIjoiZmQ0NzhkMmM1N2ZmMDUwMTU3ZWMzMzMxYzQ3YzU2ZmU2YzI1YTk1YjY5M2MwOTFjZmRlOTBhZTZiNTQyMWVhMjNlYWZhM2M5MjUwMWM0MmQiLCJpYXQiOjE1NTE5NDMzMjgsIm5iZiI6MTU1MTk0MzMyOCwiZXhwIjoxNTgzNTY1NzI4LCJzdWIiOiIzIiwic2NvcGVzIjpbIioiXX0.mwPVVIgggYOc41ND3L95sYs7PyoW-fMQpcUkxPi2lRaR6i9RL1YWSpT2dDQhGIpvrvbF9uRlq6qxk1u37qKw3gu_AZvvcQ3gNhryZjMPocAqqGjmlZMJ_v9kb1EFJoxxDmvqesiLkhUsOwzLBap5WoVIL3yQrXDj6r9nL8B-RyGR_-uqsde3-5L1uBolFu77emWxdMb3ZjbG-YnXxoHYCAl57ICpdBQysFBIh7-HK1pdGBuy3qVPXPRQhfgaA4Ig_CEphG-2Jqja5jEI0ztsyx-gFy2xAzCwEpqW0quqAwW_zg2kNaAitzK3WTY9KejkOXda5_gIn0IGaUGKiLkESJMH__jlMRJMfK4kTDvvf3P0gzT6SoFES1sjLDdJm-8q8Rhh6bKo2_AeUpZzuPnqpcsVrFcKiGaXGwgpYAVGtMoB6imA3ttNrgMDQ-ogrjPbmojL_GsOl2mfDktyjkoTBxJSLo-rzJ-cNs4Y-9c85OL2boYPqBE-LjE9MXbB47mIzKVddVJ-7oCuefCMSQXTCZiqEn4U6vTHwBkMMzqHjqkGanFms5SOcbxCpJ7UIVVRizwsAsHuq5kcmsODG-ODtIjbDxyxg_LXR5penitY2yzLgHurl1amTQ0OY3zmszqlrImupeycSqgmJaQGzoLCIMUBn8u5Ft4XF8ZZOjbdJLU'

// axios 配置
axios.defaults.timeout = 10000
axios.defaults.headers.common['Accept'] = 'application/vnd.Corvus.v1+json'
axios.defaults.headers.common['Access-Control-Expose-Headers'] = 'Location'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Authorization'
const token = config.token?config.token : tempToken
alert(token)
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
