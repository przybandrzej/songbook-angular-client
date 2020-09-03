import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {AuthorResourceService, SongResourceService, UserResourceService} from '../../songbook';
import {Observable, of} from 'rxjs';
import {SongDetailsData} from '../../model/songDetailsData';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SongResolveService implements Resolve<SongDetailsData> {

  private data: SongDetailsData;

  constructor(private songService: SongResourceService, private userService: UserResourceService,
              private authorService: AuthorResourceService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<SongDetailsData> | Promise<SongDetailsData> | SongDetailsData {
    if (this.data) {
      return of(this.data);
    }
    const songId = +route.paramMap.get('id');
    if (songId) {
      return this.loadData(songId);
    }
    return undefined;
  }

  private loadData(songId: number): Observable<SongDetailsData> {
    return this.songService.getByIdUsingGET4(songId).pipe(map(result => {
      this.data.song = result;
      this.data.editsUsers = [];
      this.data.coauthorsAuthors = [];
      this.userService.getByIdUsingGET6(result.addedBy.addedBy).subscribe(next => this.data.addedByUser = next);
      result.edits.forEach(edit => this.userService.getByIdUsingGET6(edit.editedBy).subscribe(next => this.data.editsUsers.push(next)));
      result.coauthors.forEach(coauthor => this.authorService.getByIdUsingGET(coauthor.authorId)
        .subscribe(next => this.data.coauthorsAuthors.push({coauthor, author: next})));
      return this.data;
    }));
  }
}
