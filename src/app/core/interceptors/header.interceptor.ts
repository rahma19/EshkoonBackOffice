import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpUserEvent,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
//  import 'rxjs/add/operator/do';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { catchError, switchMap, tap, throwError } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class HeaderInterceptor implements HttpInterceptor {
  constructor(
    // private toastr : ToastrService,
    private router: Router,
    private injector: Injector,
    private authService: AuthService
  ) {}
  isRefreshing = false;
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let loginService = this.injector.get(AuthService);

    request = request.clone({
      setHeaders: {
        Authorization: `${localStorage.getItem('accessToken')}`,
      },
    });

   return next.handle(request).pipe(
      tap({
        next: (event: any) => {
          return event;
        },
        error: (error: any) => {
          if (error.status === 400) {
            // alert('enter valid data!')
          }
          if (error.status === 401) {
            // localStorage.removeItem('accessToken')
            // localStorage.removeItem('user')
            this.handle401Error(request, next);
            // alert('Unauthorized access!')
          } else if (error.status === 404) {
            // alert('Page Not Found!')
          }
          // this.authenticationService.logout();
        },
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.authService.isLoggedIn()) {
        alert('fdvd');
        return this.authService.refreshTokens().pipe(
          switchMap(() => {
            // this.isRefreshing = false;

            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;

            if (error.status == '401') {
              
              // this.toastr.error('Vous navez pas le droit ');

              // this.eventBusService.emit(new EventData('logout', null));
            }

            return throwError(() => error);
          })
        );
      }
    }

    return next.handle(request);
  }
}
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
];
