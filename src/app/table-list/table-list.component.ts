import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCardComponent } from '../create-card/create-card.component';
import { CardsService } from 'app/services/cards.service';
import { Subscription } from 'rxjs';
import { DeleteCardComponent } from 'app/delete-card/delete-card.component';
import { UpdateCardComponent } from 'app/update-card/update-card.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']  
})
export class TableListComponent{
cards:any[]=[];
searchText = '';
filteredData: any[] = [];
displayedColumns = ['Nom', 'Type','Prix','Description','Image','Detail'];
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
dataSource: MatTableDataSource<any>;

serviceSubscribe:Subscription = new Subscription();
path='http://localhost:3000/uploads/cards/';
isLoading=true
  constructor(private cardService : CardsService,public dialog: MatDialog) {
    setTimeout(() => {
      this.isLoading = false; // Set isLoading to false when loading is complete
    }, 1000);
   }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.cardService.getAllCards().subscribe((res:any)=>{
    })
      this.cardService.getAllCards();
      this.serviceSubscribe = this.cardService.cards$.subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
    })
  }


  add() {    
    const dialogRef = this.dialog.open(CreateCardComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
    })
  }

  edit(data: any) {    
    const dialogRef = this.dialog.open(UpdateCardComponent, {
      width: '600px',
      data //: {
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
      if (result) {
        // this.cardService.updatemenu(data.cardTypeId,result).pipe(first())
        //     .subscribe(
        //       data => {
                console.log(this.cardService.cardTypeSubject.value);
                // this.cardService.getMenu();
                // window.location.reload();
              // },
              // error => {
              // });
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(DeleteCardComponent, {
      width: '400px',
      data: {cardId:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cardService.deletemenuType(id);
      }
    });
  }

}
