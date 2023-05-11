import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddCategoryComponent } from 'app/add-category/add-category.component';
import { MenuService } from 'app/services/menu.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit {

  secondFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    ingredient: [''],
    price: ['',Validators.required],
    img: ['', Validators.required],
    menuCategoryId : ['', Validators.required],
    menuId : [this.data, Validators.required],
    });

  constructor(private _formBuilder: FormBuilder,private menuService: MenuService,
    @Inject(MAT_DIALOG_DATA) public data:any,private toast: ToastrService,
    private route: ActivatedRoute, private dialog:Dialog,public dialogRef: MatDialogRef<CreateMenuComponent>,
    private changeDetectorRef: ChangeDetectorRef
    ) { }

menu : any;
imagePath: any="";
imagePath2: any="";
file:any
file2:any
selectedFW=''
categ:any[]=[]
id=''
private serviceSubscribe: Subscription = new Subscription; 
  
  ngOnInit(): void {
    this.id = this.data
  this.menuService.getMenuById(this.id);
    this.serviceSubscribe = this.menuService.menu$.subscribe(res => {
      this.menu = res;   
    })

    this.menuService.getAllCategories(this.id);
    this.menuService.categ$.subscribe(res=>{
      this.categ=res
    })
  }

  submit(){
    const formData = new FormData();    
    formData.set('name', this.secondFormGroup.value.name);
    formData.set('price', this.secondFormGroup.value.price);
    formData.set('menuId', this.secondFormGroup.value.menuId);
    formData.set('menuCategoryId', this.secondFormGroup.value.menuCategoryId);
    formData.set('image', this.file);
    formData.set('ingredient', this.secondFormGroup.value.ingredient);
    this.menuService.createPlat(formData).subscribe(async res=>{
      this.toast.success('Menu a été ajoutée avec succées')
      await this.dialogRef.close();
      //  this.router.navigate(['../home']);
    },
    error => {
       this.toast.error('Veuillez remplir tout les champs');

    });
  }

  onSelectedFile(event: any) {
    const reader = new FileReader();

    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      const fileSizeInMB = this.file.size / (1024 * 1024);

      // if (fileSizeInMB > 10) {
      //   this.toastr.warning('La taille du fichier dépasse la limite de 10 Mo');
      //   return;
      // }

      const image = new Image();
      image.src = URL.createObjectURL(this.file);
      image.onload = () => {
        const canvas = document.createElement('canvas');
        let width = image.width;
        let height = image.height;

        if (width > height) {
          if (width > 1024) {
            height *= 1024 / width;
            width = 1024;
          }
        } else {
          if (height > 1024) {
            width *= 1024 / height;
            height = 1024;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(image, 0, 0, width, height);

        canvas.toBlob((blob) => {

          if (blob !== null) {
            const newFile = new File([blob], this.file.name, { type: blob.type });
            this.file= newFile;

            reader.readAsDataURL(newFile);
            reader.onload = () => {
        this.imagePath = reader.result;
              this.changeDetectorRef.detectChanges()
            }
          }

        }, this.file.type);
      };

    }
  }
}
