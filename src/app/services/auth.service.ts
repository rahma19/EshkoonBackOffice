import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'app/login/login.component';
import { environment } from 'environments/environment';
import { BehaviorSubject, first, map, Observable, take } from 'rxjs';
import { AuthUtils } from './auth.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      localStorage.getItem('user')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get user$(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/signIn`, { email, password })
      .pipe(
        map((user: any) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.saveTokens(user.accessToken, user.refreshToken);
          const decoded = AuthUtils._decodeToken(user.accessToken);

          localStorage.setItem('user', JSON.stringify(decoded));
          this.getUserByEmail(decoded.email);
          // .pipe(map(user => {
        })
      );

    // }));
  }

  saveTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  deleteTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  refreshTokens() {
    return this.http.post(`${environment.apiUrl}/auth/refresh`, {
      refreshToken: this.getRefreshToken(),
    });
  }

  register(user: any) {
    return this.http.post(`${environment.apiUrl}/auth/signUp`, user);
  }

  LoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '600px',
    });
  }

  logout() {
    // remove user from local storage to log user out
    this.deleteTokens();
    this.currentUserSubject.next(null);
    // this.router.navigateByUrl('/').then(() => {
    //   window.location.reload();

    // });
    this.router.navigateByUrl('/login');
    // this.LoginDialog();
  }

  isLoggedIn() {
    return !!localStorage.getItem('accessToken');
  }

  getUserByEmail(email: string) {
    return this.http
      .get(`${environment.apiUrl}/auth/users/${email}`)
      .subscribe((data: any) => {
        this.currentUserSubject.next(JSON.parse(JSON.stringify(data.user)));
      });
  }
  updateUser(form: any, email: any) {
    return this.http
      .put(`${environment.apiUrl}/auth/update/${email}`, form)
      .pipe(
        map((data: any) => {
          this.currentUserSubject.next(JSON.parse(JSON.stringify(data.user)));
        })
      );
  }

  GetUsers() {
    return this.http.get(`${environment.apiUrl}/auth/users`);
  }
}
