import { useState } from 'react'

export interface PaginatedData<T> {
  data: T[]
  nextCursor: string | null
  hasMore: boolean
}

interface UsePaginationOptions<T> {
  initialData: T[]
  initialNextCursor: string | null
  initialHasMore: boolean
  pageSize?: number
  fetchPage: (pageSize: number, cursor?: string) => Promise<{ success: true } & PaginatedData<T> | { success: false; error: string }>
  onPageChange?: (newData: T[]) => void // optional callback e.g. to reset statuses
}

export function usePagination<T>({
  initialData,
  initialNextCursor,
  initialHasMore,
  pageSize = 5,
  fetchPage,
  onPageChange,
}: UsePaginationOptions<T>) {
  const [data, setData] = useState<T[]>(initialData)
  const [cursorHistory, setCursorHistory] = useState<(string | null)[]>([null])
  const [currentPage, setCurrentPage] = useState(0)
  const [nextCursor, setNextCursor] = useState<string | null>(initialNextCursor)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [loading, setLoading] = useState(false)

  const applyPage = (newData: T[]) => {
    setData(newData)
    onPageChange?.(newData)
  }

  const handleNext = async () => {
    if (!nextCursor || loading) return
    setLoading(true)
    const response = await fetchPage(pageSize, nextCursor)
    if (response.success) {
      applyPage(response.data)
      const newPage = currentPage + 1
      setCurrentPage(newPage)
      setCursorHistory(prev => {
        const updated = [...prev]
        updated[newPage] = nextCursor
        return updated
      })
      setNextCursor(response.nextCursor)
      setHasMore(response.hasMore)
    }
    setLoading(false)
  }

  const handlePrevious = async () => {
    if (currentPage === 0 || loading) return
    setLoading(true)
    const prevPage = currentPage - 1
    const prevCursor = cursorHistory[prevPage] ?? undefined
    const response = await fetchPage(pageSize, prevCursor)
    if (response.success) {
      applyPage(response.data)
      setCurrentPage(prevPage)
      setNextCursor(cursorHistory[currentPage])
      setHasMore(true)
    }
    setLoading(false)
  }

  return {
    data,
    currentPage,
    hasMore,
    loading,
    handleNext,
    handlePrevious,
  }
}