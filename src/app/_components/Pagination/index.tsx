'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import S from './styles.module.scss'

interface PaginationProps {
  totalPages: number
}

export const Pagination = ({ totalPages }: PaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const searchPage = Number(searchParams.get('page'))
  const pageInitial = searchPage ? searchPage : 1
  const [currentPage, setPage] = useState(pageInitial)

  const limitPages = 500
  const realTotalPage = totalPages <= limitPages ? totalPages : limitPages
  const pagesList = new Array(realTotalPage >= 5 ? 5 : realTotalPage).fill(null).map((_, i) => i + 1)

  useEffect(() => {
    if (pageInitial > realTotalPage) {
      router.push(`?page=${realTotalPage}`)
      setPage(realTotalPage)
    }

    if (!pageInitial) setPage(1)
  }, [pageInitial, realTotalPage, router])

  const pagination = pagesList.map((page) => {
    if (currentPage > limitPages) return page
    if (currentPage <= 3) return page
    if (currentPage - 2 + pagesList.length > realTotalPage) return page + realTotalPage - pagesList.length
    return currentPage + page - 3
  })

  const newPage = (page: number) => {
    document.querySelector('#content')?.scrollTo({ top: -1, behavior: 'smooth' })
    setPage(page)
    setTimeout(() => router.push(`?page=${page}`), 200)
  }

  const handleSelectPage = (page: number) => {
    if (currentPage === page) return
    newPage(page)
  }

  const handlePrevPage = () => {
    if (currentPage === 1) return
    newPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage === realTotalPage) return
    newPage(currentPage + 1)
  }

  return (
    <>
      {realTotalPage !== 1 && (
        <div className={S.container}>
          {currentPage !== 1 && <IoIosArrowBack className={S.arrow} size={20} onClick={handlePrevPage} />}

          {pagination.map((page) => {
            const active = page === currentPage

            return (
              <button key={`page-${page}`} className={[S.page, active ? S.active : ''].join(' ')} onClick={() => handleSelectPage(page)}>
                {page}
              </button>
            )
          })}

          {currentPage !== realTotalPage && <IoIosArrowForward className={S.arrow} size={20} onClick={handleNextPage} />}
        </div>
      )}
    </>
  )
}
