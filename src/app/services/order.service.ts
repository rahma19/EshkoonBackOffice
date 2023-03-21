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
    return this.orderDetailsSubject.asObservable();
  }

   //get all orders
   getAllOrders() {
    return this.http.get(`${environment.apiUrl}/order/list`).pipe(map((orders:any) => {
      console.log(orders);
       this.orderSubject.next(orders.orders);
    }));
  }

  getOrderDetails(orderId){
    return this.http.get(`${environment.apiUrl}/order/listDetails/${orderId}`).subscribe((orders:any) => {
       this.orderDetailsSubject.next(orders.orders);
    });
  }

  //update order status 
  updateOrder(order:any){
    console.log(order);
    let obj={status:order.status,
      enabled : order.enabled
    }
    return this.http.put(`${environment.apiUrl}/order/update/${order.orderId}`,obj).pipe(map((orders:any) => {
      console.log(orders);
       this.orderSubject.next(orders.data);
    }));
  }
}
