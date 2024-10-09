import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceitasComponent } from './Components/receitas/receitas.component';
import { DespesasComponent } from './Components/despesas/despesas.component';
import { ContatoComponent } from './Components/contato/contato.component';
import { PerfilComponent } from './Components/perfil/perfil.component';
import { ResultadoComponent } from './Components/resultado/resultado.component';
import { ReceitaDetalheComponent } from './Components/receitas/receita-detalhe/receita-detalhe.component';
import { ReceitaListaComponent } from './Components/receitas/receita-lista/receita-lista.component';

const routes: Routes = [
  { path: 'receitas', redirectTo: 'receitas/lista' },
  {
    path: 'receitas',
    component: ReceitasComponent,
    children: [
      { path: 'detalhe/:id', component: ReceitaDetalheComponent },
      { path: 'lista', component: ReceitaListaComponent },
      { path: 'novo', component: ReceitaDetalheComponent },
    ],
  },
  {
    path: 'despesas',
    component: DespesasComponent,
  },
  {
    path: 'resultados',
    component: ResultadoComponent,
  },
  {
    path: 'contato',
    component: ContatoComponent,
  },
  {
    path: 'perfil',
    component: PerfilComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
