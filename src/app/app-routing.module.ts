import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DespesasComponent } from './Components/despesas/despesas.component';
import { ContatoComponent } from './Components/contato/contato.component';

import { ResultadoComponent } from './Components/resultado/resultado.component';

import { ReceitasComponent } from './Components/receitas/receitas.component';
import { ReceitaDetalheComponent } from './Components/receitas/receita-detalhe/receita-detalhe.component';
import { ReceitaListaComponent } from './Components/receitas/receita-lista/receita-lista.component';

import { UserComponent } from './Components/user/user.component';
import { LoginComponent } from './Components/user/login/login.component';
import { RegistrarUsuarioComponent } from './Components/user/registrar-usuario/registrar-usuario.component';
import { PerfilComponent } from './Components/user/perfil/perfil.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registrar',
        component: RegistrarUsuarioComponent,
      },
    ],
  },
  {
    path: 'user/perfil',
    component: PerfilComponent,
  },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
