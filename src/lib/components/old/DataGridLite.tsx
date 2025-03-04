// import { DataGrid, GridColDef, GridFilterModel, GridRowCount, GridSortModel } from "@mui/x-data-grid"
// import { SetStateAction } from "react"

// type TableProps = {
//   columns: GridColDef[]
//   queryOptions: {
//     sortModel: GridSortModel
//     filterModel: GridFilterModel
//     paginationModel: {
//       page: number
//       pageSize: number
//     }
//     total
//     setSortModel: React.Dispatch<React.SetStateAction<GridSortModel>>
//   }
// }


// const DataGridLite: React.FC<TableProps> = ({ columns, queryOptions: { sortModel, filterModel, paginationModel, total } }) => {

//   return (
//     <DataGrid
//       rowCount={total}
//       loading={loading}
//       rows={rows}
//       columns={columns}
//       paginationModel={paginationModel}
//       sortModel={sortModel}
//       filterModel={filterModel}
//       paginationMode="server"
//       sortingMode="server"
//       filterMode="server"
//       onPaginationModelChange={setPaginationModel}
//       onSortModelChange={setSortModel}
//       onFilterModelChange={setFilterModel}
//       pageSizeOptions={[2, 5, 10, 25, { value: -1, label: 'All' }]} />
//   )
// }


// export default DataGridLite
