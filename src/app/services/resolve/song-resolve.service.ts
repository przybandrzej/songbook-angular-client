import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SongDetailsData} from '../../model/song-details-data';
import {SongDetailsService} from '../song-details.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SongResolveService implements Resolve<SongDetailsData> {

  constructor(private songDetailsService: SongDetailsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<SongDetailsData> | Promise<SongDetailsData> | SongDetailsData {
    const songId = +route.paramMap.get('id');
    if (songId) {
      return this.loadData(songId).pipe(tap(console.log));
    }
    return undefined;
  }

  private loadData(songId: number): Observable<SongDetailsData> {
    return this.songDetailsService.getSongDetails(songId);
  }
}
