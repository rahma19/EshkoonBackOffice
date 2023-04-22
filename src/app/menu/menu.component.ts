import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MenuService } from 'app/services/menu.service';
const htmlToPdfmake = require("html-to-pdfmake");
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  {
  displayedColumns = ['MenuID', 'Client','Numéro de téléphone','Nom Resto','Nombre des tables','Date','Qr code','modifier'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>=new MatTableDataSource([]);
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
id:any="";
path='http://localhost:3000/uploads/qrcodes/';
img:any="";

isLoading =true
  constructor(private menuService: MenuService, private router: Router) {
    setTimeout(() => {
      this.isLoading = false; // Set isLoading to false when loading is complete
    }, 1000);
   }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {

    this.menuService.getAllMenu().subscribe((menu: any) => {
      this.dataSource = new MatTableDataSource(menu);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  menuDetails(menu: any) {
    this.router.navigate(['menuList'],{ queryParams: menu });
  }

  onChangeStatus(e, menu) {
    let enabled = e.checked ? true : false;
    if (enabled == false) {
      menu.status = 'DISABLED';
      menu.enabled = false; 
      // this.menuService.updatemenu(menu);
    }
    else if (enabled == true) {
      menu.status = 'ACTIVATED';
      menu.enabled = true; 
      // this.msgs = [{severity:'info', summary:'Le restaurant est actif', detail:''}];
    }
    this.menuService.updateMenu(menu,e).subscribe((menu: any) => {

    });

  }
}