import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeInterval'
})
export class TimeIntervalPipe implements PipeTransform {

  transform(value: number): string {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    if (value < minute) {
      const plural = value > second ? 's' : '';
      return value / second + ' second' + plural;
    } else if (value < hour) {
      const plural = value > minute ? 's' : '';
      return value / minute + ' minute' + plural;
    } else if (value >= hour) {
      const plural = value > hour ? 's' : '';
      return value / hour + ' hour' + plural;
    }
  }

}
