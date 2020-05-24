import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concatenar'
})
export class ConcatenarPipe implements PipeTransform {

  transform(datos: string[], caracter: string = ', '): string {

    return datos.join( caracter );
  }

}
