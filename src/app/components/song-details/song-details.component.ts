import {Component, OnInit} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {SongDetailsData} from '../../model/songDetailsData';
import {SongResourceService} from '../../songbook';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss']
})
export class SongDetailsComponent implements OnInit {

  data: SongDetailsData;

  constructor(private route: ActivatedRouteSnapshot, private router: Router, private songService: SongResourceService) {
  }

  ngOnInit(): void {
    this.data = this.route.data.data;
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
    this.router.navigateByUrl('songs');
  }
}
