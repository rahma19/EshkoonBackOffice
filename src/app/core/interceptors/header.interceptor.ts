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

@Injectable({
  providedIn: 'root',
})
export class HeaderInterceptor implements HttpInterceptor {
  constructor(
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

    /*return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('auth/signin') &&
          error.status === 401
        ) {
          return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.storageService.isLoggedIn()) {
        return this.authService.refreshToken().pipe(
          switchMap(() => {
            this.isRefreshing = false;

            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;

            if (error.status == '403') {
              this.eventBusService.emit(new EventData('logout', null));
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
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];*/
    //    return next.handle(request)
    //     .pipe(
    //       (err) => {
    //         if (err instanceof HttpErrorResponse) {
    //           if (err.status === 401) {
    //             localStorage.removeItem('accessToken')
    //             localStorage.removeItem('accessToken')
    //             // redirect user to the logout page
    //           }
    //         }
    //         return err;
    //       }
    //     );
    //     }
    // }

    /*console.log(localStorage.getItem('accessToken'));

   request= request.clone({
     setHeaders:{
       Authorization: `${localStorage.getItem('accessToken')}`
     }

   })

   /*return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('auth/signin') &&
          error.status === 401
        ) {
          return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.storageService.isLoggedIn()) {
        return this.authService.refreshToken().pipe(
          switchMap(() => {
            this.isRefreshing = false;

            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;

            if (error.status == '403') {
              this.eventBusService.emit(new EventData('logout', null));
            }

            return throwError(() => error);
          })
        );
      }
    }

    return next.handle(request);
  }
}


  */ return next.handle(request).pipe(
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
            console.log('ffff');

            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;

            if (error.status == '403') {
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
