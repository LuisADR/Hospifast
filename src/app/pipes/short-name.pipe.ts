import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName'
})
export class ShortNamePipe implements PipeTransform {

  transform(name: string, numero: number = 1): string {

    const names = name.split(' ', numero);

    return names.join(' ');
  }

}
