export { default as Pagination } from './Pagination'
export { usePagination } from './usePagination'

export interface onPageChangedCallBack {
  currentPage: number
  totalPages: number
  pageLimit: number
  offset: number
}
