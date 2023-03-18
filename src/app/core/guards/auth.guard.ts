import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'app/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router,private jwtHelper: JwtHelperService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.isLoggedIn())
    {return true;
    }
    else{
      console.log('exp',this.jwtHelper.isTokenExpired());
         
      // if(AuthUtils.isTokenExpired())   
       this.router.navigateByUrl('auth/login');
      alert("not logged in");
      return false
    }
  }
  
}
