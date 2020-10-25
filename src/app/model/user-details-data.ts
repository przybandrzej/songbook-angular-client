import {SongDTO, SongEditDTO, UserDTO, UserRoleDTO} from '../songbook';

export interface UserDetailsData {
  user: UserDTO;
  role: UserRoleDTO;
}

export interface UserEditData {
  user: UserDTO;
  song: SongDTO;
  edit: SongEditDTO;
}
