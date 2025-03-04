// components/CategoriaList.tsx
import * as React from 'react'
import Grid from '@mui/material/Grid2' // MUI v5 Grid2
import { Card, CardContent, Typography } from '@mui/material'
import { CategoriaModel } from '../model/categoriaModel'

type CategoriaListProps = {
  categorias: CategoriaModel[]
}

const CategoriaList: React.FC<CategoriaListProps> = ({ categorias }) => {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom >
        Lista de Categorias
      </Typography>
      < Grid container spacing={2} >
        {
          categorias.map((categoria) => (
            <Grid key={categoria.id} spacing={{ xs: 12, sm: 6, md: 4} }>
              <Card>
                <CardContent>
                  <Typography variant="h6" >
                    {categoria.nome}
                  </Typography>
                  < Typography variant="body2" >
                    Data de Criação: {new Date(categoria.dataCriacao).toLocaleDateString()}
                  </Typography>
                  {
                    categoria.dataModificacao && (
                      <Typography variant="body2">
                        Data de Modificação: {new Date(categoria.dataModificacao).toLocaleDateString()}
                      </Typography>
                    )
                  }
                  < Typography variant="body2" >
                    Movimentações:
                    <ul>
                      {
                        categoria.movimentacoes.map((movimentacao, index) => (
                          <li key={index} >
                            {movimentacao.descricao} - {movimentacao.valor.toFixed(2)} BRL
                          </li>
                        ))
                      }
                    </ul>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  )
}

export default CategoriaList
