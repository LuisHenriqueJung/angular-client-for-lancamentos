import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PesquisaPessoasComponentComponent } from './pesquisa-pessoas-component/pesquisa-pessoas-component.component';
import {  CadatroPessoaComponentComponent } from './cadatro-pessoa-component/cadatro-pessoa-component.component';
import { NgModule ,LOCALE_ID,} from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { PessoasRoutingModule } from './pessoas-routing.module';

@NgModule({

  declarations: [
    PesquisaPessoasComponentComponent,
    CadatroPessoaComponentComponent,
  ],
  imports: [
    AppRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TabViewModule,
    TooltipModule,
    FormsModule,
    SelectButtonModule,
    CalendarModule,
    BrowserAnimationsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CommonModule,
   PessoasRoutingModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  exports: []


})
export class PessoasModule { }
