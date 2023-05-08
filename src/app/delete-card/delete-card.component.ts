import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
              private router: Router,private toastr:ToastrService,
              @Inject(MAT_DIALOG_DATA) public data:any,public dialogRef: MatDialogRef<DeleteCardComponent>,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
   
}

   submit(){   
    this.cardService.deleteCard(this.data.cardId)
      .pipe(first())
      .subscribe(
       async data => {
      this.toastr.success('Carte a été supprimée avec succès');

          await this.dialogRef.close();
          //  this.router.navigate(['../home']);
        },
        error => {
      this.toastr.error('Erreur');

        });
  }

}
