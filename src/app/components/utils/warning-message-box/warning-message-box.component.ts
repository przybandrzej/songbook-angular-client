import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-warning-message-box',
  templateUrl: './warning-message-box.component.html',
  styleUrls: ['./warning-message-box.component.scss']
})
export class WarningMessageBoxComponent implements OnInit {

  @Input()
  public message = '';

  constructor() { }

  ngOnInit(): void {
  }

}
