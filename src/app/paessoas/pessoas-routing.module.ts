import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PesquisaPessoasComponentComponent } from './pesquisa-pessoas-component/pesquisa-pessoas-component.component';
import { CadatroPessoaComponentComponent } from './cadatro-pessoa-component/cadatro-pessoa-component.component';
import { PaginaNaoEncontrataComponent } from '../core/pagina-nao-encontrata.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [

  { path: 'pessoas' , component: PesquisaPessoasComponentComponent, canActivate: [AuthGuard],data: {roles: ['ROLE_PESQUISAR_PESSOA']}},
  { path: 'pessoas/novo' , component: CadatroPessoaComponentComponent, canActivate: [AuthGuard],data: {roles: ['ROLE_CADASTRAR_PESSOA']}},
  { path: 'pessoas/:codigo' , component: CadatroPessoaComponentComponent, canActivate: [AuthGuard],data: {roles: ['ROLE_CADASTRAR_PESSOA']}},
  { path: 'pagina-nao-encontrada' , component: PaginaNaoEncontrataComponent,},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class PessoasRoutingModule { }
