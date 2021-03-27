import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CreateGuitarCordDTO, CreateLineDTO} from '../../../../songbook';

@Component({
  selector: 'app-line-editor',
  templateUrl: './line-editor.component.html',
  styleUrls: ['./line-editor.component.scss']
})
export class LineEditorComponent implements OnInit {

  @Input()
  line: CreateLineDTO;

  @Output()
  lineChange: EventEmitter<CreateLineDTO> = new EventEmitter<CreateLineDTO>();

  constructor() {
  }

  ngOnInit(): void {
  }

  addCord(index: number) {
    const cord: CreateGuitarCordDTO = {
      content: '',
      position: index
    };
    this.line.cords.splice(index, 1, cord);
  }

  cordExists(index: number): boolean {
    return this.line.cords.filter(it => it.position === index).length > 0;
  }

  getCord(index: number): CreateGuitarCordDTO {
    return this.line.cords.filter(it => it.position === index)[0];
  }
}
