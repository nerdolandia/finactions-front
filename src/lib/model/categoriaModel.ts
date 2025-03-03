import { MovimentacaoModel } from "./movimentacaoModel"

export interface CategoriaModel {
  dataCriacao: Date
  dataModificacao?: Date
  id: string
  nome: string
  movimentacoes: MovimentacaoModel[]
}
