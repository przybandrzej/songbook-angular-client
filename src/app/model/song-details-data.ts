import {
  AuthorDTO,
  CategoryDTO,
  GuitarCordDTO,
  LineDTO,
  SongAddDTO,
  SongCoauthorDTO,
  SongDTO,
  SongEditDTO,
  TagDTO,
  UserDTO,
  VerseDTO
} from '../songbook';

export interface SongDetailsData {
  song: SongDTO;
  author: AuthorDTO;
  add: SongAddData;
  coauthors: SongCoauthorData[];
  edits: SongEditData[];
  tags: TagDTO[];
  verses: SongVerseData[];
  category: CategoryDTO;
}

export interface SongEditData {
  edit: SongEditDTO;
  user: UserDTO;
}

export interface SongAddData {
  songAdd: SongAddDTO;
  user: UserDTO;
}

export interface SongCoauthorData {
  coauthor: SongCoauthorDTO;
  author: AuthorDTO;
}

export interface SongVerseData {
  verse: VerseDTO;
  lines: VerseLineData[];
}

export interface VerseLineData {
  line: LineDTO;
  cords: GuitarCordDTO[];
}

