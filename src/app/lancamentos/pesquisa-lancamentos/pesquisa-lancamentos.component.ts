import { LancamentoFiltro, LancamentosService } from './../lancamentos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmEventType, ConfirmationService, LazyLoadEvent, MessageService, PrimeNGConfig } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-pesquisa-lancamentos',
  templateUrl: './pesquisa-lancamentos.component.html',
  styleUrls: ['./pesquisa-lancamentos.component.css']
})
export class PesquisaLancamentosComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') tabela: any;
  constructor
  (
    private lancamentosService: LancamentosService,
    private messageService : MessageService,
    private confirmationService: ConfirmationService,
    private config: PrimeNGConfig,
    private erroHandler: ErrorHandlerService,
    private authService: AuthService
  ){}


  pesquisar(pagina = 0) {
    this.filtro.page = pagina
    this.lancamentosService.consultar(this.filtro).then( retorno =>
      {
        this.lancamentos = retorno.lancamentos
        this.totalRegistros = retorno.total

      }).catch(erro => this.erroHandler.handle(erro))
    this.filtro.descricao = '';

  }
  onPageChange(event: LazyLoadEvent){
    const pagina = event.first! / event.rows!;
    this.pesquisar(pagina);
  }
  confirmarExclusao(codigo: number){
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
            this.messageService.add({ severity: 'error', summary: 'Rejeitado', detail: 'O registro será mantido' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'O registro será mantido' });
            break;
        }
      }

    })
  }

  excluir(codigo: number){
    this.lancamentosService.excluir(codigo).then(()=>
    {
      this.tabela.first = 0
      this.pesquisar()
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Lancamento excluído com sucesso!' })
    }).catch(erro => this.erroHandler.handle(erro))
  }
  temPermissao(permissao: string){
    return this.authService.temPermissao(permissao)
}


  ngOnInit(): void {
    this.config.setTranslation({
      accept: 'Accept',
      reject: 'Cancel',
      "dayNames": ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      "dayNamesShort": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      "dayNamesMin": ["Do","Se","Te","Qa","Qi","Sx","Sa"],
      "monthNames": ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
      "monthNamesShort": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      "today": "Hoje",
      "weekHeader": "Sem"
  });
  }



}
