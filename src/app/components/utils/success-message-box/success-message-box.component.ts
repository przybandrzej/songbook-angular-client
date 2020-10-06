import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-success-message-box',
  templateUrl: './success-message-box.component.html',
  styleUrls: ['./success-message-box.component.scss']
})
export class SuccessMessageBoxComponent implements OnInit {

  @Input()
  messages: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
