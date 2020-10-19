import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-song-instructions-dialog',
  templateUrl: './song-instructions-dialog.component.html',
  styleUrls: ['./song-instructions-dialog.component.scss']
})
export class SongInstructionsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: SongInstructionsType,
              public dialogRef: MatDialogRef<SongInstructionsDialogComponent, void>) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}

export enum SongInstructionsType {
  ADD, EDIT
}
