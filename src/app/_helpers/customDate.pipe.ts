import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'customFormat'
})
export class CustomDatePipe extends DatePipe implements PipeTransform {
  transform(value: Date | string | number, format?: string, timezone?: string, locale?: string): string | any {
    return super.transform(value, 'dd/MM/yyyy');
  }
}
