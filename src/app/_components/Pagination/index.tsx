'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface PaginationProps {
  totalPages: number
}

export const Pagination = ({ totalPages }: PaginationProps) => {
  const searchParams = useSearchParams()
  const page1 = searchParams.get('page')

  const [page, setPage] = useState(Number(page1) ?? 1)

  useEffect(() => {
    if (!page1) setPage(1)
  }, [page1])

  const router = useRouter()

  const handlePagination = () => {
    setPage((prev) => prev + 1)
    router.push(`?page=${page + 1}`)
  }

  return <>{page < totalPages && <button onClick={handlePagination}>Ver mais</button>}</>
}
