import { useState } from 'react'
import { onPageChangedCallBack } from './index'
export const usePagination = () => {
  const [page, setPage] = useState(1)
  const [countPage, setCountPage] = useState(0)

  const onPageChanged = ({ currentPage }: onPageChangedCallBack) => {
    if (currentPage && currentPage !== page) {
      setPage(currentPage)
    }
  }

  return { page, setPage, countPage, setCountPage, onPageChanged }
}
