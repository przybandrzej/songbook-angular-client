import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UserData} from '../../model/user-data';
import {PlaylistResourceService, SongResourceService} from '../../songbook';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {map, mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataResolveService implements Resolve<UserData> {

  constructor(private songService: SongResourceService, private authService: AuthService, private playlistService: PlaylistResourceService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserData> | Promise<UserData> | UserData {
    return this.get();
  }

  get() {
    const data: UserData = {
      userId: null,
      songs: [],
      added: [],
      edited: [],
      playlists: []
    };
    return this.authService.user.pipe(mergeMap(user => {
        data.userId = user.id;
        return this.songService.getUserSongsUsingGET(user.id).pipe(map(songs => {
          data.songs = songs;
          return data;
        }));
      }),
      mergeMap(staged => {
        return this.songService.getSongsEditedByUserUsingGET(data.userId).pipe(map(edits => {
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
        return this.playlistService.getByOwnerIdUsingGET(staged.userId).pipe(map(playlists => {
          staged.playlists = playlists;
          return staged;
        }));
      }));
  }
}
