import { Box, Container, Typography } from "@mui/material"
import CategoriaTableGrid from "@/lib/components/CategoriaTableGrid"
import { GridColDef } from "@mui/x-data-grid"
import { CategoriaModel } from "@/lib/model/categoriaModel"

export default function CategoriasPage() {



  const columns: GridColDef[] = [
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'dataCriacao', headerName: 'Data de Criação', flex: 1 },
    { field: 'dataModificacao', headerName: 'Data de Modificação', flex: 1 },
    { field: 'movimentacoes', headerName: 'Movimentações', flex: 2 },
  ]

  return (

    <Container maxWidth="lg">
      <Box maxHeight={100}>
        <Typography variant="h4" component="h1" gutterBottom>
          Lista de Categorias
        </Typography>
        <CategoriaTableGrid />
      </Box>
    </Container>
  )
}



// export default function ServerSortingGrid() {
//   const [queryOptions, setQueryOptions] = useState({})

//   const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
//     // Here you save the data you need from the sort model
//     setQueryOptions({ sortModel: [...sortModel] })
//   }, [])

//   const { isLoading, rows } =

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         {...data}
//         sortingMode="server"
//         onSortModelChange={handleSortModelChange}
//         loading={isLoading}
//       />
//     </div>
//   )
// }