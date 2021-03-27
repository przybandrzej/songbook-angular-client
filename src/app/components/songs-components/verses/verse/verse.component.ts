import {Component, Input, OnInit} from '@angular/core';
import {SongVerseData} from '../../../../model/song-details-data';
import {SortingAlgorithms} from '../../../../utils/sorting-algorithms';

@Component({
  selector: 'app-verse',
  templateUrl: './verse.component.html',
  styleUrls: ['./verse.component.scss']
})
export class VerseComponent implements OnInit {

  @Input()
  verse: SongVerseData;

  constructor() { }

  ngOnInit(): void {
    this.verse.lines.sort(SortingAlgorithms.compareLinesOrder);
  }

}
