export interface HttpResponse<T> {
  code: number
  msg: string
  data: T
}

export interface ErrorResponse {
  code: number
  msg: string
}
