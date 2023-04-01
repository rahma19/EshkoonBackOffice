import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderSubject: BehaviorSubject<any>;
  orderDetailsSubject: BehaviorSubject<any>;
  profilesSubject: BehaviorSubject<any>;
  featureSubject: BehaviorSubject<any>;
  profileSubject: BehaviorSubject<any>;
  CounterSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.orderSubject = new BehaviorSubject([]);
    this.orderDetailsSubject = new BehaviorSubject([]);
    this.profilesSubject  = new BehaviorSubject([]);
    this.featureSubject  = new BehaviorSubject([]);
    this.profileSubject  = new BehaviorSubject([]);
    this.CounterSubject = new BehaviorSubject(0);
  }

  getCardById(cardId : string) {
    return this.http.get(`${environment.apiUrl}/card/view/${cardId}`);
  }
  
  public get orders$(): Observable<any> {
    return this.orderSubject.asObservable();
  }

  public get orderDetails$(): Observable<any> {
    return this.orderDetailsSubject.asObservable();
  }

  public get profiles$(): Observable<any> {
    return this.profilesSubject.asObservable();
  }

  public get profile$(): Observable<any> {
    return this.profileSubject.asObservable();
  }

  public get features$(): Observable<any> {
    return this.featureSubject.asObservable();
  }

  public get counter$(): Observable<any> {
    return this.CounterSubject.asObservable();
  }

  //createFeature
  createFeature(feature: any) {
    return this.http.post(`${environment.apiUrl}/feature/create`, feature).pipe(map(features => {
       this.featureSubject.next(JSON.parse(JSON.stringify(features)).data);
    }));
  }

  //get all profiles
  getProfiles() {
    return this.http.get(`${environment.apiUrl}/profile/list`).subscribe((res:any) => {
       this.profilesSubject.next(res);
    });
  }

  //get profile
  getProfile(profileId) {
    return this.http.get(`${environment.apiUrl}/profile/view/${profileId}`)
    .subscribe((res:any) => {
       this.profileSubject.next(res);
    });
  }
  
  //get all features
  getFeatures() {
    return this.http.get(`${environment.apiUrl}/feature/list`).pipe(map((res:any) => {
       this.featureSubject.next(res);
    }));
  }

   //get all orders
   getAllOrders() {
    return this.http.get(`${environment.apiUrl}/order/list`).subscribe((orders:any) => {
      this.orderSubject.next(orders.orders);
      let s =0 ;
      orders.orders.forEach(element => {          
        if(element.status=='ACTIVATED'){
          s++;
          this.CounterSubject.next(s);
        }})
    });
  }

  //get AllOrderDetails
  getAllOrderDetails() {
    return this.http.get(`${environment.apiUrl}/order/listOrders`).pipe(map((orders:any) => {
      
       this.orderDetailsSubject.next(orders);
    }));
  }

  //get orderDetails by order
  getOrderDetails(orderId){
    return this.http.get(`${environment.apiUrl}/order/listDetails/${orderId}`).subscribe((orders:any) => {
       this.orderDetailsSubject.next(orders.orderDetails);
    });
  }

  //update order status 
  updateOrder(order:any){
    console.log(order);
    let obj={status:order.status,
      enabled : order.enabled
    }
    return this.http.put(`${environment.apiUrl}/order/update/${order.orderId}`,obj).pipe(map((orders:any) => {
       this.orderSubject.next(orders.data);
       let c =this.CounterSubject.value;
       this.CounterSubject.next(c++);
    }));
  }

  //delete feature 
  deletefeature(featureId){
    return this.http.delete(`${environment.apiUrl}/feature/remove/${featureId}` ).pipe(map(features => {
       this.featureSubject.next(JSON.parse(JSON.stringify(features)).data);
    }));
  }
}
