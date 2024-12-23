import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError, take } from 'rxjs/operators';
import { UserService } from '@app/services/account-services/user.service';
import { User } from '@app/models/User';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: UserService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let currentUser: User;

    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      currentUser = user;

      if (currentUser) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
      }
    });

    return next.handle(request).pipe(
      catchError((error) => {
        if (error) {
          localStorage.removeItem('user');
        }
        return throwError(error);
      })
    );
  }
}
