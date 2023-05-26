import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { AppRoutingModule } from '../app-routing.module';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

export function tokenGetter():string {
  return localStorage.getItem('token')!;
}

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['http://localhost:8080/oauth/token']
      }
    }),
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    SegurancaRoutingModule,
    AppRoutingModule,
  ],providers: [JwtHelperService]

})
export class SegurancaModule { }
