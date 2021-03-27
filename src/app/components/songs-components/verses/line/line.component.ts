import {Component, Input, OnInit} from '@angular/core';
import {VerseLineData} from '../../../../model/song-details-data';
import {SortingAlgorithms} from '../../../../utils/sorting-algorithms';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  @Input()
  line: VerseLineData;

  cords = '';

  constructor() {
  }

  ngOnInit(): void {
    this.line.cords.sort(SortingAlgorithms.compareCordsPosition);
    this.processCords();
  }

  processCords() {
    this.line.cords.forEach(cord => {
      const lastPosition = this.cords.length - 1;
      const spacesToAdd = cord.position - lastPosition;
      for (let i = 0; i < spacesToAdd; i++) {
        this.cords = this.cords + ' ';
      }
      this.cords = this.cords + cord.content;
    });
  }

}
