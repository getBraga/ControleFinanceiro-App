import { Empresa } from "./Empresa"

export interface Receita {
  id:number
  nome:string
  data?:Date
  numeroParcelas:number
  valor:number
  descricao:string
  instituicaoFinanceira:string
  dataVenc?:Date
  empresaId?:number
  empresa?:Empresa
  userId:number
}
