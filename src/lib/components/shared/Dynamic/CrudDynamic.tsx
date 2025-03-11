import { CategoriaModel } from "@/lib/model/categoriaModel"
import DataGridDynamic from "./DataGridDynamic"
import { GridColDef, GridActionsCellItem } from "@mui/x-data-grid"
import router from "next/router"
import { useState } from "react"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

export default function CrudDynamic() {
  // Estado para controle do diálogo de deleção
  const [alertOpen, setAlertOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const [onRefetch, setOnRefetch] = useState<number>(0)

  const handleClickOpen = (id: number) => {

    console.log(onRefetch)
    setSelectedId(id)
    setAlertOpen(true)
    setOnRefetch((prev) => prev + 1)
  }

  const categoriasMap = (categorias: CategoriaModel[]) => categorias.map((categoria, index) => ({
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

  return (
    <DataGridDynamic<CategoriaModel>
      endpoint="/mock/categoria"
      columns={columns}
      map={categoriasMap}
      onRefetch={onRefetch}
    />
  )
} 