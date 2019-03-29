import axios from 'axios'
import qs from 'qs'
import config from './config'
import store from '.././store/index'
// 临时token
const tempToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImEwNjk5YzdmMTdjYjc2NDRmZGRmZjQ2Mzk5NzU0YWNhZTQ3ZDUwM2I5YTIwMTYyMzdjY2JjYjgzNWVlZTg5OTE5Yjg5ZmRhOGMzNzA0Nzg5In0.eyJhdWQiOiIyIiwianRpIjoiYTA2OTljN2YxN2NiNzY0NGZkZGZmNDYzOTk3NTRhY2FlNDdkNTAzYjlhMjAxNjIzN2NjYmNiODM1ZWVlODk5MTliODlmZGE4YzM3MDQ3ODkiLCJpYXQiOjE1NTM1OTA4OTUsIm5iZiI6MTU1MzU5MDg5NSwiZXhwIjoxNTg1MjEzMjk1LCJzdWIiOiI0Iiwic2NvcGVzIjpbIioiXX0.kfi4C2dLq2WLKO94DIGYEl-T-vBm72Uc4eP7k-GUg6-Kt56OMMA0JFGTHlD0lx6IP8AtQMS0ygw9KaGhCnFhVK4zjJdaDaczqMkTxPQlK7-NWT3AiBhbP2M1LfJ46C86sfMPJ3NB5w2mZLzVj28XRcc3_n61MJnLXTkB4apUnajYBtTUWDLO6dwd1-ekApQ6dki4a-JhIcg9pYbwOBJggqvgO1t-xG87m3oNlN1kdaZIwrcf7ZsLsd1vFM2F-bvYuoQyzFbZVqnbzS_avlQMcVSBxHLLKLupjG6N3KsTnUdczrhhJwrfLyBL-UdlDHiOegkyOn3xMcDhGxTNBrGoZBdOoG2gFkZXrcAmHnq7QDDRPoNNIGNy5mOcxTKIS3p8-_bUwTiO8sb3CFgf4nFomvQNWybrCORtVeQ3rVDT1SR1ynw_LYyobxPUxymQvvDeym_GG0f7lFeh07GjMfb6x6mC24c1bjWUos6J_XYnXEPvBm7OhNenXeWQKw-aj3dj4dfZEVS2bwZebrjruG77g0gQ9aeLsBdRO7Tsvm3OiYXp8_E3dk51gjwDIqZCl_AWxYACGKNKwFJNR9Uuip5NwFL5XCXfjbKfl7Ut41QlILnUPZ8JK6Cgi8FXUkMDEsNRc7juvEl_7Neqp59f1UkREGa6-nQIwkc7H2QHLifT7DY'

// axios 配置
axios.defaults.timeout = 10000
axios.defaults.headers.common['Accept'] = 'application/vnd.Corvus.v1+json'
axios.defaults.headers.common['Access-Control-Expose-Headers'] = 'Location'
// axios.defaults.headers.common['Cache-Control'] = 'no-cache'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Authorization'
// console.log(config.token)
let token = config.token ? config.token : tempToken
// let token = config.token ? config.token : ''
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
