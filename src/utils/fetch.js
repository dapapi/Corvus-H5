import axios from 'axios'
import qs from 'qs'
import config from './config'
import store from '.././store/index'
// 临时token
// const tempToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjMyYTIwNDAwNGVmYmI3OGRiZjYzZjA0NjQ4ODk2MjlmYmVkOGJlZGU4NjlhNTliMjA4NzI2MDYxMmYwMGU1ZWI2NjY4Y2M4MmZjOWVkNThmIn0.eyJhdWQiOiIyIiwianRpIjoiMzJhMjA0MDA0ZWZiYjc4ZGJmNjNmMDQ2NDg4OTYyOWZiZWQ4YmVkZTg2OWE1OWIyMDg3MjYwNjEyZjAwZTVlYjY2NjhjYzgyZmM5ZWQ1OGYiLCJpYXQiOjE1NTQxOTk4NTEsIm5iZiI6MTU1NDE5OTg1MSwiZXhwIjoxNTg1ODIyMjUxLCJzdWIiOiI1NzMiLCJzY29wZXMiOlsiKiJdfQ.KM2AsqfWDO-OLYbjz433Mnb_b1aKCVUpEysWFrUQ_cc3OdOsVl7gZKlbVO-mbTLEMN43r7UoTVINgycjHFz0YFn0bvj_64VX63UVNZETm4VGMO3C57n-Zowy4oQm4KnaCSFoXdZVnfE1t5HhH4v7EsIhykPOyNbu5EJVC7m1_Qr55vVHHdIBvqfYMu7D1Q3SfVPI3JNRPGHqhigalGNod0BEn0crZxV8Wp5ghWBMrkCHcWy4J8cFejHMJEgIEU8tKXRXXVJE6K7HtI37swwwhWP8Ee3RgvFk_m0sJuUGpV1rb8hRkuHy-5UOB-Acc2jcN4k0mQ7mR4MMkAVSwU8HPNPJWzLPWbc2EWfJwAw6412uXa1Y4kClINjzDoS2OH1ZJXkglMLMML1SOMTIGq5aEhVCtPcHZ_77BKXAITp1rhpeHUFXpfgrGmQfsbTTU1hDDo1ZZa2bOhY9gWyThM5CjB6WtkxO33RGZDvmPOdRPUNcbMZGFQAOHCmDKRaMcz8Umu-UISLA1UH523xNWzohkcUxKM2SYkhgJnNi29Gkq1d7_PKzI_j4p3Bx1_uDIkP1tSNuyGrs-IbZDdlAa8Kbw562WkWXeyYF24SsAZ076737Pc0vxzvnCK1lC_tv0geBv5kbw4lgCSIYM05H9BSTm8uNBpt91LEe5W4URgddQyA'

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
