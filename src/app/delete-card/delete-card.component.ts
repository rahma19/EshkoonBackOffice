import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.component.html',
  styleUrls: ['./delete-card.component.css']
})
export class DeleteCardComponent implements OnInit {

  id:any;
  constructor(private cardService: CardsService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data:any,public dialogRef: MatDialogRef<DeleteCardComponent>,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
   console.log(this.data);
   
}

   submit(){   
    this.cardService.deleteCard(this.data.cardId)
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
