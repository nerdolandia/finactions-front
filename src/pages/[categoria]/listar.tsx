import { CategoriaModel } from "@/lib/model/categoriaModel"
import { Container } from "@mui/material"
import { getLocal } from "@/lib/utils/api-local"
import { useCallback, useEffect, useState } from "react"
import CategoriaTable from "@/lib/components/CategoriaTable"
import CategoriaTableGrid from "@/lib/components/CategoriaTableGrid"
import { DataGrid, GridSortModel } from "@mui/x-data-grid"

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<CategoriaModel[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLocal('/api/mock/categoria')
        const data = await response.json()
        setCategorias(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, []) //

  return (

    <Container maxWidth="lg">
      <CategoriaTableGrid  />
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