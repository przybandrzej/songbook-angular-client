import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-rating-star',
  templateUrl: './rating-star.component.html',
  styleUrls: ['./rating-star.component.scss']
})
export class RatingStarComponent implements OnInit {

  @Input()
  amount = 5;

  @Input('value')
  set setValue(value: number) {
    this.value = value;
    for (let index = 0; index < this.value; index++) {
      this.selected.push(index + 1);
    }
  }

  @Output()
  valueChange: EventEmitter<RatingChanged> = new EventEmitter<RatingChanged>();

  labels: number[] = [];
  selected: number[] = [];
  value = 0;

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
    this.valueChange.emit({value: label});
  }

}

export interface RatingChanged {
  value: number;
}
