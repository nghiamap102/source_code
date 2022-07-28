export interface IPaginations {
  paging: IPaginationOption
  onSubmit: (pageNum: any, pageSize: any) => void
}
export interface IPagination {
  count?: number
  current_page?: number
  items_per_page?: number
  next_page?: number
  pages?: number
}
export interface IPaginationOption {
  pageCount: number
  pageNo: number
  pageSize: number
}

export interface IPagitaionAction {
  pageNum: number
  pageSize: number
}
