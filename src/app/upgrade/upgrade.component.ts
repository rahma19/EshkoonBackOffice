import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'app/services/order.service';
import { Subscription } from 'rxjs';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProfileComponent } from 'app/update-profile/update-profile.component';
const htmlToPdfmake = require("html-to-pdfmake");
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})

export class UpgradeComponent implements OnInit {
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  profile:any;
  img:any="";
   profiles: any[]=[];
   private serviceSubscribe: Subscription = new Subscription; 
   private profileSubscribe: Subscription = new Subscription; 
   path='http://localhost:3000/uploads/qrcodes/';
   searchText = '';
   filteredData: any[] = [];
   isLoading=true
  constructor(private orderService: OrderService,public dialog: MatDialog) {
    setTimeout(() => {
      this.isLoading = false; // Set isLoading to false when loading is complete
    }, 1000);
   }

  ngOnInit() {
    this.orderService.getProfiles();
    this.serviceSubscribe = this.orderService.profiles$.subscribe(res => {
console.log(res);

      this.profiles = res;   
      this.filteredData=res    
    })
  }

  async downloadAsPDF(item) {  
     this.img= item ;
      
    setTimeout(() => {
      const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    
    pdfMake.createPdf(documentDefinition).download(); 
    }, 500);
     
  }

  edit(data: any) {    
    const dialogRef = this.dialog.open(UpdateProfileComponent, {
      width: '600px',
      data : {link : data.link, profileId : data.profileId} 
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
    });
  }

  
}
