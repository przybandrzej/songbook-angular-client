import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SongDetailsData} from '../../../model/song-details-data';
import {
  CreatePlaylistDTO,
  PlaylistResourceService,
  SongResourceService,
  UserSongRatingDTO,
  UserSongRatingResourceService
} from '../../../songbook';
import {Location} from '@angular/common';
import {RatingChanged} from '../../utils/rating-star/rating-star.component';
import {MatDialog} from '@angular/material/dialog';
import {PlaylistDialogComponent, PlaylistDialogData, PlaylistDialogResult} from '../../utils/playlist-dialog/playlist-dialog.component';
import {map} from 'rxjs/operators';
import {rolesForUser} from '../../../model/user-roles-combinations';
import {SongDetailsService} from '../../../services/song-details.service';
import {PlaylistData} from '../../../model/playlist-data';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss']
})
export class SongDetailsComponent implements OnInit {

  data: SongDetailsData;
  inUserLib = false;
  songRating: UserSongRatingDTO;
  maxRating = 5;
  rolesForUser = rolesForUser;
  source: SongDetailsSource;

  constructor(private route: ActivatedRoute, private router: Router, private songService: SongResourceService, private location: Location,
              private ratingService: UserSongRatingResourceService,
              public dialog: MatDialog, private playlistService: PlaylistResourceService,
              private songDetailsService: SongDetailsService) {
  }

  ngOnInit(): void {
    this.source = +this.route.snapshot.queryParamMap.get('source');
    this.data = this.route.snapshot.data.data;
    this.songDetailsService.getLoggedUserRatingForSong(this.data.song.id).subscribe(rating => this.songRating = rating);
    this.songDetailsService.isSongInLoggedUserLibrary(this.data.song.id).subscribe(is => this.inUserLib = is);
  }

  editSong() {
    this.router.navigateByUrl('edit-song/' + this.data.song.id);
  }

  deleteSong() {
    if (this.data) {
      // todo display confirm dialog
      this.songService.deleteSongUsingDELETE(this.data.song.id).subscribe(() => this.router.navigateByUrl('songs'));
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
    const ratingUpdate = this.songService.getSongByIdUsingGET(this.data.song.id).pipe(map(song => this.data.song.averageRating = song.averageRating));
    if (this.songRating.rating) {
      if (this.songRating.rating !== event.value / this.maxRating) {
        this.songRating.rating = event.value / this.maxRating;
        this.ratingService.updateRatingUsingPUT(this.songRating).subscribe(res => {
          this.songRating = res;
          ratingUpdate.subscribe();
        });
      }
    } else {
      this.songRating.rating = event.value / this.maxRating;
      this.songDetailsService.rateSong(this.songRating).subscribe(res => {
        this.songRating = res;
        ratingUpdate.subscribe();
      });
    }
  }

  addToLib(): void {
    this.songDetailsService.addSongToLib(this.data.song.id).subscribe(() => this.inUserLib = true);
  }

  removeFromLib(): void {
    this.songDetailsService.removeSongFromLib(this.data.song.id).subscribe(() => this.inUserLib = false);
  }

  getRatingLabelValue(): number {
    if (!this.songRating || !this.songRating.rating) {
      return 0;
    }
    return this.songRating.rating * this.maxRating;
  }

  addToPlaylist() {
    this.songDetailsService.getLoggedUserPlaylistsWithSongs().subscribe(res => this.openDialog(res));
  }

  private openDialog(playlists: PlaylistData[]) {
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
          const create: CreatePlaylistDTO = {
            isPrivate: playlist.isPrivate,
            name: playlist.name,
            ownerId: -1,
            songs: [this.data.song.id]
          };
          this.songDetailsService.createPlaylistForLoggedUser(create).subscribe();
        } else {
          this.playlistService.addSongToPlaylistUsingPATCH(playlist.id, this.data.song.id).subscribe();
        }
      });
      result.deselected.forEach(playlist => {
        this.playlistService.removeSongFromPlaylistUsingPATCH(playlist.id, this.data.song.id).subscribe();
      });
    });
  }

}

export enum SongDetailsSource {
  ADD
}
