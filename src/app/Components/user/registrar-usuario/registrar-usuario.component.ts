import { Component } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.scss',
})
export class RegistrarUsuarioComponent {
  public formRegistrar: FormGroup;

  public get fR(): any {
    console.log(this.formRegistrar.controls);
    return this.formRegistrar.controls;
  }
  ngOnInit() {
    this.validationRegister();
  }
  constructor(private fRB: FormBuilder) {
    this.formRegistrar = fRB.group({});
  }

  public validationRegister(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha', 'confirmSenha'),
    };
    this.formRegistrar = this.fRB.group(
      {
        nome: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(30),
          ],
        ],
        primeiroNome: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(10),
          ],
        ],
        ultimoNome: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(10),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        senha: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(30),
          ],
        ],
        confirmSenha: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(30),
          ],
        ],
      },
      formOptions
    );
  }
}
