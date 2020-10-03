import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-rating-star',
  templateUrl: './rating-star.component.html',
  styleUrls: ['./rating-star.component.scss']
})
export class RatingStarComponent implements OnInit {

  @Input()
  amount = 5;

  @Output()
  ratingChange: EventEmitter<RatingChanged> = new EventEmitter<RatingChanged>();

  labels: number[] = [];
  selected: number[] = [];

  constructor() {
  }

  ngOnInit(): void {
    for (let index = 0; index < this.amount; index++) {
      this.labels.push(index + 1);
    }
  }

  onClick(label: number) {
    this.selected = [];
    for (let index = 1; index <= label; index++) {
      this.selected.push(index);
    }
    this.ratingChange.emit({value: label});
  }

}

export interface RatingChanged {
  value: number;
}
