import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class status implements PipeTransform {

  transform(status: any) {
    switch(status){
     
      case "pending" : {
        return 'En attente';
      }
      case "ACTIVATED" : {
        return 'Livrée';
      }
      case "DISABLED" : {
        return 'Annulée';
      }
  }
}
}
