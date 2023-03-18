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

  constructor(private http: HttpClient) {
    this.orderSubject = new BehaviorSubject([]);
    this.orderDetailsSubject = new BehaviorSubject([]);
  }

  public get orders$(): Observable<any> {
    return this.orderSubject.asObservable();
  }

  public get orderDetails$(): Observable<any> {
    return this.orderSubject.asObservable();
  }

   //get all orders
   getAllOrders() {
    return this.http.get(`${environment.apiUrl}/order/list`).pipe(map((orders:any) => {
      console.log(orders);
       this.orderSubject.next(orders.orders);
    }));
  }

  getOrderDetails(){
    return this.http.get(`${environment.apiUrl}/order/listDetails`).pipe(map((orders:any) => {
      console.log(orders);
       this.orderDetailsSubject.next(orders.orders);
    }));
  }
}
