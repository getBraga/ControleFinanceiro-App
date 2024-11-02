import { Component, OnInit } from '@angular/core';
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
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  public formPerfil: FormGroup;
  public get fF(): any {
    return this.formPerfil.controls;
  }
  constructor(
    private fFB: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toaster: ToastrService
  ) {
    this.formPerfil = fFB.group({});
  }
  public validationPerfil(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmPassword'),
    };
    this.formPerfil = this.fFB.group(
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
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(12),
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
  ngOnInit() {
    this.validationPerfil();
  }
}
