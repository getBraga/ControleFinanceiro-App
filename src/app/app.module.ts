import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReceitasComponent } from './receitas/receitas.component';
import { DespesasComponent } from './despesas/despesas.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import {CollapseModule} from "ngx-bootstrap/collapse"



@NgModule({
  declarations: [
    AppComponent,
    ReceitasComponent,
    DespesasComponent,
    EmpresasComponent,

      NavComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),


  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
