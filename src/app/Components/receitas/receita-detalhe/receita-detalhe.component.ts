import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-receita-detalhe',
  templateUrl: './receita-detalhe.component.html',
  styleUrls: ['./receita-detalhe.component.css'],
})
export class ReceitaDetalheComponent implements OnInit {
  form: FormGroup;
  fb: FormBuilder;
  get f(): any {
    return this.form.controls;
  }
  constructor(private _fb: FormBuilder) {
    this.fb = _fb;
    this.form = _fb.group({});
  }

  ngOnInit() {
    this.validation();
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
