import {AuthorDTO, SongCoauthorDTO, SongDTO, UserDTO} from '../songbook';

export interface SongDetailsData {
  song: SongDTO;
  addedByUser: UserDTO;
  coauthorsAuthors: { coauthor: SongCoauthorDTO, author: AuthorDTO}[];
  editsUsers: UserDTO[];
}
