import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SongDetailsData} from '../../../model/song-details-data';
import {SongResourceService} from '../../../songbook';
import {Location} from '@angular/common';
import {RatingChanged} from '../../utils/rating-star/rating-star.component';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss']
})
export class SongDetailsComponent implements OnInit {

  data: SongDetailsData;

  constructor(private route: ActivatedRoute, private router: Router, private songService: SongResourceService, private location: Location) {
  }

  ngOnInit(): void {
    this.data = this.route.snapshot.data.data;
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
    // if value is different from value set
    console.log('Rated ' + event.value);
  }
}
