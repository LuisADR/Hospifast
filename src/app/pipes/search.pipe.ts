import { Pipe, PipeTransform } from '@angular/core';
import { Phone } from '../models/phone.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(array: Phone[], type: string = 'Personal'): string {

    if (array === undefined) {
      return 'Sin informacion';
    }

    for (const i of array){
      if (i.type === type) {
        return i.phone;
      }
    }

    return array[0].phone;
  }

}
