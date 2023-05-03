import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'app/services/menu.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  FormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    menuId:[this.data]
  })
  id=''
  constructor(private route: ActivatedRoute,private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,public dialogRef: MatDialogRef<AddCategoryComponent>,
    private menuService: MenuService, private toast:ToastrService) { }

  ngOnInit(): void {
    this.id =  this.data  
// this.FormGroup.value.menuId=this.data
  }

  submit(){
    if (this.FormGroup.invalid) {
      return this.toast.error('Veuillez remplir tout les champs');
    }
    this.menuService.createCateg(this.FormGroup.value).subscribe( async res=>{
      this.toast.success("Catégorie a été ajoutée avec succés ");
      await this.dialogRef.close();
      //  this.router.navigate(['../home']);
    },
    error => {
      this.toast.error("Erreur ");

    });
  }
}
