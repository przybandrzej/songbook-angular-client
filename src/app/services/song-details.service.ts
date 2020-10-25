import {Injectable} from '@angular/core';
import {
  AuthenticationResourceService,
  AuthorDTO,
  AuthorResourceService,
  CategoryDTO,
  CreatePlaylistDTO,
  LineResourceService,
  PlaylistDTO,
  PlaylistResourceService,
  SongDTO,
  SongResourceService,
  TagDTO,
  UserDTO,
  UserResourceService,
  UserSongRatingDTO,
  VerseResourceService
} from '../songbook';
import {combineLatest, forkJoin, Observable, of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {PlaylistData} from '../model/playlist-data';
import {SongAddData, SongCoauthorData, SongDetailsData, SongEditData, SongVerseData, VerseLineData} from '../model/song-details-data';
import {UserEditData} from '../model/user-details-data';

@Injectable({
  providedIn: 'root'
})
export class SongDetailsService {

  constructor(private userService: UserResourceService, private apiAuthService: AuthenticationResourceService,
              private playlistService: PlaylistResourceService, private songService: SongResourceService,
              private authorService: AuthorResourceService, private verseService: VerseResourceService,
              private lineService: LineResourceService) {
  }

  public getLoggedUserRatingForSong(songId: number): Observable<UserSongRatingDTO> {
    return this.apiAuthService.getAccountUsingGET().pipe(mergeMap(user => {
      return this.userService.getRatingsOfSongByUserIdUsingGET(user.id, songId);
    }));
  }

  public isSongInLoggedUserLibrary(songId: number): Observable<boolean> {
    return this.apiAuthService.getAccountUsingGET().pipe(mergeMap(user => {
      return this.userService.getSongsByUserIdUsingGET(user.id).pipe(mergeMap(songs => {
        return of(songs.filter(it => it.id === songId).length > 0);
      }));
    }));
  }

  public getUserRatingForSong(songId: number, user: UserDTO): Observable<UserSongRatingDTO> {
    return this.userService.getRatingsOfSongByUserIdUsingGET(user.id, songId);
  }

  public isSongInUserLibrary(songId: number, user: UserDTO): Observable<boolean> {
    return this.userService.getSongsByUserIdUsingGET(user.id).pipe(mergeMap(songs => {
      return of(songs.filter(it => it.id === songId).length > 0);
    }));
  }

  public rateSong(songRating: UserSongRatingDTO): Observable<UserSongRatingDTO> {
    return this.apiAuthService.getAccountUsingGET().pipe(mergeMap(user => {
      return this.userService.addRatingUsingPATCH(user.id, songRating);
    }));
  }

  public addSongToLib(songId: number): Observable<void> {
    return this.apiAuthService.getAccountUsingGET().pipe(mergeMap(user => {
      return this.userService.addSongToLibraryUsingPATCH(user.id, songId);
    }));
  }

  public removeSongFromLib(songId: number): Observable<void> {
    return this.apiAuthService.getAccountUsingGET().pipe(mergeMap(user => {
      return this.userService.removeSongFromLibraryUsingPATCH(user.id, songId);
    }));
  }

  public getLoggedUserPlaylists(): Observable<PlaylistDTO[]> {
    return this.apiAuthService.getAccountUsingGET().pipe(mergeMap(user => {
      return this.userService.getPlaylistsByUserIdUsingGET(user.id);
    }));
  }

  public getLoggedUserPlaylistsWithSongs(): Observable<PlaylistData[]> {
    return this.apiAuthService.getAccountUsingGET().pipe(mergeMap(user => {
      return this.userService.getPlaylistsByUserIdUsingGET(user.id)
        .pipe(mergeMap(playlists => {
          const songs$ = playlists.map(it => this.playlistService.getPlaylistSongsUsingGET(it.id).pipe(map(songs => {
            const data: PlaylistData = {playlist: it, songs};
            return data;
          })));
          return forkJoin(songs$);
        }));
    }));
  }

  public createPlaylistForLoggedUser(playlist: CreatePlaylistDTO): Observable<PlaylistDTO> {
    return this.apiAuthService.getAccountUsingGET().pipe(mergeMap(user => {
      playlist.ownerId = user.id;
      return this.userService.addPlaylistUsingPATCH(user.id, playlist);
    }));
  }

  public getSongCoauthorsData(songId: number): Observable<SongCoauthorData[]> {
    return this.songService.getSongCoauthorsUsingGET(songId).pipe(mergeMap(coauthors => {
      const authors$ = coauthors.map(it => this.authorService.getAuthorByIdUsingGET(it.authorId).pipe(mergeMap(author => {
        const data: SongCoauthorData = {
          coauthor: it,
          author
        };
        return of(data);
      })));
      if (authors$.length > 0) {
        return forkJoin(authors$);
      }
      return of([]);
    }));
  }

  public getSongAdd(songId: number): Observable<SongAddData> {
    return this.songService.getSongAddedByUsingGET(songId).pipe(
      mergeMap(songAdd => {
        return this.userService.getUserByIdUsingGET(songAdd.addedBy).pipe(map(user => {
          const data: SongAddData = {songAdd, user};
          return data;
        }));
      }));
  }

  public getSongEdits(songId: number): Observable<SongEditData[]> {
    return this.songService.getSongEditsUsingGET(songId).pipe(mergeMap(edits => {
      const users$ = edits.map(it => this.userService.getUserByIdUsingGET(it.editedBy).pipe(map(user => {
        const data: SongEditData = {
          edit: it,
          user
        };
        return data;
      })));
      if (users$.length > 0) {
        return forkJoin(users$);
      } else {
        return of([]);
      }
    }));
  }

  public getSongVersesData(songId: number): Observable<SongVerseData[]> {
    return this.songService.getSongVersesUsingGET(songId).pipe(mergeMap(verses => {
      const versesAndLines$: Observable<SongVerseData>[] = [];
      verses.forEach(verse => {
        versesAndLines$.push(this.verseService.getVerseLinesUsingGET(verse.id).pipe(mergeMap(lines => {
            const lines$: Observable<VerseLineData>[] = [];
            lines.forEach(line => lines$.push(this.lineService.getLineCordsUsingGET(line.id).pipe(mergeMap(cords => {
              const data: VerseLineData = {line, cords};
              return of(data);
            }))));
            if (lines$.length > 0) {
              return forkJoin(lines$).pipe(mergeMap(linesAndCords => {
                const obj: SongVerseData = {verse, lines: linesAndCords};
                return of(obj);
              }));
            } else {
              const obj: SongVerseData = {verse, lines: []};
              return of(obj);
            }
          }
        )));
      });
      if (versesAndLines$.length > 0) {
        return forkJoin(versesAndLines$);
      } else {
        return of([]);
      }
    }));
  }

  public getSongDetails(songId: number): Observable<SongDetailsData> {
    const song$ = this.songService.getSongByIdUsingGET(songId).pipe(tap(verses => console.log('Song got ' + JSON.stringify(verses))));
    const add$ = this.getSongAdd(songId).pipe(tap(verses => console.log('Add got ' + JSON.stringify(verses))));
    const author$ = this.songService.getSongAuthorUsingGET(songId).pipe(tap(verses => console.log('Author got ' + JSON.stringify(verses))));
    const coauthors$ = this.getSongCoauthorsData(songId).pipe(tap(verses => console.log('Coauthors got ' + JSON.stringify(verses))));
    const edits$ = this.getSongEdits(songId).pipe(tap(verses => console.log('Edits got ' + JSON.stringify(verses))));
    const tags$ = this.songService.getSongTagsUsingGET(songId).pipe(tap(tags => console.log('Tags got ' + JSON.stringify(tags))));
    const category$ = this.songService.getSongCategoryUsingGET(songId).pipe(tap(cat => console.log('Category got ' + JSON.stringify(cat))));
    const verses$ = this.getSongVersesData(songId).pipe(tap(verses => console.log('Verses got ' + JSON.stringify(verses))));
    return forkJoin([song$, category$, author$, tags$, coauthors$, verses$, add$, edits$]).pipe(map(data => {
      console.log(data);
      const songData: SongDetailsData = {
        song: data[0] as SongDTO,
        category: data[1] as CategoryDTO,
        author: data[2] as AuthorDTO,
        tags: data[3] as TagDTO[],
        coauthors: data[4] as SongCoauthorData[],
        verses: data[5] as SongVerseData[],
        add: data[6] as SongAddData,
        edits: data[7] as SongEditData[]
      };
      return songData;
    }));
  }

  public getLoggedUserSongsData(): Observable<SongDetailsData[]> {
    return this.apiAuthService.getAccountUsingGET().pipe(mergeMap(user => {
        return this.userService.getSongsByUserIdUsingGET(user.id);
      }),
      mergeMap(songs => {
        const songsDetails: Observable<SongDetailsData>[] = songs.map(it => this.getSongDetails(it.id));
        if (songsDetails.length > 0) {
          return forkJoin(songsDetails);
        } else {
          return of([]);
        }
      }));
  }

  public getLoggedUserEditData(): Observable<UserEditData[]> {
    return this.apiAuthService.getAccountUsingGET().pipe(mergeMap(user => {
      return this.userService.getEditedSongsByUserIdUsingGET(user.id).pipe(mergeMap(edits => {
        const songs$ = edits.map(it => this.songService.getSongByIdUsingGET(it.id).pipe(mergeMap(song => {
          const data: UserEditData = {
            edit: it,
            song,
            user
          };
          return of(data);
        })));
        if (songs$.length > 0) {
          return forkJoin(songs$);
        } else {
          return of([]);
        }
      }));
    }));
  }

}
