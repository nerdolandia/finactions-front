// components/CategoriaTable.tsx
import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material'
import { CategoriaModel } from '../model/categoriaModel'

type CategoriaTableProps = {
  categorias: CategoriaModel[]
}

const CategoriaTable: React.FC<CategoriaTableProps> = ({ categorias }) => {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Categorias
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Data de Criação</TableCell>
              <TableCell>Data de Modificação</TableCell>
              <TableCell>Movimentações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorias.map((categoria) => (
              <TableRow key={categoria.id}>
                <TableCell>{categoria.nome}</TableCell>
                <TableCell>
                  {new Date(categoria.dataCriacao).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {categoria.dataModificacao
                    ? new Date(categoria.dataModificacao).toLocaleDateString()
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  <ul>
                    {categoria.movimentacoes.map((movimentacao, index) => (
                      <li key={index}>
                        {movimentacao.descricao} - {movimentacao.valor.toFixed(2)} BRL
                      </li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default CategoriaTable
