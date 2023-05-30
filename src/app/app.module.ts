import { NgModule, LOCALE_ID, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule} from 'primeng/toast'
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { CoreModule,  } from './core/core.module';
import { LancamentosService } from './lancamentos/lancamentos.service';
import { CategoriasService } from './categorias/categorias.service';
import { PessoasRoutingModule } from './paessoas/pessoas-routing.module';
import { LancamentosRoutingModule } from './lancamentos/lancamentos-routing.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './paessoas/pessoas.module';
import { MoneyHttpInterceptor } from './seguranca/money-http-interceptor';
import { RelatoriosService } from './relatorios/relatorios.service';



registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [

    HttpClientModule,
    BrowserModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TabViewModule,
    TooltipModule,
    SelectButtonModule,
    BrowserAnimationsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CoreModule,
    ToastModule,
    ConfirmDialogModule,
    AppRoutingModule,
    SegurancaModule,
    LancamentosModule,
    PessoasModule
  ],
  providers:
  [
    LancamentosService,
    RelatoriosService,
    MessageService,
    ConfirmationService,
    CategoriasService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
   { provide: HTTP_INTERCEPTORS,
    useClass: MoneyHttpInterceptor,
    multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
