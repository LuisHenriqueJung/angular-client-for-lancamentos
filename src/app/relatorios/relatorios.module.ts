import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatoriosLancamentosComponent } from './relatorios-lancamentos/relatorios-lancamentos.component';
import {  CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [
    RelatoriosLancamentosComponent
  ],
  imports: [
    CalendarModule,
    FormsModule,
    CommonModule,
    SharedModule,
    RelatoriosRoutingModule
  ]
})
export class RelatoriosModule { }
