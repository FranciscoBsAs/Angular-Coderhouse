import { Pipe, PipeTransform } from '@angular/core';
import { pipeFullNameInterface } from '../sharedContent/entities';


@Pipe({
  name: 'fullNamePipe'
})

export class FullNamePipe implements PipeTransform {

  transform( value : pipeFullNameInterface ) : string {

    return(
      `${ value.name } ${ value.surname }`
    )
  }

}
