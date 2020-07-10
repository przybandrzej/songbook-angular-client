import {Component, OnInit} from '@angular/core';
import {SongDTO, SongRestControllerService} from '../..';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss']
})
export class SongDetailsComponent implements OnInit {

  songId: number;
  song: SongDTO = {
    author: {
      id: -1,
      name: ''
    },
    averageRating: 0,
    category: {
      id: -1,
      name: ''
    },
    coauthors: [],
    creationTime: '',
    guitarTabs: '',
    id: -1,
    lyrics: '',
    tags: [],
    title: '',
    trivia: ''
  };

  constructor(private songRestControllerService: SongRestControllerService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.songId = +this.route.snapshot.paramMap.get('id');
    this.songRestControllerService.getByIdUsingGET3(this.songId).subscribe(res => this.song = res);
  }

  editSong() {
    this.router.navigateByUrl('song/' + this.songId + '/edit');
  }

  deleteSong() {
    if (this.songId > 0) {
      this.songRestControllerService.deleteUsingDELETE4(this.songId).subscribe();
      this.router.navigateByUrl('songs');
    }
  }
}
