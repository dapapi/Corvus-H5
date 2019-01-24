import axios from 'axios'
import qs from 'qs'
import config from './config'
import { Toast } from 'mint-ui'

// 临时token
window[config.tokenString] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBkZmYzMzc0OGFhYjQ2YTNjOGFlNmJkZGY4NzhlZjNiZjMxZDcyMzg1MjIyNzk1NTlkNGUxYzlhMTU2NTQyODdjZWQ1MTBmN2M4N2ZmNTVjIn0.eyJhdWQiOiIyIiwianRpIjoiMGRmZjMzNzQ4YWFiNDZhM2M4YWU2YmRkZjg3OGVmM2JmMzFkNzIzODUyMjI3OTU1OWQ0ZTFjOWExNTY1NDI4N2NlZDUxMGY3Yzg3ZmY1NWMiLCJpYXQiOjE1NDc2MDI3MzAsIm5iZiI6MTU0NzYwMjczMCwiZXhwIjoxNTc5MTM4NzMwLCJzdWIiOiI3Iiwic2NvcGVzIjpbIioiXX0.wrYJN1M51lZ-GH2J1rn6vI-rYKp5GjF7zMHnVXaaA2eZGDJshNjo-TC_B5h86M6k-UW6MWMhyKct99lWa16rJ_RpA3PoZar3RmEbB3csZLoWqiTFtvfBaZrIaa41FjMuy7nydUs49rD1LeW_ryMyfn-8TJ8VXsGR6JB7Ip9jzFcQzENcC7K7CMb5KoVfR319rKYwny3TwCeo1TuBYWTswEcWbvl5FGo0kEU0fPuXYvyxgwOUTrwfkzZ_itoq6lvT-DP6IDDwoZsxeuLkNGiCglwx32EWxflCYhcjpXBbZcKdaicD2TeZvPvP_lIUtzhKdGB9MbVKRW9YuGJLidkeLMZzFarHHeKQYeYd0nobh1jRRPsPZJSeX67bKVUATZOqaW8LcYbTbRJHmhhLoMsulTLCWcJ6mbVFGFQWApCmWvnl1p0E2ctGY1RfUWB66-0yKvtdywtk29eYBoyBMVSJkAFBNvMQ6gOMaNdnLQ9HXv-ntMoVBx1MsfjqmMvHk0B6JBjSRwTsLGRTCF3mtZ5ndfOcRvfAfHn53vklF-gjWvz4xRx1A478Ve8QAOq4Y5Agl2vesfO3_Qz9b8t31uEFRgE1u2ce8VE-fQ-INzgoopT4KLjj4pzmSH3dOlCcOFV27j7urNoxk2HE2u_OsYMBgCvDIEMLQOlcfCeP2-WCevg'

// axios 配置
axios.defaults.timeout = 10000
axios.defaults.headers.common['Accept'] = 'application/vnd.Corvus.v1+json'
axios.defaults.headers.common['Access-Control-Expose-Headers'] = 'Location'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Authorization'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + window[config.tokenString] || ''
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
