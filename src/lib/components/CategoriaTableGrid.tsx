// components/CategoriaTable.tsx
import * as React from 'react'
import { DataGrid, GridActionsCellItem, GridColDef, GridFilterModel, GridSortModel } from '@mui/x-data-grid'
import { Typography, Box, Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { CategoriaModel } from '../model/categoriaModel'
import useFetchGridHook from '../hook/useFetchGridHook'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import { useRouter } from 'next/navigation'
import { getLocal, postLocal } from '../utils/api-local'

type CategoriaTableProps = {
  categorias: CategoriaModel[]
}

const CategoriaTableGrid = () => {
  const router = useRouter()
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 2,
  })
  const [sortModel, setSortModel] = React.useState<GridSortModel>([])
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [],
  })
  const queryOptions = React.useMemo(
    () => ({ ...paginationModel, sortModel, filterModel }),
    [paginationModel, sortModel, filterModel],
  )


  const { data: categorias, total: totalCategorias, loading, error } = useFetchGridHook<CategoriaModel>('/mock/categoria', queryOptions)




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
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => { router.push('/categoria/editar/' + id) }}
            color="inherit"
            key="edit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleClickOpen(id as number)}
            color="inherit"
            key="delete"
          />,
        ]
      },
    },
  ]


  // Estado para controlar o modal e guardar o ID da categoria a ser deletada
  const [alertOpen, setAlertOpen] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState<number | null>(null)

  // Função para abrir o modal recebendo o ID do item
  const handleClickOpen = (id: number) => {
    setSelectedId(id)
    setAlertOpen(true)
  }

  // Função para fechar o modal
  const handleClose = () => {
    setAlertOpen(false)
  }

  // Função chamada ao confirmar a deleção
  const handleDelete = () => {
    if (selectedId !== null) {
      // Aqui você faz a chamada para deletar o item
      getLocal('/mock/categorias/deletar/' + selectedId)
    }
    setAlertOpen(false)
  }


  return (
    <>
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
        pageSizeOptions={[2, 5, 10, 25, { value: -1, label: 'All' }]} />
      {/* Componente Dialog para confirmação de deleção */}
      <Dialog
        open={alertOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirma a exclusão?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja excluir este registro? Essa ação não poderá
            ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CategoriaTableGrid