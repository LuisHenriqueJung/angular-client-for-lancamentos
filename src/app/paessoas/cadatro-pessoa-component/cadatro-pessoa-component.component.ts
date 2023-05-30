import { Component, OnInit } from '@angular/core';
import { PessoasService } from '../pessoas.service';
import { NgForm } from '@angular/forms';
import { Contato, Pessoa } from 'src/app/core/model';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({

  selector: 'app-cadatro-pessoa-component',
  templateUrl: './cadatro-pessoa-component.component.html',
  styleUrls: ['./cadatro-pessoa-component.component.css']
})
export class CadatroPessoaComponentComponent implements OnInit {

pessoa = new Pessoa()
exbindoFormularioContato = false
codigoEditar: number | undefined
contato?: Contato
contatoIndex?: number;

constructor
(
  private pessoaService: PessoasService,
  private messageService: MessageService,
  private errorHandler: ErrorHandlerService,
  private route: ActivatedRoute,
  private router: Router
){}
prepararEdicaoContato(contato: Contato, index: number){

      this.contato = this.clonarContato(contato);
      this.exbindoFormularioContato = true;
      this.contatoIndex = index;

  }
  confirmarContato(frm: NgForm) {
    this.pessoa.contatos[this.contatoIndex!] = this.clonarContato(this.contato!);
    this.exbindoFormularioContato = false;
    frm.reset();
  }
  excluirContato(index: number){
    this.pessoa.contatos.splice(index,1)
  }
  clonarContato(contato: Contato): Contato {
    return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
  }
  prepararNovoContato() {
    this.exbindoFormularioContato = true;
    this.contato = new Contato()
  }
  confirmarPessoa(){
    this.pessoa.contatos.push(this.contato!)
    this.exbindoFormularioContato = false;
  }
  ngOnInit(): void {
    this.codigoEditar = this.route.snapshot.params['codigo']
    if(this.codigoEditar)
      this.getPessoa(this.codigoEditar)
  }
  getPessoa(codigo: number){
    this.pessoaService.getPessoaById(codigo).then((p)=> {this.pessoa = p}).catch((e)=> this.errorHandler.handle(e))
  }
  salvar(form: NgForm){
    if(this.editando) {
      this.atualizarPessoa(form)
    }else {
      this.cadastrar(form)
    }
  }
  atualizarPessoa(form: NgForm) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.messageService.add({ severity: 'success', detail: 'Pessoa alterada com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

cadastrar(form: NgForm){


  this.pessoa.ativo = true
  console.log(this.pessoa)
  this.pessoaService.cadastrarPessoa(this.pessoa).then((response: any) =>
  {
    this.messageService.add({severity: "success",summary: "Registro salvo!",detail: `${this.pessoa.nome} salvo com sucesso!`})
    form.reset()
    this.pessoa = new Pessoa()
    this.router.navigate(['pessoas'])
  }).catch((e)=> {this.errorHandler.handle(e)})
}
get editando() {
  return Boolean(this.pessoa.codigo)
}
}
