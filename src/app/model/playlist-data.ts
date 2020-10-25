import {PlaylistDTO, SongDTO} from '../songbook';

export interface PlaylistData {
  playlist: PlaylistDTO;
  songs: SongDTO[];
}
