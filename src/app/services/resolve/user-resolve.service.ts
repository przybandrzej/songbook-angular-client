import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {AuthenticationResourceService, UserRoleResourceService} from '../../songbook';
import {Observable, of} from 'rxjs';
import {UserDetailsData} from '../../model/user-details-data';
import {map, mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserResolveService implements Resolve<UserDetailsData> {

  private data: UserDetailsData;

  constructor(private authService: AuthenticationResourceService, private roleService: UserRoleResourceService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserDetailsData> | Promise<UserDetailsData> | UserDetailsData {
    this.data = {user: null, role: null};
    return this.authService.getAccountUsingGET().pipe(
      mergeMap(user => {
        this.data.user = user;
        return of(this.data);
      }),
      mergeMap(data => {
        return this.roleService.getByIdUsingGET7(data.user.userRoleId).pipe(map(role => {
          this.data.role = role;
          return this.data;
        }));
      })
    );
  }
}
