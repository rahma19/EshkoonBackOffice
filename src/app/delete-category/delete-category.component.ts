import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'app/services/menu.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {
  id:any;
  constructor(private cardService: CardsService,private toastr:ToastrService,
              private router: Router,private menuService: MenuService,
              @Inject(MAT_DIALOG_DATA) public data:any,public dialogRef: MatDialogRef<DeleteCategoryComponent>,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
   
}

   submit(){   
    this.menuService.deleteCateg(this.data)
      .pipe(first())
      .subscribe(
       async data => {
      this.toastr.success('Catégorie a été supprimée avec succès');
          await this.dialogRef.close();
        },
        error => {
      this.toastr.error('Erreur');

        });
  }
}
