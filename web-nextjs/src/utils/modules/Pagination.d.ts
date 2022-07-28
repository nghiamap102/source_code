export interface IPagination {
  count?: number
  pages?: number
  items_per_page?: number
  current_page?: number
  next_page?: number
}

export interface IPaginations {
  paging: IPagination
  onSubmit: (pageNum: number, pageSize: number) => void
}
export interface IPaginationOption {
  count: number
  pages: number
  items_per_page: number
  current_page: number
  next_page: number
}

export interface IPagitaionAction {
  pageNum: number
  pageSize: number
}
