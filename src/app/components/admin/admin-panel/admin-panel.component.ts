import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminResourceService, UserDTO, UserResourceService, UserRoleDTO, UserRoleResourceService} from '../../../songbook';
import {Role} from '../../../model/user-role';
import {FormControl, Validators} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  roleControl: FormControl = new FormControl('', [Validators.required]);

  users: UserDTO[] = [];
  isError = false;
  errorMessage: string;
  selectedUser: UserDTO;
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
    this.userService.getAllUsersUsingGET().subscribe(res => this.users = res);
    this.roleService.getAllRolesUsingGET().subscribe(res => {
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

  delete(event: MouseEvent) {
    // todo display confirm dialog
    event.stopPropagation();
    if (this.selectedUser.userRoleId === this.superuserRole.id) {
      this.isError = true;
      this.errorMessage = 'Cannot delete superuser';
    }
    this.userService.deleteUserUsingDELETE(this.selectedUser.id).subscribe(() => {
      this.users.splice(this.users.indexOf(this.users.filter(it => it.id === this.selectedUser.id)[0]), 1);
      this.deselect();
    });
  }

  select(user: UserDTO) {
    this.selectedUser = user;
    this.isError = false;
    this.errorMessage = '';
    this.roleControl.setValue(this.selectedUser.userRoleId);
  }

  deselect() {
    this.selectedUser = null;
    this.isError = false;
    this.errorMessage = '';
  }

  changeRole(event: MatSelectChange) {
    this.adminService.updateUserRoleUsingPATCH(event.value, this.selectedUser.id).subscribe(user => {
      const index = this.users.indexOf(this.selectedUser);
      this.selectedUser = user;
      this.users.splice(index, 1, this.selectedUser);
    });
  }

  activateUser(event: MouseEvent) {
    event.stopPropagation();
    if (this.selectedUser.activated) {
      return;
    }
    this.adminService.activateUserUsingPATCH(this.selectedUser.id).subscribe(user => {
      const index = this.users.indexOf(this.selectedUser);
      this.selectedUser = user;
      this.users.splice(index, 1, this.selectedUser);
    });
  }
}
