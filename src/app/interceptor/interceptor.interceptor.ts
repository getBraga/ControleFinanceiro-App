import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/User';
import { UserService } from '@app/services/account-services/user.service';
import { Observable, take } from 'rxjs';

@Injectable()
export class interceptorInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let currentUser: User = {} as User;
    this.userService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (currentUser = user));
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      console.log('oiiiiiiiiiii');
    }
    console.log('request', request);
    return next.handle(request);
  }
}
