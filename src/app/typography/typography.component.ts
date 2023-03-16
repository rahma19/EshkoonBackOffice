import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCardComponent } from '../create-card/create-card.component';
import { CardsService } from 'app/services/cards.service';
import { Subscription } from 'rxjs';
import { DeleteCardComponent } from 'app/delete-card/delete-card.component';
import { UpdateCardComponent } from 'app/update-card/update-card.component';
import { UpdateTypeCarteComponent } from 'app/update-type-carte/update-type-carte.component';
import { CreateTypeCarteComponent } from 'app/create-type-carte/create-type-carte.component';
import { DeleteTypeCarteComponent } from 'app/delete-type-carte/delete-type-carte.component';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  menu:any[]=[];
  serviceSubscribe:Subscription = new Subscription();
  
    constructor(private cardService : CardsService,public dialog: MatDialog) { }
  
    
   add() {    
    const dialogRef = this.dialog.open(CreateTypeCarteComponent, {
      width: '400px',
      disableClose: true ,
      backdropClass:'cdk-overlay-transparent-backdrop'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  edit(data: any) {
    console.log(data);
    
    const dialogRef = this.dialog.open(UpdateTypeCarteComponent, {
      width: '400px',
      data: {cardTypeId:data.cardTypeId,name:data.name //,price:data.price
      }
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
    const dialogRef = this.dialog.open(DeleteTypeCarteComponent, {
      width: '400px',
      data: {cardTypeId:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cardService.deletemenuType(id);
      }
    });
  }

  /**
   * initialize data-table by providing persons list to the dataSource.
   */
  ngOnInit(): void {
    this.cardService.getMenu().subscribe((res:any)=>{
      console.log(res);
      // this.cards=res;
    })
    this.cardService.getMenu();
    this.serviceSubscribe = this.cardService.cardType$.subscribe(res => {
      this.menu = res;  
      console.log(res);
          
    })
  }

}
