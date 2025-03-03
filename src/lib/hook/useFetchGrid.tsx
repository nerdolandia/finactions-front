import { useState, useEffect } from 'react'
import { CategoriaModel } from '../model/categoriaModel'
import { GridSortModel, GridFilterModel } from '@mui/x-data-grid'

const useFetchGrid = <T,>(endpoint: string, queryOptions: QueryOptions): FetchGridResult<T> => {
  const [data, setData] = useState<T[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${endpoint}?page=${queryOptions.page}&pageSize=${queryOptions.pageSize}`)
        const result = await response.json()
        setData(result)
        setTotal(result.legth || 5)
      } catch (err: unknown) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }
debugger
    fetchData()
  }, [endpoint, queryOptions]);

  return { data, total, loading, error }
}


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


export default useFetchGrid