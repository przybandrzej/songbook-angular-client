import {SongVerseData, VerseLineData} from '../model/song-details-data';
import {GuitarCordDTO} from '../songbook';

export class SortingAlgorithms {

  private constructor() {
  }

  public static compareVersesOrder(verse1: SongVerseData, verse2: SongVerseData): number {
    if (verse1.verse.order < verse2.verse.order) {
      return -1;
    }
    if (verse1.verse.order > verse2.verse.order) {
      return 1;
    }
    return 0;
  }

  public static compareLinesOrder(line1: VerseLineData, line2: VerseLineData): number {
    if (line1.line.order < line2.line.order) {
      return -1;
    }
    if (line1.line.order > line2.line.order) {
      return 1;
    }
    return 0;
  }

  public static compareCordsPosition(cord1: GuitarCordDTO, cord2: GuitarCordDTO): number {
    if (cord1.position < cord2.position) {
      return -1;
    }
    if (cord1.position > cord2.position) {
      return 1;
    }
    return 0;
  }
}
