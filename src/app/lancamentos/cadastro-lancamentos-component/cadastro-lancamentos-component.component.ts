import { LancamentosService } from './../lancamentos.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriasService } from 'src/app/categorias/categorias.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Categoria, Lancamento, Pessoa } from 'src/app/core/model';
import { PessoasService } from 'src/app/paessoas/pessoas.service';

@Component({
  selector: 'app-cadastro-lancamentos-component',
  templateUrl: './cadastro-lancamentos-component.component.html',
  styleUrls: ['./cadastro-lancamentos-component.component.css']
})
export class CadastroLancamentosComponentComponent implements OnInit{
  constructor
  (
    private categoriaService: CategoriasService,
    private pessoaService: PessoasService,
    private errorHandler: ErrorHandlerService,
    private lancamentoService: LancamentosService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ){}
  stateOptions: any[] = [{label: 'Receita', value: 'RECEITA'}, {label: 'Despesa', value: 'DESPESA'}];

  value: string = 'Receita';
  vencimentos: Date | undefined
  pagmtoRecebmtos: Date | undefined
  categorias!: Categoria[]
  pessoas!: Pessoa[]
  lancamento : Lancamento =  new Lancamento()
  codigoEditar: number | undefined

  ngOnInit() {
    this.getPessoas()
     this.getCategorias()
    this.codigoEditar =  this.route.snapshot.params['codigo']
    if(this.codigoEditar){
      this.getLancamento(this.codigoEditar)

    }
  }
  getLancamento(codigo:number) {
    let offset = new Date().getTimezoneOffset() * 60000;
    this.lancamentoService.getLancamneto(codigo).then(r => {
      this.lancamento = r

      if (this.lancamento.dataPagamento) {
        this.lancamento.dataPagamento = new Date(new Date(this.lancamento.dataPagamento).getTime() + offset);
      }
      if (this.lancamento.dataVencimento) {
        this.lancamento.dataVencimento = new Date(new Date(this.lancamento.dataVencimento).getTime() + offset);
      }
      console.log(this.lancamento)
    }).catch((e)=> this.errorHandler.handle(e))
  }


  getPessoas(){
    this.pessoaService.listarTodas().then((retorno : any) => {


      this.pessoas = retorno
      console.log(this.pessoas)
    }).catch((e) => this.errorHandler.handle(e))

  }
  getCategorias(){
    this.categoriaService.listarTodas().then((retorno : any) => this.categorias = retorno.map((c:any)=> {return {nome: c.nome , codigo:c.codigo }})).catch((e) => this.errorHandler.handle(e))
  }

  salvarlancamento(form: NgForm){
    if(this.editando){
      this.atualizaLancamento(form)
    }else {
      this.adicionarLancamento(form)
    }
  }
  adicionarLancamento(form: NgForm){
    this.lancamentoService.cadastrar(this.lancamento).then(()=>{
      this.messageService.add({ severity: 'success', summary: 'Cadastro realizado', detail: 'O registro foi cadastrado com sucesso!' });
      form.reset()
      this.lancamento = new Lancamento()
    }).catch((e:any) => this.errorHandler.handle(e));
  }
  atualizaLancamento(form: NgForm){
    console.log(this.lancamento)
    this.lancamentoService.atualizar(this.lancamento).then((lancamento)=> {
    this.messageService.add({ severity: 'success', summary: 'Registro atualizado', detail: 'O registro foi atualizado com sucesso!' })
    this.lancamento = lancamento
    this.router.navigate(['/lancamentos'])

  }).catch((e)=> this.errorHandler.handle(e))
  }


  get editando(){
    return Boolean(this.lancamento.codigo)
  }
}
