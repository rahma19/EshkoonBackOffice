import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'app/services/order.service';
import { first } from 'rxjs';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-delete-feature',
  templateUrl: './delete-feature.component.html',
  styleUrls: ['./delete-feature.component.css']
})
export class DeleteFeatureComponent implements OnInit {

  id:any;
  constructor(private orderService: OrderService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data:any,public dialogRef: MatDialogRef<DeleteFeatureComponent>,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
   console.log(this.data);
   
}

   submit(){   
    this.orderService.deletefeature(this.data.featureId)
      .pipe(first())
      .subscribe(
       async data => {
          console.log(data);  
          await this.dialogRef.close();
          //  this.router.navigate(['../home']);
        },
        error => {
        });
  }
}
