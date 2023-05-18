import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userStatus'
})
export class userStatus implements PipeTransform {

  transform(userStatus: any) {
    switch(userStatus){
     
      case true : {
        return 'Activé';
      }
      case false : {
        return 'En attente';
      }
  }
}
}
