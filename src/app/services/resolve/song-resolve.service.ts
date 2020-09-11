import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {
  AuthorDTO,
  AuthorResourceService,
  SongCoauthorDTO,
  SongDTO,
  SongEditDTO,
  SongResourceService,
  UserDTO,
  UserResourceService
} from '../../songbook';
import {forkJoin, Observable, of} from 'rxjs';
import {SongDetailsData} from '../../model/song-details-data';
import {map, mergeMap} from 'rxjs/operators';

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
    return this.songService.getByIdUsingGET4(songId).pipe(
      mergeMap(result => this.expandToAddedUser(result)),
      mergeMap(result => this.expandToEdits(result)),
      mergeMap(result => this.expandToCoauthors(result))
    );
  }

  private expandToAddedUser(song: SongDTO): Observable<SongDetailsData> {
    const returned: SongDetailsData = {addedByUser: undefined, coauthorsAuthors: [], editsUsers: [], song: undefined};
    returned.song = song;
    return this.userService.getByIdUsingGET6(song.addedBy.addedBy).pipe(
      map(next => {
        returned.addedByUser = next;
        return returned;
      }));
  }

  private expandToEdits(songDetails: SongDetailsData): Observable<SongDetailsData> {
    const functions: Observable<UserDTO>[] = [];
    songDetails.song.edits.forEach(editId => functions.push(this.userService.getByIdUsingGET6(editId.editedBy)));
    if (functions.length === 0) {
      return of(songDetails);
    }
    return forkJoin(functions).pipe(
      map(results => {
        const edits: { edit: SongEditDTO, user: UserDTO }[] = [];
        results.forEach(user => {
          const edit = songDetails.song.edits.find(it => it.editedBy === user.id);
          edits.push({edit, user});
        });
        songDetails.editsUsers = edits;
        return songDetails;
      }));
  }

  private expandToCoauthors(songDetails: SongDetailsData): Observable<SongDetailsData> {
    const functions: Observable<AuthorDTO>[] = [];
    songDetails.song.coauthors.forEach(coauthor => functions.push(this.authorService.getByIdUsingGET(coauthor.authorId)));
    if (functions.length === 0) {
      return of(songDetails);
    }
    return forkJoin(functions).pipe(
      map(results => {
        const coauthorsAuthors: { coauthor: SongCoauthorDTO, author: AuthorDTO }[] = [];
        results.forEach(author => {
          const coauthor = songDetails.song.coauthors.find(it => it.authorId === author.id);
          coauthorsAuthors.push({coauthor, author});
        });
        songDetails.coauthorsAuthors = coauthorsAuthors;
        return songDetails;
      }));
  }
}
