import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from '../services/login.service';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private loginService: LoginService, private location: Location) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.loginService.isLoggedIn()) {
      const requiredRoles = route.data.roles;
      if (requiredRoles && requiredRoles.length !== 0) {
        return route.data.roles.indexOf(this.loginService.getUserRole()) !== -1;
      } else {
        return true;
      }
    }
    // user not authorised so redirect to previous page
    this.location.back();
    return false;
  }
}
