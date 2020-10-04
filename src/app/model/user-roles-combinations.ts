import {Role} from './user-role';

const rolesForUser = [Role.User, Role.Moderator, Role.Admin, Role.Superuser];
const rolesForModerator = [Role.Moderator, Role.Admin, Role.Superuser];
const rolesForAdmin = [Role.Admin, Role.Superuser];
const rolesForSuperuser = [Role.Superuser];

export {rolesForUser, rolesForModerator, rolesForAdmin, rolesForSuperuser};
