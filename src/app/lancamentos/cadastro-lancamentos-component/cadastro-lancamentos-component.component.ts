import { HttpRequest } from '@angular/common/http';
import { LancamentosService } from './../lancamentos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
    private router: Router,
    private formBuilder: FormBuilder
  ){}
  stateOptions: any[] = [{label: 'Receita', value: 'RECEITA'}, {label: 'Despesa', value: 'DESPESA'}];

  vencimentos!: Date
  pagmtoRecebmtos!: Date
  categorias!: Categoria[]
  pessoas!: Pessoa[]
  codigoEditar!: number
  formulario!: FormGroup

  ngOnInit(): void {
    this.getPessoas()

     this.getCategorias()
     this.configurarFormulario()
    this.codigoEditar =  this.route.snapshot.params['codigo']
    if(this.codigoEditar){{
      this.getLancamento(this.codigoEditar)

    }
    }
  }

  configurarFormulario(){
    this.formulario = this.formBuilder.group({
      codigo: [],
      descricao: [null, [Validators.required, Validators.minLength(5)]],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      valor: [null, Validators.required],
      tipo: ['RECEITA'],
      pessoa: [null, Validators.required],
      observacao: [],
      categoria:  [null, Validators.required]
    })
  }

  getLancamento(codigo:number) {
    let offset = new Date().getTimezoneOffset() * 60000;
    this.lancamentoService.getLancamneto(codigo).then(r => {
      this.formulario.patchValue(r)
      if (this.formulario.get('dataPagamento')) {
        this.formulario.get('dataPagamento')?.setValue(new Date(new Date(this.formulario.get('dataPagamento')?.value).getTime() + offset));
      }
      if (this.formulario.get('dataVencimento')) {
        this.formulario.get('dataVencimento')?.setValue( new Date(new Date(this.formulario.get('dataVencimento')?.value).getTime() + offset));
      }
    }).catch((e)=> this.errorHandler.handle(e))
  }


  getPessoas(){
    this.pessoaService.listarTodas().then((retorno : any) => {
      this.pessoas = retorno
    }).catch((e) => this.errorHandler.handle(e))

  }
  getCategorias(){
    this.categoriaService.listarTodas().then((retorno : any) => this.categorias = retorno.map((c:any)=> {return {nome: c.nome , codigo:c.codigo }})).catch((e) => this.errorHandler.handle(e))
  }

  salvarlancamento(){
    if(this.editando){
      this.atualizaLancamento()
    }else {
      this.adicionarLancamento()
    }
  }
  adicionarLancamento(){
    this.lancamentoService.cadastrar(this.formulario.value).then(()=>{
      this.messageService.add({ severity: 'success', summary: 'Cadastro realizado', detail: 'O registro foi cadastrado com sucesso!' });
      this.formulario.reset()
    }).catch((e:any) => this.errorHandler.handle(e));
  }
  atualizaLancamento(){
    this.lancamentoService.atualizar(this.formulario.value).then((lancamento)=> {
    this.messageService.add({ severity: 'success', summary: 'Registro atualizado', detail: 'O registro foi atualizado com sucesso!' })
    this.formulario.setValue(lancamento)
    this.router.navigate(['/lancamentos'])

  }).catch((e)=> this.errorHandler.handle(e))
  }


  get editando(){
    return Boolean(this.formulario.get('codigo')?.value)
  }
}
