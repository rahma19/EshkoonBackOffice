import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'app/services/order.service';
import { Subscription } from 'rxjs';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
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
   
  constructor(private orderService: OrderService,) { }

  filterData() {
    this.filteredData = this.profiles.filter(item => {
      // Return true if the item matches the search text
      return item?.first_name.toLowerCase().includes(this.searchText.toLowerCase())
      || item?.last_name.toLowerCase().includes(this.searchText.toLowerCase())
    });
  }


  ngOnInit() {
    this.orderService.getProfiles();
    this.serviceSubscribe = this.orderService.profiles$.subscribe(res => {
      this.profiles = res;   
      this.filteredData=res    
    })
  }

  getDetails(item){
    this.orderService.getProfile(item.profileId);
   this.profileSubscribe= this.orderService.profile$
    .subscribe( (data: any) => {      
      console.log(data);
      
     return  this.profile=  data;
    })
    // return this.profile;
  }

  async downloadAsPDF(item) {
     await this.getDetails(item);         
    setTimeout(() => {
      this.img= this.profile.qrImg ;
      const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
    }, 500);
     
  }
}
