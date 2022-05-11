import axios from 'axios'
import config from '@/config'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const request = axios.create({
  timeout: 15000,
  baseURL: config.serverUrl
})

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // console.log(config)
    if (config.token) {
      if (!getToken()) {
        return Message.error('请重新登录')
      }
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // console.log(response.data)
    if (response.data.code === 401) {
      Message.error('请重新登录')
      return Promise.reject(response)
    }
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
