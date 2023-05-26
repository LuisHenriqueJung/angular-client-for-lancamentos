import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNaoEncontrataComponent } from './core/pagina-nao-encontrata.component';
import { compileClassMetadata } from '@angular/compiler';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';


const routes: Routes = [
  { path: '' , redirectTo: 'lancamentos', pathMatch: 'full'},
  {path: 'pagina-nao-encontrada', component: PaginaNaoEncontrataComponent},
  {path:'nao-autorizado', component: NaoAutorizadoComponent},
  //{path: '**', redirectTo: 'pagina-nao-encontrada'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
