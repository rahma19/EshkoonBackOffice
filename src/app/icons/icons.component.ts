import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'app/services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {

  orders:any;
  serviceSubscribe:Subscription = new Subscription();
  
    constructor(private orderService : OrderService,private router:Router) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe((res:any)=>{

      })
      this.orderService.getAllOrders();
      this.orderService.orders$.subscribe((order:any)=>{
        this.orders=order;
console.log(order);
    })
  }

  orderDetails(orderId:any){
    console.log(orderId);
    
    this.router.navigateByUrl(`order-dtails/${orderId}`);
  }

  downloadAsPDF(){

  }

}
