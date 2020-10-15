import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-nav-tile',
  templateUrl: './nav-tile.component.html',
  styleUrls: ['./nav-tile.component.scss']
})
export class NavTileComponent implements OnInit {

  @Input() color: string;
  @Input() title: string;
  @Input() icon: string;

  @Output()
  action: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.action.emit();
  }
}
