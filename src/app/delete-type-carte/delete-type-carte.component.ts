import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-delete-type-carte',
  templateUrl: './delete-type-carte.component.html',
  styleUrls: ['./delete-type-carte.component.css']
})
export class DeleteTypeCarteComponent implements OnInit {

  id:any;
  display:any;

  constructor(private cardService: CardsService,
    @Inject(MAT_DIALOG_DATA) public data:any,public dialogRef: MatDialogRef<DeleteTypeCarteComponent>,
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
   await this.cardService.deletemenuType(this.data.cardTypeId)
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
