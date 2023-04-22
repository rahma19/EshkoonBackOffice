import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {
  id:any;
  constructor(private cardService: CardsService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data:any,public dialogRef: MatDialogRef<DeleteCategoryComponent>,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
   
}

   submit(){   
    this.cardService.deleteCard(this.data.cardId)
      .pipe(first())
      .subscribe(
       async data => {
          await this.dialogRef.close();
          //  this.router.navigate(['../home']);
        },
        error => {
        });
  }
}
