import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  cardTypeSubject: BehaviorSubject<any>;
  allCardsSubject: BehaviorSubject<any>;
  subscriptionSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.cardTypeSubject = new BehaviorSubject([]);
    this.allCardsSubject = new BehaviorSubject([]);
this.subscriptionSubject= new BehaviorSubject([]);
   }

   public get cards$(): Observable<any> {
    return this.allCardsSubject.asObservable();
  }

  //Cards Crud
    getAllCards() {
    return this.http.get(`${'http://localhost:3000/api/v1'}/card/list`).pipe(map((allCards:any) => {
      console.log(allCards);
       this.allCardsSubject.next(allCards);
    }));
  }

  getCardByType(cardType:string) {
    return this.http.get(`${environment.apiUrl}/card/listType/${cardType}`).pipe(map(allCards => {
      console.log('type',allCards);
       this.allCardsSubject.next(JSON.parse(JSON.stringify(allCards)).data);
    }));
  }

  getCardById(cardId : string) {
    return this.http.get(`${environment.apiUrl}/card/view/${cardId}`);
  }

  createCard(card: any) {
    return this.http.post(`${environment.apiUrl}/card/create`, card).pipe(map(allCards => {
      console.log(allCards);
       this.allCardsSubject.next(JSON.parse(JSON.stringify(allCards)).data);
    }));
  }

  updateCard(cardId: string,payload:any) {
    return this.http.put(`${environment.apiUrl}/card/update/${cardId}`,payload).pipe(map(allCards => {
      console.log(allCards);
      // this.getAllCards();
       this.allCardsSubject.next(JSON.parse(JSON.stringify(allCards)).data);
    }));
  }

  deleteCard(cardId: string) {
    return this.http.delete(`${environment.apiUrl}/card/remove/${cardId}` ).pipe(map(allCards => {
      console.log(allCards);
       this.allCardsSubject.next(JSON.parse(JSON.stringify(allCards)).data);
    }));
  }

//Menu crud
getMenu() {
   return this.http.get(`${environment.apiUrl}/cardType/list`).pipe(map(cardTypes => {
    console.log(cardTypes);
     this.cardTypeSubject.next(cardTypes);
  }));
}

public get cardType$(): Observable<any> {
  return this.cardTypeSubject.asObservable();
}

getTypesValue(){
  return this.cardTypeSubject.value;
}

getmenuCardById(cardTypeId : string) {
  return this.http.get(`${environment.apiUrl}/cardType/view/${cardTypeId}`);
}

createmenuType(menu: any) {
  return this.http.post(`${environment.apiUrl}/cardType/create`, menu).pipe(map(cardTypes => {
    console.log(cardTypes);
     this.cardTypeSubject.next(JSON.parse(JSON.stringify(cardTypes)).data);
  }));
}

updatemenu(cardTypeId: string,payload:any) {  
  return this.http.put(`${environment.apiUrl}/cardType/update/${cardTypeId}`,payload)
  .pipe(map(cardTypes => {
    console.log(cardTypes);
     this.cardTypeSubject.next(JSON.parse(JSON.stringify(cardTypes)).data);
  }));
}

deletemenuType(cardTypeId: string) {
  console.log(cardTypeId);
  
  return this.http.delete(`${environment.apiUrl}/cardType/remove/${cardTypeId}` ).pipe(map(cardTypes => {
    console.log(cardTypes);
     this.cardTypeSubject.next(JSON.parse(JSON.stringify(cardTypes)).data);
  }));
}

//Subscription crud
getAllSubscription() {
  return this.http.get(`${environment.apiUrl}/subscription/list`).pipe(map(subscription => {
    console.log(subscription);
     this.subscriptionSubject.next(subscription);
  }));
}

public get subscription$(): Observable<any> {
  return this.subscriptionSubject.asObservable();

}

getSubscriptionById(subsId : string) {
  return this.http.get(`${environment.apiUrl}/subscription/view/${subsId}`);
}

createSubscription(subscription: any) {
  return this.http.post(`${environment.apiUrl}/subscription/create`, subscription).pipe(map(subscription => {
    console.log(subscription);
     this.subscriptionSubject.next(JSON.parse(JSON.stringify(subscription)).subscription);
  }));
}

updateSubscription(subsId: string,payload:any) {
  return this.http.put(`${environment.apiUrl}/subscription/update/${subsId}`,payload).pipe(map(subscription => {
    console.log(subscription);
     this.subscriptionSubject.next(JSON.parse(JSON.stringify(subscription)).subscription);
  }));
}

deleteSubscription(subsId: string) {
  return this.http.delete(`${environment.apiUrl}/subscription/remove/${subsId}` ).pipe(map(subscription => {
    console.log(subscription);
     this.subscriptionSubject.next(JSON.parse(JSON.stringify(subscription)).subscription);
  }));
}


}
