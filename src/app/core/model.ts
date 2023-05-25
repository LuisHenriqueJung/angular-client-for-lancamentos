export class Endereco{
  logradouro?: string
  numero?: string
  complemento?: string
  bairro?: string
  cep?: string
  cidade?: string
  estado?: string
}

export class Pessoa{
  nome:string | undefined
  ativo : boolean  | undefined
  codigo: number  | undefined
  endereco = new Endereco()
}
export class Categoria{
  nome?: string
}
export class Lancamento {
  codigo?: number
  descricao?: string
  dataVencimento?: Date
  dataPagamento?: Date
  valor?: number
  observacao?: string
  tipo? = 'RECEITA';
  pessoa: Pessoa =   new Pessoa();
  categoria = new Categoria();

}
