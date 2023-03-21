import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderDetails:any;
  constructor(private route: ActivatedRoute,private orderService:OrderService) { }
  param:any;
value="dfgfdv";
cart:any
  ngOnInit(): void {
    this.param  = this.route.snapshot.paramMap.get('orderId');  
    console.log(this.param);
    this.orderService.getOrderDetails(this.param);
    this.orderService.orderDetails$.subscribe((order: any) => {
      this.cart = order;
      console.log(this.cart);
      
    })  }

}
