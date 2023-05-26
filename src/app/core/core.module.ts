import { RouterModule } from '@angular/router';
import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NavbarComponentComponent } from './navbar-component/navbar-component.component';
import { ErrorHandlerService } from './error-handler.service';
import { PaginaNaoEncontrataComponent } from './pagina-nao-encontrata.component';
import { AuthService } from '../seguranca/auth.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';



@NgModule({
  declarations: [
    NavbarComponentComponent,
    PaginaNaoEncontrataComponent,
    NaoAutorizadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [
    DatePipe,
    {provide: LOCALE_ID, useValue: 'pt-BR' },
    ErrorHandlerService,
    AuthService
  ],
  exports: [
    NavbarComponentComponent
  ]
})
export class CoreModule { }
