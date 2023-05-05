import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'app/services/order.service';
import { Observable, Observer, Subscription } from 'rxjs';
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
   path='https://backend.e-shkoon.com/uploads/qrcodes/';
   searchText = '';
   filteredData: any[] = [];
   isLoading=true
  constructor(private orderService: OrderService,public dialog: MatDialog) {
    setTimeout(() => {
      this.isLoading = false; // Set isLoading to false when loading is complete
    }, 1000);
   }
   name = "Mr";
   base64Image: any;
 
 
   downloadImage(img) {
    let imageUrl =this.path+img
     this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
       this.base64Image = "data:image/jpg;base64," + base64data;
       // save image to disk
       var link = document.createElement("a");
 
       document.body.appendChild(link); // for Firefox
 
       link.setAttribute("href", this.base64Image);
       link.setAttribute("download", "mrHankey.jpg");
       link.click();
     });
   }
 
   getBase64ImageFromURL(url: string) {
     return Observable.create((observer: Observer<string>) => {
       const img: HTMLImageElement = new Image();
       img.crossOrigin = "Anonymous";
       img.src = url;
       if (!img.complete) {
         img.onload = () => {
           observer.next(this.getBase64Image(img));
           observer.complete();
         };
         img.onerror = err => {
           observer.error(err);
         };
       } else {
         observer.next(this.getBase64Image(img));
         observer.complete();
       }
     });
   }
 
   getBase64Image(img: HTMLImageElement) {
     const canvas: HTMLCanvasElement = document.createElement("canvas");
     canvas.width = img.width;
     canvas.height = img.height;
     const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
     ctx.drawImage(img, 0, 0);
     const dataURL: string = canvas.toDataURL("image/png");
 
     return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
   }

  ngOnInit() {
    this.orderService.getProfiles();
    this.serviceSubscribe = this.orderService.profiles$.subscribe(res => {
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
    });
  }

  
}
