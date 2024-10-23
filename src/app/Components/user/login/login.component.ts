import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserLogin } from '@app/models/UserLogin';
import { UserService } from '@app/services/account-services/user.service';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  model = {} as UserLogin;
  /**
   *
   */
  constructor(
    private userSerice: UserService,
    private router: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {}

  login(): void {
    this.userSerice
      .login(this.model)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('');
        },
        error: (error) => {
          if (error.status) {
            this.toaster.error('Usuário ou senha invalido');
          }
        },
      })
      .add(() => this.spinner.hide());
  }
}
