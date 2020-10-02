import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UserSongsData} from '../../model/user-songs-data';
import {AuthenticationResourceService, PlaylistResourceService, SongResourceService} from '../../songbook';
import {Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserSongsDataResolveService implements Resolve<UserSongsData> {

  constructor(private songService: SongResourceService, private authService: AuthenticationResourceService, private playlistService: PlaylistResourceService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserSongsData> | Promise<UserSongsData> | UserSongsData {
    return this.authService.getAccountUsingGET().pipe(
      mergeMap(user => {
        const data: UserSongsData = {
          userId: null,
          songs: [],
          added: [],
          edited: [],
          playlists: []
        };
        data.userId = user.id;
        return this.songService.getUserSongsUsingGET(user.id).pipe(map(songs => {
          data.songs = songs;
          return data;
        }));
      }),
      mergeMap(staged => {
        return this.songService.getSongsEditedByUserUsingGET(staged.userId).pipe(map(edits => {
          staged.edited = edits;
          return staged;
        }));
      }),
      mergeMap(staged => {
        return this.songService.getSongsAddedByUserUsingGET(staged.userId).pipe(map(added => {
          staged.added = added;
          return staged;
        }));
      }),
      mergeMap(staged => {
        return this.playlistService.getByOwnerIdUsingGET(staged.userId, true).pipe(map(playlists => {
          staged.playlists = playlists;
          return staged;
        }));
      }));
  }

}
