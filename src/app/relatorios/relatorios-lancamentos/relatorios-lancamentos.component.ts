import { Component } from '@angular/core';
import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorios-lancamentos',
  templateUrl: './relatorios-lancamentos.component.html',
  styleUrls: ['./relatorios-lancamentos.component.css']
})
export class RelatoriosLancamentosComponent {
  constructor(
    private relatorioService: RelatoriosService
  ){}

  periodoInicio?: Date
  periodoFim?: Date
  gerar(){
    this.relatorioService.gerarRelatoriosLancamentos(this.periodoInicio!,this.periodoFim!).then((res: any) => {

      const url = window.URL.createObjectURL(res)

      window.open(url)

      })

  }
}
