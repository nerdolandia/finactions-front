// components/CategoriaTable.tsx
import * as React from 'react'
import { DataGrid, GridActionsCellItem, GridColDef, GridFilterModel, GridSortModel } from '@mui/x-data-grid'
import { Typography, Box, Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, Snackbar, Alert } from '@mui/material'
import { CategoriaModel } from '../model/categoriaModel'
import useFetchGridHook from '../hook/useFetchGridHook'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { useRouter } from 'next/navigation'
import { getLocal } from '../utils/api-local'

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

  // Agora extraímos também o `refetch` do hook
  const { data: categorias, total: totalCategorias, loading, error, refetch } =
    useFetchGridHook<CategoriaModel>('/mock/categoria', queryOptions)

  const rows = categorias.map((categoria, index) => ({
    id: index,
    nome: categoria.nome,
    dataCriacao: new Date(categoria.dataCriacao).toLocaleDateString(),
    dataModificacao: categoria.dataModificacao
      ? new Date(categoria.dataModificacao).toLocaleDateString()
      : 'N/A',
    movimentacoes: categoria.movimentacoes
      .map(
        (movimentacao) =>
          `${movimentacao.descricao} - ${movimentacao.valor.toFixed(2)} BRL`
      )
      .join(', '),
  }))

  // Estado para controle do diálogo de deleção
  const [alertOpen, setAlertOpen] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState<number | null>(null)

  // Estado para notificações
  const [notification, setNotification] = React.useState<{
    open: boolean
    message: string
    severity: 'success' | 'error' | 'info' | 'warning'
  }>({
    open: false,
    message: '',
    severity: 'success',
  })

  // Abre o diálogo e armazena o ID do registro a ser deletado.
  const handleClickOpen = (id: number) => {
    setSelectedId(id)
    setAlertOpen(true)
  }

  // Fecha o diálogo.
  const handleClose = () => {
    setAlertOpen(false)
  }

  // Função para tratar a deleção.
  const handleDelete = async () => {
    if (selectedId !== null) {
      try {
        const response = await getLocal('/mock/categorias/deletar/' + selectedId)
        if (response.status === 200 || response.ok) {
          setNotification({
            open: true,
            message: 'Registro excluído com sucesso!',
            severity: 'success',
          })
          // Chame o refetch para atualizar os dados após a deleção
        } else {
          setNotification({
            open: true,
            message: 'Falha ao excluir o registro!',
            severity: 'error',
          })
          refetch()
        }
      } catch (error) {
        console.error('Erro ao excluir registro:', error)
        setNotification({
          open: true,
          message: 'Erro ao excluir o registro!',
          severity: 'error',
        })
      }
    }
    setAlertOpen(false)
  }

  const handleNotificationClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') return

    setNotification({ ...notification, open: false })
  }

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
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => router.push('/categoria/editar/' + id)}
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
      ],
    },
  ]

  // Layout de _loading_ customizado caso a busca esteja em andamento.
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <DataGrid
        sx={{color:'#fff', background:'green'}}
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
        pageSizeOptions={[2, 5, 10, 25, { value: -1, label: 'All' }]}
        autoHeight
      />

      {/* Diálogo para confirmação de deleção */}
      <Dialog
        open={alertOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirma a exclusão?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja excluir este registro? Essa ação não poderá ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificações */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleNotificationClose} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default CategoriaTableGrid
