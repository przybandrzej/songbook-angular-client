import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SongDetailsData} from '../../../model/song-details-data';
import {
  AuthenticationResourceService,
  SongResourceService,
  UserDTO,
  UserSongRatingDTO,
  UserSongRatingResourceService
} from '../../../songbook';
import {Location} from '@angular/common';
import {RatingChanged} from '../../utils/rating-star/rating-star.component';
import {UserDetailsData} from '../../../model/user-details-data';

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

  constructor(private route: ActivatedRoute, private router: Router, private songService: SongResourceService, private location: Location,
              private authService: AuthenticationResourceService, private ratingService: UserSongRatingResourceService) {
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
    console.log('Rated ' + event.value);
    if (this.songRating.rating) {
      if (this.songRating.rating !== event.value) {
        this.songRating.rating = event.value;
        this.ratingService.updateUsingPUT7(this.songRating).subscribe(res => this.songRating = res);
      }
    } else {
      this.songRating.rating = event.value;
      this.ratingService.createUsingPOST7(this.songRating).subscribe(res => this.songRating = res);
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

}
