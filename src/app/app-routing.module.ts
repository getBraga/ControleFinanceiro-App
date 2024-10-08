import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceitasComponent } from './Components/receitas/receitas.component';
import { DespesasComponent } from './Components/despesas/despesas.component';
import { ContatoComponent } from './Components/contato/contato.component';
import { PerfilComponent } from './Components/perfil/perfil.component';
import { ResultadoComponent } from './Components/resultado/resultado.component';

const routes: Routes = [
  {
    path: 'receitas',
    component: ReceitasComponent,
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
