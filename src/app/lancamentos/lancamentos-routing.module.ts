import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PesquisaLancamentosComponent } from './pesquisa-lancamentos/pesquisa-lancamentos.component';
import { CadastroLancamentosComponentComponent } from './cadastro-lancamentos-component/cadastro-lancamentos-component.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [
  { path: 'lancamentos' , component: PesquisaLancamentosComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_PESQUISAR_LANCAMENTO']}},
  { path: 'lancamentos/novo' , component: CadastroLancamentosComponentComponent, canActivate: [AuthGuard],data: { roles: ['ROLE_CADASTRAR_LANCAMENTO']}},
  { path: 'lancamentos/:codigo' , component: CadastroLancamentosComponentComponent,canActivate: [AuthGuard],data: { roles: ['ROLE_CADASTRAR_LANCAMENTO']}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class LancamentosRoutingModule { }
