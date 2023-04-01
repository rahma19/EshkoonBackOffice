import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from 'app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = this.addAuthorizationHeader(req);

    return next.handle(authReq).pipe(
      catchError((error) => {
        console.log(error);
        if(error.status === 401){
          console.log('errroooor');
          
        }
        if (error.status === 401 && error.error?.msg == 'Token expired') {
          return this.refreshTokens().pipe(
            switchMap((tokens: any) => {
              if (tokens) {
                this.authService.saveTokens(
                  tokens.accessToken,
                  tokens.refreshToken
                );
                const authReq = this.addAuthorizationHeader(req);
                return next.handle(authReq);
              } else {
                this.authService.logout();
                return throwError('Refresh token expired');
              }
            }),
            catchError((err) => {
              this.authService.logout();
              return throwError('Refresh token expired');
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addAuthorizationHeader(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.authService.getAccessToken();
    if (token) {
      return req.clone({ setHeaders: { Authorization: `${token}` } });
    }
    return req;
  }

  private refreshTokens(): Observable<any> {
    return this.authService.refreshTokens();
  }
}
