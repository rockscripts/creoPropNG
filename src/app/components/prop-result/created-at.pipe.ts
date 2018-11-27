import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
moment.locale('es-ES')

@Pipe({
  name: 'createdAt'
})
export class CreatedAtPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let currentVal = moment(value);
    let today = moment();
    let diff = today.diff(currentVal, 'days');

    return diff ? currentVal.format('DD MMM') : currentVal.format('h:mm A');
  }

}
