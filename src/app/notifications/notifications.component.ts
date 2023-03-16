import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateSubscriptionComponent } from 'app/create-subscription/create-subscription.component';
import { DeleteSubscriptionComponent } from 'app/delete-subscription/delete-subscription.component';
import { CardsService } from 'app/services/cards.service';
import { UpdateSubscriptionComponent } from 'app/update-subscription/update-subscription.component';
import { Subscription } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  serviceSubscribe:Subscription = new Subscription();
  subscriptions:any;

    constructor(private cardService : CardsService,public dialog: MatDialog) { }
    // showNotification(from, align){
  //     const type = ['','info','success','warning','danger'];

  //     const color = Math.floor((Math.random() * 4) + 1);

  //     $.notify({
  //         icon: "notifications",
  //         message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

  //     },{
  //         type: type[color],
  //         timer: 4000,
  //         placement: {
  //             from: from,
  //             align: align
  //         },
  //         template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
  //           '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
  //           '<i class="material-icons" data-notify="icon">notifications</i> ' +
  //           '<span data-notify="title">{1}</span> ' +
  //           '<span data-notify="message">{2}</span>' +
  //           '<div class="progress" data-notify="progressbar">' +
  //             '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
  //           '</div>' +
  //           '<a href="{3}" target="{4}" data-notify="url"></a>' +
  //         '</div>'
  //     });
  // }

  ngOnInit() {
    this.cardService.getAllSubscription().subscribe((res:any)=>{
      console.log(res);

    })
    this.cardService.getAllSubscription();
    this.serviceSubscribe = this.cardService.subscription$.subscribe((res:any) => {
      console.log('res', res);
      this.subscriptions=res;
    })
  }
  add() {    
    const dialogRef = this.dialog.open(CreateSubscriptionComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
    })
  }

  edit(data: any) {
    console.log(data);
    
    const dialogRef = this.dialog.open(UpdateSubscriptionComponent, {
      width: '600px',
      data: {subsId:data.subsId,type:data.type ,price:data.price,duration : data.duration
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
    const dialogRef = this.dialog.open(DeleteSubscriptionComponent, {
      width: '400px',
      data: {subscriptionId:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cardService.deletemenuType(id);
      }
    });
  }
}
