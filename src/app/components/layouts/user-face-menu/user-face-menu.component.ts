import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-face-menu',
  templateUrl: './user-face-menu.component.html',
  styleUrls: ['./user-face-menu.component.scss']
})
export class UserFaceMenuComponent implements OnInit {

  @Input()
  toggle = false;

  constructor() { }

  ngOnInit(): void {
  }

}
