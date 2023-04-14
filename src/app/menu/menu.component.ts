import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'app/services/order.service';
import { Subscription } from 'rxjs';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProfileComponent } from 'app/update-profile/update-profile.component';
import { MenuService } from 'app/services/menu.service';
const htmlToPdfmake = require("html-to-pdfmake");
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

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
  constructor(private orderService: OrderService,public dialog: MatDialog,private menuService: MenuService) {
    setTimeout(() => {
      this.isLoading = false; // Set isLoading to false when loading is complete
    }, 1000);
   }

  filterData() {
    this.filteredData = this.profiles.filter(item => {
      // Return true if the item matches the search text
      return item?.first_name.toLowerCase().includes(this.searchText.toLowerCase())
      || item?.last_name.toLowerCase().includes(this.searchText.toLowerCase())
      || item?.restoName.toLowerCase().includes(this.searchText.toLowerCase())
      || item?.email.toLowerCase().includes(this.searchText.toLowerCase())
      || item?.phoneNum.toLowerCase().includes(this.searchText.toLowerCase())
      || item?.nbrMenu.includes(Number(this.searchText))
    });
  }


  ngOnInit() {
    this.menuService.getAllMenu();
    this.serviceSubscribe = this.menuService.menu$.subscribe(res => {
      console.log(res);
      this.filteredData=res    
      
    })

    // this.orderService.getProfiles();
    // this.serviceSubscribe = this.orderService.profiles$.subscribe(res => {

    //   this.profiles = res;   
    //   this.filteredData=res    
    // })
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
    });
  }

  

}
