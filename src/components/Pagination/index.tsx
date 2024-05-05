'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import S from './styles.module.scss'

interface PaginationProps {
  totalPages: number
}

export const Pagination = ({ totalPages }: PaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const searchQuery = searchParams.get('q')
  const searchPage = Number(searchParams.get('page'))
  const pageInitial = searchPage ? searchPage : 1
  const [currentPage, setPage] = useState(pageInitial)

  const limitPages = 500
  const realTotalPage = totalPages <= limitPages ? totalPages : limitPages
  const pagesList = useMemo(() => new Array(realTotalPage >= 5 ? 5 : realTotalPage).fill(null).map((_, i) => i + 1), [realTotalPage])

  useEffect(() => {
    if (pageInitial > realTotalPage) {
      router.push(searchQuery ? `search?q=${searchQuery}&page=${realTotalPage}` : `?page=${realTotalPage}`)
      setPage(realTotalPage)
    }

    if (!searchPage) setPage(1)
  }, [pageInitial, realTotalPage, router, searchPage, searchQuery])

  const pagination = useMemo(() => {
    return pagesList.map((page) => {
      if (currentPage > limitPages) return page
      if (currentPage <= 3) return page
      if (currentPage - 2 + pagesList.length > realTotalPage) return page + realTotalPage - pagesList.length
      return currentPage + page - 3
    })
  }, [currentPage, pagesList, realTotalPage])

  const newPage = (page: number) => {
    document.querySelector('#content')?.scrollTo({ top: -1, behavior: 'smooth' })
    setPage(page)
    setTimeout(() => router.push(searchQuery ? `search?q=${searchQuery}&page=${page}` : `?page=${page}`), 200)
  }

  const handleSelectPage = (page: number) => {
    if (currentPage === page) return
    newPage(page)
  }

  const handlePrevPage = () => newPage(currentPage - 1)

  const handleNextPage = () => newPage(currentPage + 1)

  return (
    <>
      {realTotalPage > 1 && (
        <div data-testid="pagination" className={S.container}>
          {currentPage !== 1 && (
            <IoIosArrowBack data-testid="pagination-button-prev" className={S.arrow} size={20} onClick={handlePrevPage} />
          )}

          {pagination.map((page) => {
            const active = page === currentPage

            return (
              <button
                data-testid={`pagination-button-${page}`}
                key={`page-${page}`}
                className={[S.page, active ? S.active : ''].join(' ')}
                onClick={() => handleSelectPage(page)}
              >
                {page}
              </button>
            )
          })}

          {currentPage !== realTotalPage && (
            <IoIosArrowForward data-testid="pagination-button-next" className={S.arrow} size={20} onClick={handleNextPage} />
          )}
        </div>
      )}
    </>
  )
}
