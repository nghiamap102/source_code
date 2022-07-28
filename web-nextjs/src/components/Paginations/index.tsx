import React, { useState, useEffect } from 'react'
import { paginationWithDots } from 'src/utils'
import cx from 'classnames'
import { Box, Link, Image } from '@chakra-ui/react'
import { IPaginations, IPaginationOption } from 'src/utils/Module'
import styles from './Paginations.module.css'

const Paginations: React.FC<IPaginations> = ({ paging, onSubmit }) => {
  const { count = 0, pages = 0, items_per_page = 0, current_page = 0, next_page = 0 } = paging

  const initialPaging: IPaginationOption = {
    count,
    pages,
    current_page,
    items_per_page,
    next_page
  }

  const [state, setState] = useState(initialPaging)

  useEffect(() => {
    setState((prevState) => ({ ...prevState, ...paging }))
  }, [paging])

  const goTo = (pageNum: any, e: any) => {
    e.preventDefault()
    if (pageNum < 0 || pageNum > state.pages) return

    setState((prevState) => ({ ...prevState, current_page: Number(pageNum) }))
    onSubmit(Number(pageNum), state?.items_per_page)
  }
  const renderListPaginations = paginationWithDots(state?.current_page, state.pages)?.map((item, i) => {
    return (
      <li
        aria-hidden='true'
        key={`${item}+${i}`}
        onClick={(e) => goTo(item, e)}
        className={cx(
          styles.list,
          ([item].includes(state.current_page) || item === '...') && styles.disabled,
          item === '...' && styles.spacer,
          state.current_page === item && styles['is-active']
        )}
      >
        <Link href='/' className={styles.link}>
          {item === '...' ? item : Number(item) + 1}
        </Link>
      </li>
    )
  })

  return (
    <>
      <Box className={styles.paginations}>
        <div className={styles.paginations__pages}>
          <div className={cx(styles.pages, Number(state.pages) >= 1000 && styles.larger)}>
            <ul className={styles.ul}>
              {state?.current_page >= 1 && (
                <>
                  <li
                    className={cx(
                      styles['btn-back'],
                      styles['--to-begin'],
                      state?.current_page === 1 && styles['disable-events']
                    )}
                    onClick={(e) => goTo(1, e)}
                    aria-hidden='true'
                  >
                    <Image src='/icons/pagination-go-first.svg' alt='Back to begin' />
                  </li>
                  <li
                    className={cx(styles['btn-prev'], state?.current_page === 1 && styles['disable-events'])}
                    onClick={(e) => goTo(state.current_page - 1, e)}
                    aria-hidden='true'
                  >
                    <Image src='/icons/pagination-prev.svg' alt='Previous' />
                  </li>
                </>
              )}
              {renderListPaginations}
              {state?.current_page <= state?.pages && (
                <>
                  <li
                    className={cx(styles['btn-next'], state?.current_page === state?.pages && styles['disable-events'])}
                    onClick={(e) => goTo(state?.current_page + 1, e)}
                    aria-hidden='true'
                  >
                    <Image src='/icons/pagination-prev.svg' alt='Next' />
                  </li>
                  <li
                    className={cx(
                      styles['btn-back'],
                      styles['--to-end'],
                      state?.current_page === state?.pages && styles['disable-events']
                    )}
                    onClick={(e) => goTo(state?.pages, e)}
                    aria-hidden='true'
                  >
                    <Image src='/icons/pagination-go-first.svg' alt='Next to Last' />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </Box>
    </>
  )
}

export default React.memo(Paginations)
