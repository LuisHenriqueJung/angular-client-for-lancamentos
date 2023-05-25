import { Component, OnInit } from '@angular/core';
import { PessoasService } from '../pessoas.service';
import { NgForm } from '@angular/forms';
import { Pessoa } from 'src/app/core/model';
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
codigoEditar: number | undefined


constructor
(
  private pessoaService: PessoasService,
  private messageService: MessageService,
  private errorHandler: ErrorHandlerService,
  private route: ActivatedRoute,
  private router: Router
){}

  ngOnInit(): void {
    this.codigoEditar = this.route.snapshot.params['codigo']
    if(this.codigoEditar)
      this.getPessoa(this.codigoEditar)
  }
  getPessoa(codigo: number){
    this.pessoaService.getPessoaById(codigo).then((p)=> {this.pessoa = p}).catch((e)=> this.errorHandler.handle(e))
  }

cadastrar(form: NgForm){
  this.pessoa.ativo = true
  this.pessoaService.cadastrarPessoa(this.pessoa).then((response: any) =>
  {
    this.messageService.add({severity: "success",summary: "Registro salvo!",detail: `${this.pessoa.nome} salvo com sucesso!`})
    form.reset()
    this.pessoa = new Pessoa()
    this.router.navigate(['pessoas'])
  }).catch((e)=> {this.errorHandler.handle(e)})
}
}
