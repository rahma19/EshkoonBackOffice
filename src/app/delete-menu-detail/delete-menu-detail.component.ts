import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'app/services/menu.service';
import { first } from 'rxjs';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-delete-menu-detail',
  templateUrl: './delete-menu-detail.component.html',
  styleUrls: ['./delete-menu-detail.component.css']
})
export class DeleteMenuDetailComponent implements OnInit {
  id:any;
  constructor(private menuService: MenuService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data:any,public dialogRef: MatDialogRef<DeleteMenuDetailComponent>,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
   console.log(this.data);
   
}

   submit(){   
    this.menuService.deletePlat(this.data.menuDetailsId)
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
