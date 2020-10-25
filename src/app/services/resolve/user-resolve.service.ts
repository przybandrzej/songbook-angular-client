import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {AuthenticationResourceService, UserRoleResourceService} from '../../songbook';
import {Observable, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {UserDetailsData} from '../../model/user-details-data';

@Injectable({
  providedIn: 'root'
})
export class UserResolveService implements Resolve<UserDetailsData> {

  private data: UserDetailsData;

  constructor(private authService: AuthenticationResourceService, private roleService: UserRoleResourceService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserDetailsData> | Promise<UserDetailsData> | UserDetailsData {
    return this.getCurrentUserDetails();
  }

  public getCurrentUserDetails(): Observable<UserDetailsData> {
    this.data = {user: null, role: null};
    return this.authService.getAccountUsingGET().pipe(
      mergeMap(user => {
        this.data.user = user;
        return of(this.data);
      }),
      mergeMap(data => {
        return this.roleService.getRoleByIdUsingGET(data.user.userRoleId).pipe(map(role => {
          this.data.role = role;
          return this.data;
        }));
      })
    );
  }
}
