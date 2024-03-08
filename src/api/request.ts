import { type RequestType, apiMap } from '@/config/api.config'
import { http } from './http'
import { ElLoading } from 'element-plus'
import type { HttpResponse } from '@/types/http'
import { showMessage } from '@/utils/message'
import { TIMEOUT } from '@/config/base.config'

let loadingNum: number = 0

export function myRequest<T>({ reqType, data = {}, params = {} }: RequestType) {
  if (!(reqType in apiMap)) {
    showMessage.error('无效的请求')
    return Promise.reject('无效的请求')
  }
  loadingNum++
  // 此处使用的是element-plus的loading组件，可以自定义加载组件
  const loadingEle = ElLoading.service({ fullscreen: true })
  // 传入泛型T,则返回的data类型就是T
  return new Promise<HttpResponse<T>>((resolve, reject) => {
    http({
      url: apiMap[reqType].url,
      method: apiMap[reqType].method,
      headers: apiMap[reqType].headers,
      data: data,
      params: params,
      timeout: apiMap[reqType].timeout || TIMEOUT
    })
      .then((res: any) => resolve(res as HttpResponse<T>))
      .catch((err) => reject(err))
      .finally(() => {
        loadingNum--
        if (loadingNum === 0) {
          loadingEle.close()
        }
      })
  })
}
