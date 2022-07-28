import React, { useState, useEffect } from 'react'
import { Box, HStack, Text } from '@chakra-ui/react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { CgChevronLeft, CgChevronRight, CgChevronDoubleRight, CgChevronDoubleLeft } from 'react-icons/cg'
import { onPageChangedCallBack } from '.'

const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'
const END = 'END'

const range = (from: number, to: number, step = 1): number[] => {
  let i = from
  const range = []

  while (i <= to) {
    range.push(i)
    i += step
  }

  return range
}

interface PaginationProps {
  totalRecordsInit: number
  pageLimitInit?: number
  pageNeighborsInit?: number
  // eslint-disable-next-line no-unused-vars
  onPageChanged?: (data: onPageChangedCallBack) => void
  page: number
}

const Pagination: React.FC<PaginationProps> = ({
  totalRecordsInit,
  pageLimitInit = 5,
  pageNeighborsInit = 0,
  onPageChanged,
  page
}) => {
  const [pageLimit, setPageLimit] = useState(pageLimitInit)
  const [totalRecords, setTotalRecords] = useState(totalRecordsInit + 1)
  const [totalPages, setTotalPages] = useState(Math.ceil(totalRecords / pageLimit))
  const [pageNeighbors, setPageNeighbors] = useState(Math.max(0, Math.min(pageNeighborsInit, 2)))
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setTotalRecords(totalRecordsInit)
    setPageLimit(pageLimit)
    setTotalPages(Math.ceil(totalRecords / pageLimit))
    setPageNeighbors(Math.max(0, Math.min(pageNeighborsInit, 2)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalRecordsInit, pageLimitInit, totalRecords, pageLimit, totalRecords])

  useEffect(() => {
    gotoPage(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const gotoPage = (page: number) => {
    const currentPage = Math.max(0, Math.min(page, totalPages))
    const paginationData = {
      currentPage,
      totalPages: totalPages,
      pageLimit: pageLimit,
      totalRecords: totalRecords,
      offset: (currentPage - 1) * pageLimit
    }
    setCurrentPage(currentPage)
    onPageChanged?.(paginationData)
  }

  const handleClick = (page: number) => {
    gotoPage(page)
  }

  const handleMoveLeft = () => {
    gotoPage(currentPage - pageNeighbors * 2)
  }

  const handleMoveRight = () => {
    gotoPage(currentPage + pageNeighbors * 2)
  }

  const handleMoveLeftStep = () => {
    if (currentPage > 1) {
      gotoPage(currentPage - 1)
    }
  }

  const handleMoveRightStep = () => {
    if (currentPage < totalPages) {
      gotoPage(currentPage + 1)
    }
  }

  const fetchPageNumbers = (): (string | number)[] => {
    const totalNumbers = pageNeighbors * 2 + 3
    const totalBlocks = totalNumbers + 2
    if (totalPages > totalBlocks) {
      let pages = []

      const leftBound = currentPage - pageNeighbors
      const rightBound = currentPage + pageNeighbors
      const beforeLastPage = totalPages

      const startPage = leftBound > 1 ? leftBound : 1
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage
      pages = range(startPage, endPage)

      const pagesCount = pages.length
      const singleSpillOffset = totalNumbers - pagesCount - 1

      const leftSpill = startPage > 1
      const rightSpill = endPage < beforeLastPage - 1
      const endSplill = endPage < beforeLastPage - 1

      const leftSpillPage = LEFT_PAGE
      const rightSpillPage = RIGHT_PAGE
      const endSpillPage = END

      if (leftSpill && !rightSpill) {
        const extraPages = range(
          endPage !== beforeLastPage ? startPage - singleSpillOffset : startPage - singleSpillOffset - 1,
          startPage - 1
        )
        if (!endSplill) {
          if (endPage === beforeLastPage) {
            pages = [leftSpillPage, ...extraPages, ...pages]
          } else {
            pages = [leftSpillPage, ...extraPages, ...pages, beforeLastPage]
          }
        } else {
          pages = [leftSpillPage, ...extraPages, ...pages]
        }
      }
      if (rightSpill) {
        if (!leftSpill) {
          const extraPages = range(endPage + 1, endPage + singleSpillOffset)
          pages = [...pages, ...extraPages, endSpillPage, rightSpillPage]
        } else {
          pages = [leftSpillPage, ...pages, endSpillPage, rightSpillPage]
        }
      }
      return pages
    }
    return range(1, totalPages)
  }

  if (!totalRecords) return null

  if (totalPages === 1) return null

  const pages = fetchPageNumbers()

  return (
    <Box display='flex' alignItems='center'>
      <Box
        color='#8C8C8C'
        aria-label='PrevStep'
        px={{ base: '0', md: '20px' }}
        cursor='pointer'
        onClick={handleMoveLeftStep}
      >
        <CgChevronLeft size='25px' />
      </Box>
      {pages.map((page, index) => {
        if (page === LEFT_PAGE)
          return (
            <Box
              color='#8C8C8C'
              key={index}
              aria-label='Previous'
              cursor='pointer'
              onClick={handleMoveLeft}
              px={{ base: '10px', md: '20px' }}
            >
              <CgChevronDoubleLeft size='30px' />
            </Box>
          )

        if (page === RIGHT_PAGE)
          return (
            <Box
              color='#8C8C8C'
              key={index}
              px={{ base: '0', md: '20px' }}
              aria-label='Next'
              cursor='pointer'
              onClick={handleMoveRight}
            >
              <CgChevronDoubleRight size='30px' />
            </Box>
          )
        if (page === END)
          return (
            <HStack display='inline-flex'>
              <Box px={{ base: '10px', md: '20px' }}>
                <HiDotsHorizontal />
              </Box>
              <Text
                userSelect={'none'}
                fontSize='20px'
                fontWeight='600'
                px={{ base: '10px', md: '20px' }}
                cursor='pointer'
                onClick={() => handleClick(totalPages)}
              >
                {totalPages}
              </Text>
            </HStack>
          )

        return (
          <Text
            userSelect={'none'}
            key={index}
            fontSize='20px'
            fontWeight='600'
            px={{ base: '10px', md: '20px' }}
            cursor='pointer'
            color={currentPage === page ? '#00C7C4' : 'black'}
            onClick={() => handleClick(page as number)}
          >
            {page}
          </Text>
        )
      })}
      <Box
        color='#8C8C8C'
        aria-label='NextStep'
        px={{ base: '10px', md: '20px' }}
        cursor='pointer'
        onClick={handleMoveRightStep}
      >
        <CgChevronRight size='25px' />
      </Box>
    </Box>
  )
}

export default Pagination
