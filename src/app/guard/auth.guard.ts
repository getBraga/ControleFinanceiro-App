import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private toaster: ToastrService) {}

  canActivate(): boolean {
    if (JSON.parse(localStorage.getItem('user')!).token) return true;

    this.toaster.info('Usuário não autenticado!');
    this.router.navigate(['/user/login']);
    return false;
  }
}
