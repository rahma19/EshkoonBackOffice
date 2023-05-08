import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private cardService: CardsService,private toastr:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data:any,public dialogRef: MatDialogRef<DeleteSubscriptionComponent>,
              private router: Router,private dialog: MatDialog,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.display = true;
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
      this.toastr.success('Abonnement a été supprimé avec succès');

          //  this.router.navigate(['../home']);
        },
        error => {
      this.toastr.error('Erreur');

        });
  }


}
