import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { CardsService } from '../services/cards.service';
import { MenuService } from 'app/services/menu.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  id: any;
  card!: any;
  categForm: FormGroup = this.formBuilder.group({
    menuCategoryId: ['', Validators.required],
    name: ['', Validators.required],
    menuMenuId: ['', Validators.required],
    createdAt: [''],
    updatedAt: [''],
  });
  formData: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
    private menuService: MenuService, private router: Router,private toast:ToastrService,
    private route: ActivatedRoute, public dialogRef: MatDialogRef<UpdateCategoryComponent>
  ) {
  }

  ngOnInit(): void {
this.id = this.data;
this.menuService.getCategById(this.id).subscribe( (res: any) => {
  this.categForm.setValue(res.menuCategory);
})
  }

  get f() {
    return this.categForm.controls;
  }

  get name() {
    return this.f['name'].value;
  }


  submit(): void {
    this.menuService.updateCateg(this.id, this.categForm.value).pipe(first())
      .subscribe(
        async data => {
          await this.dialogRef.close(Object.assign(this.categForm.value));
      this.toast.success('Catégorie a été modifiée avec succées')
        },
        error => {
      this.toast.error('Erreur')
        });
  }

}
