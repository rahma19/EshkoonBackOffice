import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'app/services/order.service';
import { Subscription } from 'rxjs';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
const htmlToPdfmake = require("html-to-pdfmake");
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent  {
  displayedColumns = ['CommandeID', 'Client','Nbr','Total','Date','Status','Facture','Livrer','Detail'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
id:any="";
user='';
  orders: any;
  firstName='';
  lastName='';
  orderDetail:any[]=[]
  subs='';
  cardName='';
total=0;
phoneNum='';
address='';
searchText = '';
dte:any
substotal=0;
isLoading =true
  constructor(private orderService: OrderService, private router: Router) {
    setTimeout(() => {
      this.isLoading = false; // Set isLoading to false when loading is complete
    }, 1000);
   }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.orderService.getAllOrders();
    this.orderService.orders$.subscribe((order: any) => {
      this.orders = order;
      this.dataSource = new MatTableDataSource(order);
      this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
  
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  orderDetails(orderId: any) {
    this.router.navigateByUrl(`order-dtails/${orderId}`);
  }

  getDetails(item){    
    this.orderService.getOrderDetails(item.orderId);
    var order ;
    this.orderService.orderDetails$.subscribe( (data: any) => {
       order=  data.orderDetails;
    })
    return order;
  }

  async downloadAsPDF(item) {
    //  var order =await this.getDetails(item)
  

  // });
  // })
    // setTimeout(() => {
    //   const pdfTable = this.pdfTable.nativeElement;
    // var html = htmlToPdfmake(pdfTable.innerHTML);
    // const documentDefinition = { content: html };
    // pdfMake.createPdf(documentDefinition).open(); 
    // }, 500);
    this.router.navigateByUrl(`/exportInvoice/${item.orderId}`);

    // this.router.navigate(['exportInvoice',item.orderId]);
     
  }

  onChangeStatus(e, order) {
    let enabled = e.checked ? true : false;
    if (enabled == false) {
      order.status = 'DISABLED';
      order.enabled = false; 
      // this.orderService.updateOrder(order);
    }
    else if (enabled == true) {
      order.status = 'ACTIVATED';
      order.enabled = true; 
      this.orderService.updateOrder(order).subscribe((order: any) => {

      });
      // this.msgs = [{severity:'info', summary:'Le restaurant est actif', detail:''}];
    }
   

  }
}


