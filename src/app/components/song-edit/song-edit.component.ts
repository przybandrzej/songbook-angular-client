import { Component, OnInit } from '@angular/core';
import {SongDTO, SongRestControllerService} from '../..';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.scss']
})
export class SongEditComponent implements OnInit {

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

  constructor(private songRestControllerService: SongRestControllerService, private route: ActivatedRoute, private router: Router, snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.songId = +this.route.snapshot.paramMap.get('id');
    this.songRestControllerService.getByIdUsingGET3(this.songId).subscribe(res => this.song = res);
  }

  cancel() {
    if(this.songId > 0) {
      this.router.navigateByUrl('song/' + this.songId);
    } else {
      this.router.navigateByUrl('songs');
    }
  }

  saveSong() {
    if(this.songId > 0) {
      // put
    } else {
      // post
    }
  }
}
