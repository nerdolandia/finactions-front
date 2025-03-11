import { GridSortModel, GridFilterModel } from "@mui/x-data-grid"
import { useState, useCallback, useEffect } from "react"
import { getLocal } from "../utils/api-local"

type QueryOptions = {
  sortModel: GridSortModel
  filterModel: GridFilterModel
  page: number
  pageSize: number
}
type FetchGridResult<T> = {
  data: T[]
  total: number
  loading: boolean
  error: Error | null
}


const useFetchDataGridHook = <T,>(endpoint: string, queryOptions: QueryOptions, onRefetch: number): FetchGridResult<T> => {
  const [data, setData] = useState<T[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getLocal(
        `${endpoint}?page=${queryOptions.page}&pageSize=${queryOptions.pageSize}`
      )
      const result = await response.json()
      setData(result)
      setTotal(result.length || 0) // Adjusted to set total correctly
    } catch (err: unknown) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [endpoint, queryOptions])

  useEffect(() => {
    fetchData()
  }, [fetchData, onRefetch])

  return { data, total, loading, error }

}
export default useFetchDataGridHook