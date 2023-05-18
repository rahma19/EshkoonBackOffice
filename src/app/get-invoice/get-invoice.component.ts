import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatStepper } from '@angular/material/stepper';
import jsPDF from 'jspdf';
const htmlToPdfmake = require("html-to-pdfmake");
import html2canvas from 'html2canvas';
import { CardsService } from 'app/services/cards.service';
import { AuthService } from 'app/services/auth.service';
import { NavbarService } from 'app/services/navbar.service';
import { OrderService } from 'app/services/order.service';


@Component({
  selector: 'app-get-invoice',
  templateUrl: './get-invoice.component.html',
  styleUrls: ['./get-invoice.component.css']
})
export class GetInvoiceComponent implements OnInit {
  totale = 0;
  sous_totale = 0;
  loading = false;
  address = ''
  phoneNum = ''
  frait_expedition = 5;
  user = { name: '', lastName: '' }
  carts: any[] = []
  subsService: Subscription = new Subscription;
  constructor(private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cardService: CardsService, private toastr: ToastrService, private nav: NavbarService,
    private router: Router, public dialog: MatDialog, private authService: AuthService, private orderService: OrderService) {
  }
  orderDetail: any[]
  order: any
  google: any;
  menu: any;

  ngOnInit(): void {
    this.nav.hide()
    this.loading = true;
    let id = this.route.snapshot.params['orderId'];

    this.orderService.getOrderById(id).subscribe((res: any) => {
      this.order = res.order
      this.totale = res.order.total
      this.sous_totale = res.order.total
      let num = this.sous_totale * 0.81;
      this.frait_expedition = Number(num.toFixed(3)); 
      this.orderService.getOrderDetails(id).subscribe((data: any) => {
        this.orderDetail = []
        data.orderDetails.forEach((element: any) => {
        this.orderService.getCardById(element.card.cardId).subscribe((card: any) => {
          element.price = Number(element?.subscription?.price) + Number(element?.card?.price)
          element.cardType = card?.card_type

          if (element?.cardType?.name.toLowerCase().includes('google')) {
            this.google = element;
            element.price = Number(element?.card?.price);
          }
          else
            if (element?.cardType?.name.toLowerCase().includes('menu')) {
              this.menu = element;
              element.price = Number(element?.card?.price) + Number(element?.subscription?.price) + (5 * element?.nbrMenu);
            }
            else {
              element.price = Number(element?.card?.price) + Number(element?.subscription?.price);
            }
        })
          this.orderDetail.push(element);
        });
      })
    })

  }

  downloadAsPDF() {
    window.print()
  }

}