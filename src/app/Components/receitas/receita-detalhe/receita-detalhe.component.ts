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
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
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
      adaptivePosition: true,
      containerClass: 'theme-default',
      dateInputFormat: 'dd/MM/yyyy hh:mm',
      showWeekNumbers: false,
    };
  }
  public carregarReceita(): void {
    const receitaIdParam = this.router.snapshot.paramMap.get('id');
    if (receitaIdParam !== null) {
      this.spinner.show();
      this.receitaService.getReceitaById(+receitaIdParam).subscribe({
        next: (receita) => {
          this.receita = { ...receita };
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
      numeroParcelas: ['', Validators.required],
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
