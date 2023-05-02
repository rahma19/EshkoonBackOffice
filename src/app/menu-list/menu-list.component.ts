import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AddCategoryComponent } from 'app/add-category/add-category.component';
import { CreateMenuComponent } from 'app/create-menu/create-menu.component';
import { DeleteMenuDetailComponent } from 'app/delete-menu-detail/delete-menu-detail.component';
import { MenuService } from 'app/services/menu.service';
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
    restoName: ['', Validators.required],
    description: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
    hour: ['', Validators.required],
    img: ['', Validators.required],
    // phoneNum: ['', Validators.required],
    backgroundImg: [''],
    optionalImg: [''],
    phoneNum: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(8), Validators.minLength(8)])],
  });

  constructor(private _formBuilder: FormBuilder, private menuService: MenuService,
    private route: ActivatedRoute, public dialog: MatDialog,
    private toast: ToastrService
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
  displayedColumns = ['Nom', 'Categorie', 'Prix', 'Image', 'Ingrédient', 'Detail'];
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

  onSelectedFile(event: any) {
    const reader = new FileReader();

    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.imagePath = reader.result;
        this.check = true

      }
    }
  }

  onSelectedFile2(event: any) {
    const reader = new FileReader();

    if (event.target.files.length > 0) {
      this.file2 = event.target.files[0];
      reader.readAsDataURL(this.file2);
      reader.onload = () => {
        this.imagePath2 = reader.result;
        this.checkBg = true

      }
    }
  }

  onSelectedFile3(event: any) {
    const reader = new FileReader();

    if (event.target.files.length > 0) {
      this.file3 = event.target.files[0];
      reader.readAsDataURL(this.file3);
      reader.onload = () => {
        this.imagePath3 = reader.result;
        this.checkOpt = true

      }
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
    formData.forEach(elem=>{
      
    })
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

}
