import { CategoriaModel } from "@/lib/model/categoriaModel"
import { MovimentacaoModel } from "@/lib/model/movimentacaoModel"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(categorias)
}

// Exemplo de dados
const movimentacao1: MovimentacaoModel = {
  data: new Date('2023-01-10T08:00:00Z'),
  descricao: 'Compra de supermercado',
  valor: 150.00
}



const categorias: CategoriaModel[] = [
  {
    dataCriacao: new Date('2023-01-01T10:00:00Z'),
    dataModificacao: new Date('2023-01-15T12:00:00Z'),
    id: 'e1b4e2d6-f85c-4c3c-b57f-8f7b7d6f8d7a',
    nome: 'Alimentação',
    movimentacoes: [
      {
        data: new Date('2023-01-10T08:00:00Z'),
        descricao: 'Compra de supermercado',
        valor: 150.00
      }
    ]
  },
  {
    dataCriacao: new Date('2023-02-01T14:00:00Z'),
    dataModificacao: new Date('2023-02-20T18:00:00Z'),
    id: 'c3f5e4d8-ef6c-4e0c-b7c7-e8d8c8b9d9c1',
    nome: 'Transporte',
    movimentacoes: [
      {
        data: new Date('2023-02-05T09:00:00Z'),
        descricao: 'Combustível',
        valor: 200.00
      }
    ]
  },
  {
    dataCriacao: new Date('2023-03-01T10:00:00Z'),
    id: 'a2e5f7c8-d4e3-4f6c-b8c9-a7c8b9d9e9d1',
    nome: 'Lazer',
    movimentacoes: [
      {
        data: new Date('2023-03-10T11:00:00Z'),
        descricao: 'Cinema',
        valor: 75.00
      }
    ]
  }
]