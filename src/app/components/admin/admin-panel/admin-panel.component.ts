import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminResourceService, UserDTO, UserResourceService, UserRoleDTO, UserRoleResourceService} from '../../../songbook';
import {Role} from '../../../model/user-role';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  users: UserDTO[] = [];
  isError = false;
  errorMessage: string;
  selectedUser: UserDTO;
  roleControl: any;
  availableRoles: UserRoleDTO[] = [];
  allRoles: UserRoleDTO[] = [];
  superuserRole: UserRoleDTO;
  adminRole: UserRoleDTO;
  userRole: UserRoleDTO;
  moderatorRole: UserRoleDTO;

  constructor(private router: Router, private userService: UserResourceService, private roleService: UserRoleResourceService,
              private adminService: AdminResourceService) {
  }

  ngOnInit(): void {
    this.userService.getAllUsingGET6().subscribe(res => this.users = res);
    this.roleService.getAllUsingGET7().subscribe(res => {
      this.allRoles = res;
      this.availableRoles = res.slice();
      this.superuserRole = this.allRoles.filter(it => it.name === Role.Superuser)[0];
      this.adminRole = this.allRoles.filter(it => it.name === Role.Admin)[0];
      this.moderatorRole = this.allRoles.filter(it => it.name === Role.Moderator)[0];
      this.userRole = this.allRoles.filter(it => it.name === Role.User)[0];
      this.availableRoles.splice(this.availableRoles.indexOf(this.availableRoles.filter(it => it.name === Role.Superuser)[0]), 1);
    });
  }

  close() {
    this.router.navigateByUrl('');
  }

  getUserSongCount(id: number) {
    return 'not implemented yet';
  }

  delete(event: MouseEvent, id: number) {
    event.stopPropagation();
    this.userService.deleteUsingDELETE6(id).subscribe(() => {
      this.users.splice(this.users.indexOf(this.users.filter(it => it.id === id)[0]), 1);
      this.users = this.users.slice();
    });
  }

  changeRole(event: MouseEvent, user: UserDTO) {

  }

  getUserRoleName(user: UserDTO) {
    return this.allRoles.filter(it => it.id === user.userRoleId)[0]?.name;
  }

  getUserRoleColor(user: UserDTO): string {
    const role = this.allRoles.filter(it => it.id === user.userRoleId)[0];
    if (role) {
      if (role.name === Role.Superuser) {
        return '#ffcc00';
      } else if (role.name === Role.Admin) {
        return '#ff0000';
      } else if (role.name === Role.Moderator) {
        return '#ff66ff';
      } else if (role.name === Role.User) {
        return '#00cc44';
      }
    }
    return undefined;
  }

  select(user: UserDTO) {
    this.selectedUser = user;
  }

  deselect() {
    this.selectedUser = null;
  }

  updateUser() {
    this.adminService.updateUserRoleUsingPATCH(this.selectedUser.userRoleId, this.selectedUser.id).subscribe(user => {
      const index = this.users.indexOf(this.selectedUser);
      const copy = this.users.slice();
      this.selectedUser = user;
      copy.splice(index, 1, this.selectedUser);
      this.users = copy;
    });
  }
}
