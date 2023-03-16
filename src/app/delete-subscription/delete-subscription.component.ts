import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-delete-subscription',
  templateUrl: './delete-subscription.component.html',
  styleUrls: ['./delete-subscription.component.css']
})
export class DeleteSubscriptionComponent implements OnInit {

  id:any;
  display:any;

  constructor(private cardService: CardsService,
    @Inject(MAT_DIALOG_DATA) public data:any,public dialogRef: MatDialogRef<DeleteSubscriptionComponent>,
              private router: Router,private dialog: MatDialog,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.display = true;
console.log(this.data);

  //   const param = this.route.snapshot.paramMap.get('typeId');    
  //   if (param) {
  //        this.id = +param;
  // }
}

 async submit(){   
   await this.cardService.deleteSubscription(this.data.subscriptionId)
      .pipe(first())
      .subscribe(
        (data:any) => {
          console.log(data);  
          //  this.router.navigate(['../home']);
        },
        error => {
        });
  }


}
