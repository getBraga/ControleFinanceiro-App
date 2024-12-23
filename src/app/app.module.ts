import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

import { ReceitaService } from './services/receita-services/receita.service';
import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxCurrencyDirective } from 'ngx-currency';

import { NavComponent } from './shared/nav/nav.component';
import { TituloComponent } from './shared/titulo/titulo.component';

import { AppComponent } from './app.component';

import { ReceitasComponent } from './Components/receitas/receitas.component';
import { ReceitaDetalheComponent } from './Components/receitas/receita-detalhe/receita-detalhe.component';
import { ReceitaListaComponent } from './Components/receitas/receita-lista/receita-lista.component';

import { DespesasComponent } from './Components/despesas/despesas.component';
import { DespesaDetalheComponent } from './Components/despesas/despesa-detalhe/despesa-detalhe.component';
import { EmpresasComponent } from './Components/empresas/empresas.component';
import { EmpresaListaComponent } from './Components/empresas/empresa-lista/empresa-lista.component';
import { ContatoComponent } from './Components/contato/contato.component';

import { ResultadoComponent } from './Components/resultado/resultado.component';

import { UserComponent } from './Components/user/user.component';
import { LoginComponent } from './Components/user/login/login.component';
import { RegistrarUsuarioComponent } from './Components/user/registrar-usuario/registrar-usuario.component';
import { PerfilComponent } from './Components/user/perfil/perfil.component';
import { EmpresasDetalheComponent } from './Components/empresas/empresas-detalhe/empresas-detalhe.component';
import { UserService } from './services/account-services/user.service';
import { JwtInterceptor } from './interceptor/Jwt.Interceptor';
import { HomeComponent } from './Components/home/home.component';

defineLocale('pt-br', ptBrLocale);

@NgModule({
  declarations: [
    AppComponent,
    ReceitasComponent,
    DespesasComponent,
    EmpresasComponent,
    EmpresaListaComponent,
    EmpresasDetalheComponent,
    DateTimeFormatPipe,
    TituloComponent,
    NavComponent,
    ContatoComponent,
    PerfilComponent,
    ResultadoComponent,
    ReceitaDetalheComponent,
    DespesaDetalheComponent,
    ReceitaListaComponent,
    UserComponent,
    LoginComponent,
    RegistrarUsuarioComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxCurrencyDirective,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing',
    }),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    ReceitaService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
