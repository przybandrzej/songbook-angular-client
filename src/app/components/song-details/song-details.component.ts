import {Component, OnInit} from '@angular/core';
import {AuthorResourceService, SongCoauthorDTO, SongDTO, SongResourceService} from '../../songbook';
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
    edits: [],
    addedBy: null,
    guitarTabs: '',
    id: -1,
    lyrics: '',
    tags: [],
    title: '',
    trivia: ''
  };

  coauthors = [];

  constructor(private songService: SongResourceService, private authorService: AuthorResourceService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.songId = +this.route.snapshot.paramMap.get('id');
    this.songService.getByIdUsingGET4(this.songId).subscribe(res => {
      this.song = res;
      this.getCoauthors();
    });
  }

  getCoauthors() {
    for (const coauthor of this.song.coauthors) {
      this.authorService.getByIdUsingGET(coauthor.authorId).subscribe(res => this.coauthors.push({
        name: res.name,
        coauthorFunction: coauthor.coauthorFunction
      }));
    }
  }

  editSong() {
    this.router.navigateByUrl('edit-song/' + this.songId);
  }

  deleteSong() {
    if (this.songId > 0) {
      this.songService.deleteUsingDELETE4(this.songId).subscribe();
      this.router.navigateByUrl('songs');
    }
  }

  close() {
    this.router.navigateByUrl('songs');
  }
}
