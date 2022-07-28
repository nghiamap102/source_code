import { AxiosError } from 'axios'

export interface BIPBIPResponse<T> {
  data: T
  code: string
  message: string
  total_items?: number
}

export function isInstanceOfAxiosResponse<T>(response: BIPBIPResponse<T> | AxiosError): response is BIPBIPResponse<T> {
  return 'data' in response
}
