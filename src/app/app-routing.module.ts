import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNaoEncontrataComponent } from './core/pagina-nao-encontrata.component';
import { compileClassMetadata } from '@angular/compiler';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';


const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('../app/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'relatorio', loadChildren: () => import('../app/relatorios/relatorios.module').then(m => m.RelatoriosModule)},

  { path: '' , redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'pagina-nao-encontrada', component: PaginaNaoEncontrataComponent},
  {path:'nao-autorizado', component: NaoAutorizadoComponent},
  //{path: '**', redirectTo: 'pagina-nao-encontrada'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
