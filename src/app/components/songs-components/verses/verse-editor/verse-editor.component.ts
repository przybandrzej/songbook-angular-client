import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CreateVerseDTO} from '../../../../songbook';

@Component({
  selector: 'app-verse-editor',
  templateUrl: './verse-editor.component.html',
  styleUrls: ['./verse-editor.component.scss']
})
export class VerseEditorComponent implements OnInit {

  @Input()
  verse: CreateVerseDTO;

  @Output()
  verseChange: EventEmitter<CreateVerseDTO> = new EventEmitter<CreateVerseDTO>();

  constructor() {
  }

  ngOnInit(): void {
  }

  addLine() {
    this.verse.lines.push({content: '', order: this.verse.lines.length, cords: []});
  }
}
