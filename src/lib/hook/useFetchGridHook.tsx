import { useState, useEffect } from 'react'
import { CategoriaModel } from '../model/categoriaModel'
import { GridSortModel, GridFilterModel } from '@mui/x-data-grid'
import { getLocal } from '../utils/api-local'

const useFetchGridHook = <T,>(endpoint: string, queryOptions: QueryOptions): FetchGridResult<T> => {
  const [data, setData] = useState<T[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await getLocal(
        `${endpoint}?page=${queryOptions.page}&pageSize=${queryOptions.pageSize}`,
      )
      const result = await response.json()
      setData(result)
      setTotal(result.length || 5)
    } catch (err: unknown) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryOptions])

  // Função que pode ser chamada para forçar o refetch
  const refetch = () => {
    fetchData()
  }

  return { data, total, loading, error, refetch }
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
  error: Error | null, 
  refetch: () => void
}


export default useFetchGridHook