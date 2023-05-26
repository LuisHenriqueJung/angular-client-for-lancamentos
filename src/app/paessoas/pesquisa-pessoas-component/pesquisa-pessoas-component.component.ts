import { ConfirmEventType, ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaFilter, PessoasService } from '../pessoas.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pesquisa-pessoas-component',
  templateUrl: './pesquisa-pessoas-component.component.html',
  styleUrls: ['./pesquisa-pessoas-component.component.css']
})
export class PesquisaPessoasComponentComponent implements OnInit{
 pessoas = []

 filtro = new PessoaFilter()
 totalRegistros = 0;
 @ViewChild('tabelaPessoas') tabelaPessoas: any

 constructor
  (
    private pessoaService: PessoasService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,

  ){}

  pesquisar(pagina = 0){
    this.filtro.page = pagina;
    this.pessoaService.pesquisar(this.filtro).then((response: any) =>
    {
      this.pessoas = response.pessoas;
      this.totalRegistros = response.totalRegistros
    })

  }
  onPageChange(evento: LazyLoadEvent){
    const pagina = evento.first! / evento.rows!
    this.pesquisar(pagina);
  }
  confirmarExclusao( codigo: number){
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir esse registro?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      header: 'Confirmar exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.excluir(codigo)

      },
      reject: (type: any) => {
        switch(type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'info', summary: 'Rejeitado', detail: 'O registro será mantido' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'O registro será mantido' });
            break;
        }
      }

    })
  }
  excluir (codigo:any) {
    this.pessoaService.excluir(codigo).then(()=> {
      this.tabelaPessoas.first = 0;
      this.messageService.add({ severity: 'success', summary: 'Excluído', detail: 'O registro foi excluído com sucesso!' });
      this.pesquisar()
    }).catch(error => this.errorHandler.handle(error))
  }
  alterarStatus(pessoa: any ){
    this.pessoaService.statusChange(pessoa).then(()=>{
      const acao = pessoa.ativo ? 'desativada' : 'ativada'
      this.messageService.add({severity: 'success',detail: `Pessoa ${acao} com sucesso!`})
      this.pesquisar()
    }).catch((error) => this.errorHandler.handle(error))
  }


  ngOnInit(): void {

  }
}
