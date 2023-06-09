import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderDetails: any;
  isLoading = true
  constructor(private route: ActivatedRoute, private orderService: OrderService) {
    setTimeout(() => {
      this.isLoading = false; // Set isLoading to false when loading is complete
    }, 1000);
   }
  param: any;
  value = "dfgfdv";
  path = 'https://backend.e-shkoon.com/uploads/cards/';

  cart: any[] = []
  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('orderId');
    this.orderService.getOrderDetails(this.param).subscribe((order: any) => {
      this.cart = [];
      order.orderDetails.forEach((element: any) => {
        this.orderService.getCardById(element.cardCardId).subscribe((res: any) => {
          element.cardType = res.card_type
          if(res?.card_type?.name.includes('Google')){
            element.price=Number(element?.card?.price);
          }
          else{
            element.price=Number(element?.card.price)+Number(element?.subscription.price);
          }
        })
        this.cart.push(element);

      });
    })
  }


}
