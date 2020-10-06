import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-processing-message-box',
  templateUrl: './processing-message-box.component.html',
  styleUrls: ['./processing-message-box.component.scss']
})
export class ProcessingMessageBoxComponent implements OnInit {

  @Input()
  message: string;

  constructor() { }

  ngOnInit(): void {
  }

}
