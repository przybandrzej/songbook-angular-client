import {AuthorDTO, SongCoauthorDTO, SongDTO, SongEditDTO, UserDTO} from '../songbook';

export interface SongDetailsData {
  song: SongDTO;
  addedByUser: UserDTO;
  coauthorsAuthors: { coauthor: SongCoauthorDTO, author: AuthorDTO }[];
  editsUsers: { edit: SongEditDTO, user: UserDTO }[];
}
