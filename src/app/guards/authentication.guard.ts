import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Location} from '@angular/common';
import {map} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthService, private location: Location) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.loggedIn.pipe(
      map(loggedIn => {
        if (loggedIn) {
          const requiredRoles = route.data.roles;
          if (requiredRoles && requiredRoles.length !== 0) {
            return route.data.roles.indexOf(this.authService.getUserRole()) !== -1;
          } else {
            return true;
          }
        }
        return false;
      }));
  }
}
