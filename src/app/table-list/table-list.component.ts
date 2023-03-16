import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCardComponent } from '../create-card/create-card.component';
import { CardsService } from 'app/services/cards.service';
import { Subscription } from 'rxjs';
import { DeleteCardComponent } from 'app/delete-card/delete-card.component';
import { UpdateCardComponent } from 'app/update-card/update-card.component';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']  
})
export class TableListComponent implements OnInit {
cards:any[]=[];
serviceSubscribe:Subscription = new Subscription();
path='http://localhost:3000/uploads/cards/';

  constructor(private cardService : CardsService,public dialog: MatDialog) { }

  ngOnInit() {
    this.cardService.getAllCards().subscribe((res:any)=>{
      console.log(res);
      // this.cards=res;
    })
    this.cardService.getAllCards();
    this.serviceSubscribe = this.cardService.cards$.subscribe(res => {
      console.log('res', res);
      this.cards = res;       
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
    console.log(data);
    
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
