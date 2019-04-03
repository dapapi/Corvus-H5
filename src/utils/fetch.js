import axios from 'axios'
import qs from 'qs'
import config from './config'
import store from '.././store/index'
// 临时token
const tempToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJmNTc1MmRkYzY3Y2NlZDk2ZTM0ODkxMDE5MjNjNzgwODgzMjY2ODY5MWUxNWViM2E0OGJmNTQ2ODcxYzA2OTJhOTVjMjY0ZmM4MWM4MmJjIn0.eyJhdWQiOiIyIiwianRpIjoiMmY1NzUyZGRjNjdjY2VkOTZlMzQ4OTEwMTkyM2M3ODA4ODMyNjY4NjkxZTE1ZWIzYTQ4YmY1NDY4NzFjMDY5MmE5NWMyNjRmYzgxYzgyYmMiLCJpYXQiOjE1NTQyNTg1NDUsIm5iZiI6MTU1NDI1ODU0NSwiZXhwIjoxNTg1ODgwOTQ1LCJzdWIiOiI1NzMiLCJzY29wZXMiOlsiKiJdfQ.jLU2ctW0D0y9_IPossMtfuiwZaqKZTvERWyyXvbLbr3i_kW9TXWDhPK6CByFNQ_cN70SoaifNfJo1gj_GPGKpI9sQyEb_12ze_icULAGTTLMeX-XGglGW9-D0sT9YzY2boYlns5CDkNoPw4mD6C2hdb6xn6HTUHBu0YcvgP3XehL9jX1aeCrsg8eEv61nzyZ90bw49juYpNZvQdmKZ--RXLjl3u8lnZOUEWPBMe2XREqUMmQGCHE74TvKNn828Bqotvf4-szUH8uUWAKmfORf-B-9MAwalNB61bT3JbsvGPHtw3v_Vw5MV_WV1QT_PmxaTt0wVmrI62NhadUeuKfkm7XtDp70xc5EzNBk8VzTXlrDpGqFZgBz_sKwT_X6wIhxVAAuJ_Mkgh_RjYpAVMV73rnWctE9z52c3ru0Z3D91FaC9kKm9AgdeVg0gK1Fy1bAD3P8FDSpwLr532O5eWG2XndoMag8s3B6yfPdvrGmJuKqG6ZfvOAGzk1R_FSarZ3Bep1D1YOseq1pPxQHBjUjUGLpxoXwRDudFybaSy__jGXm4qtKlcln69A18vPxJhpw-R8m-Ol-coBXZHrAWMnWNEjkpYk_fKUBaqOm1NMygxDQa8A4PrmlpqXGtz-ri_xTS23Ud7eFKicaEnmEixv8U1jKVMbIlYaL9rfpf7P_XQ'

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
