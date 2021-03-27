import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cord',
  templateUrl: './cord.component.html',
  styleUrls: ['./cord.component.scss']
})
export class CordComponent implements OnInit {

  @Input()
  cord: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
