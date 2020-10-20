import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import {environment} from '../../environments/environment';

@Pipe({
  name: 'dateFormatPipe'
})
export class AppDatePipe extends DatePipe implements PipeTransform {

  private format = environment.date_time_format;

  transform(value: any, args?: any): any {
    return super.transform(value, this.format);
  }

}
