import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReceitasComponent } from './Components/receitas/receitas.component';
import { DespesasComponent } from './despesas/despesas.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ReceitaService } from './services/receita.service';
import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TituloComponent } from './shared/titulo/titulo.component';
@NgModule({
  declarations: [
    AppComponent,
    ReceitasComponent,
    DespesasComponent,
    EmpresasComponent,
    DateTimeFormatPipe,
    TituloComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
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
  providers: [provideHttpClient(), ReceitaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
