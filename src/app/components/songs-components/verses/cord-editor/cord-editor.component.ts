import {Component, Input, OnInit} from '@angular/core';
import {CreateGuitarCordDTO} from '../../../../songbook';

@Component({
  selector: 'app-cord-editor',
  templateUrl: './cord-editor.component.html',
  styleUrls: ['./cord-editor.component.scss']
})
export class CordEditorComponent implements OnInit {

  @Input()
  cord: CreateGuitarCordDTO;

  constructor() { }

  ngOnInit(): void {
  }

}
