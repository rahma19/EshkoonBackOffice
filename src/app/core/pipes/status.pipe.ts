import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class status implements PipeTransform {

  transform(status: any) {
    switch(status){
     
      case "pending" : {
        return 'EN ATTENTE';
      }
      case "ACTIVATED" : {
        return 'ACTIF';
      }
      case "DISABLED" : {
        return 'INACTIF';
      }
  }
}
}
