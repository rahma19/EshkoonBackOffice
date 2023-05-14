import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AddCategoryComponent } from 'app/add-category/add-category.component';
import { CreateMenuComponent } from 'app/create-menu/create-menu.component';
import { DeleteCategoryComponent } from 'app/delete-category/delete-category.component';
import { DeleteMenuDetailComponent } from 'app/delete-menu-detail/delete-menu-detail.component';
import { MenuService } from 'app/services/menu.service';
import { UpdateCategoryComponent } from 'app/update-category/update-category.component';
import { UpdateMenuDetailComponent } from 'app/update-menu-detail/update-menu-detail.component';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    restoName: [''],
    description: [''],
    email: ['',Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
    hour: [''],
    img: [''],
    // phoneNum: [''],
    backgroundImg: [''],
    optionalImg: [''],
    phoneNum: [''],
  });

  constructor(private _formBuilder: FormBuilder, private menuService: MenuService,
    private route: ActivatedRoute, public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private toast: ToastrService,
  ) {
  }

  menu: any= {};
  imagePath: any = "";
  imagePath2: any = "";
  imagePath3: any = "";
  file: any
  file2: any
  file3: any
  selectedFW = ''
  categ: any[] = []
  id = '';
  displayedColumns = ['Nom', 'Categorie', 'Prix', 'Image', 'Ingredient', 'Detail'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  arr:any[]=[]
  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.arr);
  private serviceSubscribe: Subscription = new Subscription;
  path = 'https://backend.e-shkoon.com/uploads/menu_details/';
  menuPath = 'https://backend.e-shkoon.com/uploads/menus/';
  check = false
  checkBg=false
  checkOpt=false
   ngOnInit(){
     this.route.queryParams.subscribe( params => {
      // this.menu =  {...params}
      this.id =  params.menuId
      this.check = false
      this.checkBg = false
      this.menuService.getAllPlat(this.id);
      this.menuService.plat$.subscribe(res => {
        
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    });

    this.menuService.getMenuById(this.id).subscribe( (res: any) => {
      this.menu = res;
      
    })

    this.menuService.getAllCategories(this.id);
    this.menuService.categ$.subscribe(res => {
      this.categ = res
    })

    this.check = false
    this.checkBg=false
    this.checkOpt=false
  }

  // onSelectedFile(event: any) {
  //   this.onSelectedGlobalFile(event,this.imagePath);
  // }

  onSelectedFile2(event: any) {
      const reader = new FileReader();  
      if (event.target.files.length > 0) {
        this.file2 = event.target.files[0];
        // reader.readAsDataURL(this.file2);
        // this.file = event.target.files[0];
        const fileSizeInMB = this.file2.size / (1024 * 1024);
  
        // if (fileSizeInMB > 10) {
        //   this.toastr.warning('La taille du fichier dépasse la limite de 10 Mo');
        //   return;
        // }
  
        const image = new Image();
        image.src = URL.createObjectURL(this.file2);
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
              const newFile = new File([blob], this.file2.name, { type: blob.type });
              this.file2 = newFile
              reader.readAsDataURL(newFile);
              reader.onload = () => {
                
                this.imagePath2 = reader.result;
                this.checkBg = true
                this.changeDetectorRef.detectChanges()
              }
            }
  
          }, this.file2.type);
        };
  
      }
    }

  onSelectedFile3(event: any) {
    const reader = new FileReader();

    if (event.target.files.length > 0) {
      this.file3 = event.target.files[0];

      const fileSizeInMB = this.file3.size / (1024 * 1024);

      // if (fileSizeInMB > 10) {
      //   this.toastr.warning('La taille du fichier dépasse la limite de 10 Mo');
      //   return;
      // }

      const image = new Image();
      image.src = URL.createObjectURL(this.file3);
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
            const newFile = new File([blob], this.file3.name, { type: blob.type });
            this.file3 = newFile;

            reader.readAsDataURL(newFile);
            reader.onload = () => {
              
              this.imagePath3 = reader.result;
              this.checkOpt = true
              this.changeDetectorRef.detectChanges()
            }
          }

        }, this.file3.type);
      };

    }
  }

  submitForm1() {
    const formData = new FormData();
    formData.set('description', this.menu?.description);
    formData.set('phoneNum', this.menu?.phoneNum);
    formData.set('email', this.menu?.email);
    // formData.set('image', this.file2);
    formData.append("image",this.file2)
    formData.append('image', this.file);
    formData.append('image', this.file3);
    formData.set('hour', this.menu?.hour);
   this.menuService.updateMenu(this.id, formData).subscribe(async res => {
      this.toast.success('Menu a été ajoutée avec succées')
    }, error => {
      this.toast.error("Erreur");

    });
  }

  add() {
    if (this.categ.length == 0) {
      this.toast.error("Veillez ajouter au moin une catégorie");

    } else {
      const dialogRef = this.dialog.open(CreateMenuComponent, {
        width: '600px',
        data: this.id
      });

      dialogRef.afterClosed().subscribe((result: any) => {
      })
    }
  }

  addCateg() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '400px',
      data: this.id

    });
  }

  editCateg(id) {
    const dialogRef = this.dialog.open(UpdateCategoryComponent, {
      width: '400px',
      data: id

    });
  }


  deleteCateg(id) {
    const dialogRef = this.dialog.open(DeleteCategoryComponent, {
      width: '400px',
      data: id

    });
  }

  edit(data: any) {
    const dialogRef = this.dialog.open(UpdateMenuDetailComponent, {
      width: '600px',
      data : data.menuDetailsId//: {
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(DeleteMenuDetailComponent, {
      width: '400px',
      data: { menuDetailsId: id }
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
            this.file = newFile;

            reader.readAsDataURL(newFile);
            reader.onload = () => {
              this.imagePath = reader.result;
              this.check = true
              this.changeDetectorRef.detectChanges()
            }
          }

        }, this.file.type);
      };

    }
  }

}
