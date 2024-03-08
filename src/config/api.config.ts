interface ApiMap<T> {
  login: T
}

export const apiMap: ApiMap<ApiType> = {
  login: {
    url: '',
    method: 'CONNECT'
  }
}

export interface ApiType {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'TRACE' | 'CONNECT'
  headers?: RequestHeaders
  timeout?: number
  withToken?: boolean
  saveToken?: boolean
  [key: string]: any
}

export interface RequestHeaders {
  'Content-Type'?:
    | 'application/json'
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data'
    | 'text/plain'
    | 'text/html'
  [key: string]: any
}

export interface RequestType {
  reqType: keyof typeof apiMap
  params?: any
  data?: any
}
