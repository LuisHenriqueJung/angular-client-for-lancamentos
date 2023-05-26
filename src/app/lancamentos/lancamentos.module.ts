import { TableModule } from "primeng/table";
import { AppRoutingModule } from "../app-routing.module";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TabViewModule } from "primeng/tabview";
import { TooltipModule } from "primeng/tooltip";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SelectButtonModule } from "primeng/selectbutton";
import { CalendarModule } from "primeng/calendar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CadastroLancamentosComponentComponent } from "./cadastro-lancamentos-component/cadastro-lancamentos-component.component";

import { PesquisaLancamentosComponent } from "./pesquisa-lancamentos/pesquisa-lancamentos.component";
import { LOCALE_ID, NgModule } from "@angular/core";
import localePt from '@angular/common/locales/pt';
import { DatePipe, registerLocaleData } from "@angular/common";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RouterModule } from "@angular/router";
import { LancamentosRoutingModule } from "./lancamentos-routing.module";
import { SharedModule } from "../shared/shared.module";

registerLocaleData(localePt);


@NgModule({

  imports: [
    TableModule,
    InputTextModule,
    TabViewModule,
    TooltipModule,
    AppRoutingModule,
    FormsModule,
    SelectButtonModule,
    BrowserAnimationsModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    InputMaskModule,
    ButtonModule,
    InputTextareaModule,
    LancamentosRoutingModule,
    ReactiveFormsModule,
    SharedModule

    ],
    declarations: [
      CadastroLancamentosComponentComponent,
      PesquisaLancamentosComponent,
    ],
    providers:[
      { provide: LOCALE_ID, useValue: 'pt-BR' },
      DatePipe
    ],


})

export class LancamentosModule { }
