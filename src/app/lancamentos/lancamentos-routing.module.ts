import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PesquisaLancamentosComponent } from './pesquisa-lancamentos/pesquisa-lancamentos.component';
import { CadastroLancamentosComponentComponent } from './cadastro-lancamentos-component/cadastro-lancamentos-component.component';


const routes: Routes = [
  { path: 'lancamentos' , component: PesquisaLancamentosComponent},
  { path: 'lancamentos/novo' , component: CadastroLancamentosComponentComponent},
  { path: 'lancamentos/:codigo' , component: CadastroLancamentosComponentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class LancamentosRoutingModule { }
