import { Component } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { User } from '@app/models/User';
import { UserService } from '@app/services/account-services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.scss',
})
export class RegistrarUsuarioComponent {
  public formRegistrar: FormGroup;
  user = {} as User;
  public get fR(): any {
    return this.formRegistrar.controls;
  }
  ngOnInit() {
    this.validationRegister();
  }
  constructor(
    private fRB: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toaster: ToastrService
  ) {
    this.formRegistrar = fRB.group({});
  }

  public validationRegister(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmPassword'),
    };
    this.formRegistrar = this.fRB.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(30),
          ],
        ],
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(10),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(10),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(30),
          ],
        ],
        confirmPassword: [
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
  registrar(): void {
    this.user = { ...this.formRegistrar.value };
    this.userService.registrar(this.user).subscribe({
      next: () => {
        this.router.navigateByUrl('');
      },
      error: (error) => {
        this.toaster.error(error);
      },
    });
  }
}
