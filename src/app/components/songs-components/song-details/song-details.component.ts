import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SongDetailsData} from '../../../model/song-details-data';
import {
  AuthenticationResourceService,
  PlaylistDTO,
  PlaylistResourceService,
  SongResourceService,
  UserDTO, UserResourceService,
  UserRoleResourceService,
  UserSongRatingDTO,
  UserSongRatingResourceService
} from '../../../songbook';
import {formatDate, Location} from '@angular/common';
import {RatingChanged} from '../../utils/rating-star/rating-star.component';
import {UserDetailsData} from '../../../model/user-details-data';
import {MatDialog} from '@angular/material/dialog';
import {PlaylistDialogComponent, PlaylistDialogData, PlaylistDialogResult} from '../../utils/playlist-dialog/playlist-dialog.component';
import {map, mergeMap} from 'rxjs/operators';
import {rolesForUser} from '../../../model/user-roles-combinations';
import {of} from 'rxjs';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss']
})
export class SongDetailsComponent implements OnInit {

  data: SongDetailsData;
  user: UserDTO;
  inUserLib = false;
  songRating: UserSongRatingDTO;
  maxRating = 5;
  rolesForUser = rolesForUser;

  source: SongDetailsSource;

  constructor(private route: ActivatedRoute, private router: Router, private songService: SongResourceService, private location: Location,
              private authService: AuthenticationResourceService, private ratingService: UserSongRatingResourceService,
              public dialog: MatDialog, private playlistService: PlaylistResourceService, private roleService: UserRoleResourceService,
              private loginService: AuthService, private userService: UserResourceService) {
  }

  ngOnInit(): void {
    this.source = +this.route.snapshot.queryParamMap.get('source');
    this.data = this.route.snapshot.data.data;
    const getUserDetails = this.authService.getAccountUsingGET().pipe(
      mergeMap(user => {
        const data: UserDetailsData = {user: null, role: null};
        data.user = user;
        return of(data);
      }),
      mergeMap(data => {
        return this.roleService.getByIdUsingGET7(data.user.userRoleId).pipe(map(role => {
          data.role = role;
          return data;
        }));
      })
    );
    this.loginService.loggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        getUserDetails.subscribe(userData => {
          this.user = userData.user;
          this.inUserLib = this.user.songs.filter(it => it === this.data.song.id).length > 0;
          this.songRating = {
            userId: this.user.id,
            songId: this.data.song.id,
            rating: null
          };
          this.ratingService.getByUserIdAndSongIdUsingGET(this.songRating.songId, this.songRating.userId).subscribe(
            rating => this.songRating = rating,
            error => {
              return;
            });
        });
      }
    });
  }

  editSong() {
    this.router.navigateByUrl('edit-song/' + this.data.song.id);
  }

  deleteSong() {
    if (this.data) {
      this.songService.deleteUsingDELETE4(this.data.song.id).subscribe(() => this.router.navigateByUrl('songs'));
    }
  }

  close() {
    if (this.source === SongDetailsSource.ADD) {
      this.router.navigateByUrl('songs');
    } else {
      this.location.back();
    }
  }

  updateRating(event: RatingChanged) {
    const ratingUpdate = this.songService.getByIdUsingGET4(this.data.song.id).pipe(map(song => this.data.song.averageRating = song.averageRating));
    if (this.songRating.rating) {
      if (this.songRating.rating !== event.value / this.maxRating) {
        this.songRating.rating = event.value / this.maxRating;
        this.ratingService.updateUsingPUT7(this.songRating).subscribe(res => {
          this.songRating = res;
          ratingUpdate.subscribe();
        });
      }
    } else {
      this.songRating.rating = event.value / this.maxRating;
      this.ratingService.createUsingPOST7(this.songRating).subscribe(res => {
        this.songRating = res;
        ratingUpdate.subscribe();
      });
    }
  }

  addToLib(): void {
    this.userService.addSongToLibraryUsingPATCH(this.user.id, this.data.song.id).subscribe(() => this.inUserLib = true);
  }

  removeFromLib(): void {
    this.userService.removeSongFromLibraryUsingPATCH(this.user.id, this.data.song.id).subscribe(() => this.inUserLib = false);
  }

  getRatingLabelValue(): number {
    if (!this.songRating || !this.songRating.rating) {
      return 0;
    }
    return this.songRating.rating * this.maxRating;
  }

  addToPlaylist() {
    this.playlistService.getByOwnerIdUsingGET(this.user.id, true).subscribe(res => this.openDialog(res));
  }

  private openDialog(playlists: PlaylistDTO[]) {
    const dialogRef = this.dialog.open<PlaylistDialogComponent, PlaylistDialogData, PlaylistDialogResult>(PlaylistDialogComponent, {
      data: {
        playlists,
        song: this.data.song
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      result.selected.forEach(playlist => {
        if (playlist.id <= 0) {
          playlist.songs.push(this.data.song.id);
          playlist.ownerId = this.user.id;
          this.playlistService.createUsingPOST2(playlist).subscribe(() => {
          });
        } else {
          this.playlistService.addSongUsingPATCH(playlist.id, this.data.song.id).subscribe(() => {
          });
        }
      });
      result.deselected.forEach(playlist => {
        this.playlistService.removeSongUsingPATCH(playlist.id, this.data.song.id).subscribe(() => {
        });
      });
    });
  }

  formatDate(timestamp: Date) {
    return formatDate(timestamp, 'd. M y, h:mm:ss', 'PL');
  }
}

export enum SongDetailsSource {
  ADD
}
