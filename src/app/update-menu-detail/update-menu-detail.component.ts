import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'app/services/menu.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { CardsService } from '../services/cards.service';
@Component({
  selector: 'app-update-menu-detail',
  templateUrl: './update-menu-detail.component.html',
  styleUrls: ['./update-menu-detail.component.css']
})
export class UpdateMenuDetailComponent implements OnInit {

  id: any;
  file:any;
  card!: any;
  cardForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    ingredient: [''],
    price: ['',Validators.required],
    img: ['', Validators.required],
    menuCategoryMenuCategoryId : ['', Validators.required],
    menuMenuId : [this.data, Validators.required],
    menuDetailsId: [this.data, Validators.required],
    createdAt: ['', Validators.required],
    updatedAt: ['', Validators.required],
    // menu_category: ['', Validators.required],
  });
  formData: any;
  imagePath: string="";
  path='https://backend.e-shkoon.com/uploads/menu_details/';
img:any
check=false
  menu:any[]=[];
  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
    private menuService: MenuService, private router: Router, public dialogRef: MatDialogRef<UpdateMenuDetailComponent>,
    private route: ActivatedRoute,private toast:ToastrService
  ) {
  } 

  ngOnInit(): void {  
    this.id = this.data;
    this.menuService.getPlatById(this.id).subscribe( (res: any) => {
      this.cardForm.setValue(res);
    this.img=this.cardForm.value.img
    this.menuService.getAllCategories(res.menuMenuId);
    this.menuService.categ$.subscribe(res=>{
      this.menu=res
    })
    })
 }

  get f() {
    return this.cardForm.controls;
  }

  get name() {
    return this.f['name'].value;
  }

  get price() {
    return this.f['price'].value;
  }
  get ingredient() {
    return this.f['ingredient'].value;
  }

  get description() {
    return this.f['description'].value;
  }

  get menuCategoryMenuCategoryId() {
    return this.f['menuCategoryMenuCategoryId'].value;
  }

  onSelectedFile(event:any) {
    const reader = new FileReader();

    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.cardForm.value.img= this.file;
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.img = reader.result;
        this.check= true
      }
    }
  }

  submit() {
    // if (this.cardForm.invalid) {
    //   return;
    // }
    const formData = new FormData();    
    formData.set('name', this.cardForm.value.name);
    formData.set('ingredient', this.cardForm.value.ingredient);
    formData.set('menuId', this.cardForm.value.menuMenuId);
    formData.set('menuDetailsId', this.cardForm.value.menuDetailsId);
    formData.set('price', this.cardForm.value.price);
    formData.set('menuCategoryMenuCategoryId', this.cardForm.value.menuCategoryMenuCategoryId);
    if(this.file){
      formData.set('image', this.file);
    }
    this.menuService.updatePlat(this.id, formData)
      .pipe(first())
      .subscribe(
        async data => {
this.toast.success('Plat a été modifié avec succées')
      await this.dialogRef.close();        },
        error => {
      this.toast.error('Veuillez vérifier vos données')

        });
  }

}
