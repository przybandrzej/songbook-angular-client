import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SongDetailsData} from '../../../model/song-details-data';
import {
  AuthenticationResourceService,
  PlaylistDTO,
  PlaylistResourceService,
  SongResourceService,
  UserDTO,
  UserSongRatingDTO,
  UserSongRatingResourceService
} from '../../../songbook';
import {Location} from '@angular/common';
import {RatingChanged} from '../../utils/rating-star/rating-star.component';
import {UserDetailsData} from '../../../model/user-details-data';
import {MatDialog} from '@angular/material/dialog';
import {PlaylistDialogComponent, PlaylistDialogData, PlaylistDialogResult} from '../../utils/playlist-dialog/playlist-dialog.component';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss']
})
export class SongDetailsComponent implements OnInit {

  data: SongDetailsData;
  userData: UserDetailsData;
  user: UserDTO;
  inUserLib = false;
  songRating: UserSongRatingDTO;
  maxRating = 5;

  constructor(private route: ActivatedRoute, private router: Router, private songService: SongResourceService, private location: Location,
              private authService: AuthenticationResourceService, private ratingService: UserSongRatingResourceService,
              public dialog: MatDialog, private playlistService: PlaylistResourceService) {
  }

  ngOnInit(): void {
    this.data = this.route.snapshot.data.data;
    this.userData = this.route.snapshot.data.user;
    this.user = this.userData.user;
    this.inUserLib = this.user.songs.filter(it => it === this.data.song.id).length > 0;
    this.songRating = {
      userId: this.user.id,
      songId: this.data.song.id,
      rating: null
    };
    this.ratingService.getByUserIdAndSongIdUsingGET(this.songRating.songId, this.songRating.userId).subscribe(
      rating => this.songRating = rating,
      error => console.log('No rating found'));
  }

  editSong() {
    this.router.navigateByUrl('edit-song/' + this.data.song.id);
  }

  deleteSong() {
    if (this.data) {
      this.songService.deleteUsingDELETE4(this.data.song.id).subscribe();
      this.router.navigateByUrl('songs');
    }
  }

  close() {
    this.location.back();
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
    this.user.songs.push(this.data.song.id);
    this.authService.saveAccountUsingPOST(this.user).subscribe(() => this.inUserLib = true);
  }

  removeFromLib(): void {
    this.user.songs.splice(this.user.songs.indexOf(this.data.song.id), 1);
    this.authService.saveAccountUsingPOST(this.user).subscribe(() => this.inUserLib = false);
  }

  getRatingLabelValue(): number {
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
          playlist.songs.push(this.data.song.id);
          this.playlistService.updateUsingPUT2(playlist).subscribe(() => {
          });
        }
      });
      result.deselected.forEach(playlist => {
        const item = playlist.songs.filter(it => it === this.data.song.id)[0];
        playlist.songs.splice(playlist.songs.indexOf(item), 1);
        this.playlistService.updateUsingPUT2(playlist).subscribe(() => {
        });
      });
    });
  }

}
