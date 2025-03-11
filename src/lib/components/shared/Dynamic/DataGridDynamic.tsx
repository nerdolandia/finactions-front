import { GridSortModel, GridFilterModel, GridColDef, DataGrid } from "@mui/x-data-grid"
import React, { useMemo, useState } from "react"
import useFetchDataGridHook from "@/lib/hook/useFetchDataGridHook"
import { CircularProgress } from "@mui/material"
import { Box } from "@mui/system"

interface DataGridDynamicProps<T> {
  endpoint: string
  columns: GridColDef[]
  map: (data: T[]) => any[] // Use 'any[]' or specify a more precise type
  onRefetch: number
}

const DataGridDynamic = <T,>({ endpoint, columns, map, onRefetch}: DataGridDynamicProps<T>) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  })
  const [sortModel, setSortModel] = useState<GridSortModel>([])
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  })

  const queryOptions = useMemo(
    () => ({ ...paginationModel, sortModel, filterModel }),
    [paginationModel, sortModel, filterModel]
  )

  const { data, total, loading, error } = useFetchDataGridHook<T>(endpoint, queryOptions, onRefetch)

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      {error && <div>Error: {error.message}</div>}
      <DataGrid
        sx={{ color: "#fff", background: "green" }}
        rowCount={total}
        loading={loading}
        rows={map(data)}
        columns={columns}
        paginationModel={paginationModel}
        sortModel={sortModel}
        filterModel={filterModel}
        paginationMode="server"
        sortingMode="server"
        filterMode="server"
        onPaginationModelChange={setPaginationModel}
        onSortModelChange={setSortModel}
        onFilterModelChange={setFilterModel}
        pageSizeOptions={[2, 5, 10, 25, { value: -1, label: "All" }]}
      />
    </>
  )
}

export default DataGridDynamic





