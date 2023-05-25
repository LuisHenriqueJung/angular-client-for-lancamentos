import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PesquisaPessoasComponentComponent } from './pesquisa-pessoas-component/pesquisa-pessoas-component.component';
import { CadatroPessoaComponentComponent } from './cadatro-pessoa-component/cadatro-pessoa-component.component';
import { PaginaNaoEncontrataComponent } from '../core/pagina-nao-encontrata.component';


const routes: Routes = [

  { path: 'pessoas' , component: PesquisaPessoasComponentComponent},
  { path: 'pessoas/novo' , component: CadatroPessoaComponentComponent},
  { path: 'pessoas/:codigo' , component: CadatroPessoaComponentComponent},
  { path: 'pagina-nao-encontrada' , component: PaginaNaoEncontrataComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class PessoasRoutingModule { }
