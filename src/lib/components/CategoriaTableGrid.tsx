// components/CategoriaTable.tsx
import * as React from 'react'
import { DataGrid, GridColDef, GridFilterModel, GridSortModel } from '@mui/x-data-grid'
import { Typography, Box } from '@mui/material'
import { CategoriaModel } from '../model/categoriaModel'
import useFetchGrid from '../hook/useFetchGrid'

type CategoriaTableProps = {
  categorias: CategoriaModel[]
}

const CategoriaTableGrid = () => {
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 2,
  })
  const [sortModel, setSortModel] = React.useState<GridSortModel>([])
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [],
  });
  const queryOptions = React.useMemo(
    () => ({ ...paginationModel, sortModel, filterModel }),
    [paginationModel, sortModel, filterModel],
  );


  const { data: categorias, total: totalCategorias, loading, error } = useFetchGrid<CategoriaModel>('/api/mock/categoria',queryOptions)




  const rows = categorias.map((categoria, index) => ({
    id: index,
    nome: categoria.nome,
    dataCriacao: new Date(categoria.dataCriacao).toLocaleDateString(),
    dataModificacao: categoria.dataModificacao ? new Date(categoria.dataModificacao).toLocaleDateString() : 'N/A',
    movimentacoes: categoria.movimentacoes.map((movimentacao) => `${movimentacao.descricao} - ${movimentacao.valor.toFixed(2)} BRL`).join(', '),
  }))

  const columns: GridColDef[] = [
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'dataCriacao', headerName: 'Data de Criação', flex: 1 },
    { field: 'dataModificacao', headerName: 'Data de Modificação', flex: 1 },
    { field: 'movimentacoes', headerName: 'Movimentações', flex: 2 },
  ]

  return (
    <Box maxHeight={100}>
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Categorias
      </Typography>
      <DataGrid
        rowCount={totalCategorias}
        loading={loading}
        rows={rows}
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
        pageSizeOptions={[2,5, 10, 25, { value: -1, label: 'All' }]} />
    </Box>
  )
}

export default CategoriaTableGrid




