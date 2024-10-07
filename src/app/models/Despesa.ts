import { Empresa } from "./Empresa"

export interface Despesa {
  id:number
  nome:string
  data?:Date
  numeroparcelas:number
  valor:number
  descricao:string
  instituicaofinanceira:string
  datavenc?:Date
  empresaid?:number
  empresa?:Empresa
  userid:number
}
