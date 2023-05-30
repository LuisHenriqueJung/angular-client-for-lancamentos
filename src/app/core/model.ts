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
  contatos = new Array<Contato>
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
export class Contato{
  constructor(
    codigo?: number,
    nome?: string,
    email?: string,
    telefone?: string
  ){
    this.codigo = codigo;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
  }

  codigo? : number
  nome?: string
  email?: string
  telefone?: string
}
