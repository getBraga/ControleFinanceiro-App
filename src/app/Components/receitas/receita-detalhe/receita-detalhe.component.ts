import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CSSValidator } from '@app/helpers/CSSValidator';
import { Receita } from '@app/models/Receita';
import { ReceitaService } from '@app/services/receita.service';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-receita-detalhe',
  templateUrl: './receita-detalhe.component.html',
  styleUrls: ['./receita-detalhe.component.css'],
})
export class ReceitaDetalheComponent implements OnInit {
  form: FormGroup;
  receita = {} as Receita;
  cssValidator = new CSSValidator();
  estadoSalvar = 'post';
  get f(): any {
    return this.form.controls;
  }
  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private receitaService: ReceitaService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.form = fb.group({});
    this.localeService.use('pt-br');
  }

  ngOnInit() {
    this.validation();
    this.carregarReceita();
  }
  cssValidatorReceita(form: FormControl): any {
    return this.cssValidator.cssValidator(form);
  }
  get bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY ',
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
    };
  }

  public carregarReceita(): void {
    const receitaIdParam = this.router.snapshot.paramMap.get('id');

    if (receitaIdParam !== null) {
      this.spinner.show();
      this.estadoSalvar = 'put';
      this.receitaService.getReceitaById(+receitaIdParam).subscribe({
        next: (receita) => {
          this.receita = { ...receita };
          if (this.receita.data) {
            this.receita.data = new Date(this.receita.data!);
          }
          this.form.patchValue(this.receita);

          window.localStorage.setItem(
            'date',
            JSON.stringify(this.receita.data)
          );
        },
        error: (error: any) => {
          this.spinner.hide();
          console.error(error);
        },
        complete: () => {
          this.spinner.hide();
        },
      });
    }
  }
  public salvarReceita(): void {
    this.spinner.show();
    if (this.form.valid) {
      const verbHttp = this.estadoSalvar === 'post' ? 'post' : 'put';
      this.receita =
        this.estadoSalvar === 'post'
          ? { ...this.form.value }
          : { id: this.receita.id, ...this.form.value };
      this.receita.instituicaoFinanceira = '';
      if (this.receita.empresa && +this.receita.empresa) {
        this.receita.empresaId = +this.receita.empresa;
      }

      this.receitaService[verbHttp](this.receita).subscribe({
        next: (result) => {
          this.toastr.success('Receita salva com sucesso', 'Sucesso');
        },
        error: (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Erro ao salvar a receita', 'Erro');
        },
        complete: () => {
          this.spinner.hide();
        },
      });
    }
    // var receita: Receita = {
    //   descricao: 'Teste',
    //   id: 0,
    //   nome: 'testando',
    //   instituicaoFinanceira: '',
    //   numeroParcelas: 0,
    //   userId: 1,
    //   valor: 234,
    //   data: new Date('10/10/2024'),
    //   dataVenc: new Date('10/10/2024'),
    //   empresaId: 1,
    // };

    // this.receitaService.postReceitas(receita).subscribe({
    //   next: (result) => {
    //     console.log('result', result);
    //   },
    // });
    // return receita;
  }
  public validation(): void {
    this.form = this.fb.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
      data: ['', Validators.required],
      numeroParcelas: [this.receita.numeroParcelas || 1, Validators.required],
      valor: ['', Validators.required],
      descricao: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(60),
        ],
      ],
      empresa: ['', Validators.required],
    });
  }
  public resetForm(): void {
    this.form.reset();
  }
}
