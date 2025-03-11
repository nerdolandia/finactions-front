import { CategoriaModel } from "@/lib/model/categoriaModel"
import DataGridDynamic from "./DataGrid/DataGridDynamic"
import { GridColDef, GridActionsCellItem } from "@mui/x-data-grid"
import router from "next/router"
import { useState } from "react"

export default function CrudDynamic() {
  // Estado para controle do diálogo de deleção
  const [alertOpen, setAlertOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const [onRefetch, setOnRefetch] = useState<number>(0)

  const handleClickOpenEdit = (id: number) => {

    console.log(onRefetch)
    setSelectedId(id)
    setAlertOpen(true)
    setOnRefetch((prev) => prev + 1)
  }

  const handleClickOpenDelete = (id: number) => {

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
  ]

  return (
    <DataGridDynamic<CategoriaModel>
      endpoint="/mock/categoria"
      columns={columns}
      map={categoriasMap}
      onRefetch={onRefetch}
      onEdit={handleClickOpenEdit}
      onDelete={handleClickOpenDelete}
    />
  )
} 