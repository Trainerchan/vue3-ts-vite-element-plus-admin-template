import { showMessage } from '@/utils/message'
import type { ErrorResponse } from '@/types/http'
import axios, { AxiosError } from 'axios'
import { apiMap, type ApiType } from '@/config/api.config'
import { Session } from '@/utils/storage'
import { HEADER_TOKEN_KEY, TOKEN_KEY } from '@/config/base.config'

export const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API
})

let reqMap: ApiType

http.interceptors.request.use(
  function (config) {
    // console.log('请求拦截->', config)
    const { url, method } = config
    reqMap = Object.values(apiMap).filter((v: ApiType) => {
      return v.url === url && v.method.toLowerCase() === method?.toLowerCase()
    })[0]
    if (reqMap.withToken) {
      // 此处看情况，管理端的话就选择session，客户端看你自己选择local还是session
      const token = Session.get(TOKEN_KEY)
      // 要么在header请求头带上，要么在cookie里面带上，都看你自己
      config.headers[HEADER_TOKEN_KEY] = 'Bearer ' + token
    }
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)

http.interceptors.response.use(
  function (config) {
    // console.log('响应拦截->', config)
    if (reqMap.saveToken) {
      // 此处session和local同理
      Session.set(TOKEN_KEY, config.data.data.token)
    }
    return config.data
  },
  function (err: AxiosError) {
    const errRes = err.response?.data as ErrorResponse
    // 错误的更详细返回，可以自己配置错误表
    if (errRes.msg) {
      showMessage.error('Error ' + errRes.code.toString() + '. ' + errRes.msg)
    } else {
      showMessage.error(err.message)
    }
    return Promise.reject(err)
  }
)
