import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, Subscription } from 'rxjs';
import { CardsService } from '../services/cards.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {

   cardForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    isService: [false, Validators.required],
    price: ['', Validators.required],
    cardTypeCardTypeId: ['', Validators.required],
    img: ['', Validators.required],
    description: ['', Validators.required]
  });

  @ViewChild('myForm', { static: false })
  public MyForm: any;
file:any;
  fname:string='';
  selectedFW = new FormControl();
  menu: any[] = [];
  imagePath: string="";

  submitForm(e:any){
    console.log(this.MyForm);
    if(this.MyForm.valid){
        //Submit form logic here!
    }
  }

  subscription = new Subscription();
  constructor(private formBuilder: FormBuilder,  
    private cardService: CardsService,public dialogRef: MatDialogRef<CreateCardComponent>) { }

  get f() {
    return this.cardForm.controls;
  }

  get name() {
    return this.f['name'].value;
  }

  get price() {
    return this.f['price'].value;
  }

  get description() {
    return this.f['description'].value;
  }

  get cardTypeCardTypeId() {
    return this.f['cardTypeCardTypeId'].value;
  }

  // get type() {
  //   return this.f['type'].value;
  // }

  get img() {
    return this.f['img'].value;
  }

  get isService() {
    return this.f['isService'].value;
  }

  ngOnInit(): void {
    // this.cardService.getTypesValue().forEach((element:any) => {
    //   console.log(element.name)
    //   this.menu.push(element.name);
    // });
    this.cardService.getMenu().subscribe((res:any)=>{
      console.log(res)
    })
      ;
    this.cardService.getMenu();
    this.subscription=this.cardService.cardType$.subscribe((res:any)=>{
      console.log(this.menu);

      this.menu= res;
    });
    
  }

  onSelectedFile(event:any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.cardForm.value.img= this.file;
    }
  }

  submit(){
    // if (this.cardForm.invalid) {
    //   return;
    // }    
    const formData = new FormData();    
    formData.set('name', this.cardForm.value.name);
    formData.set('description', this.cardForm.value.description);
    formData.set('price', this.cardForm.value.price);
    formData.set('cardTypeCardTypeId', this.cardForm.value.cardTypeCardTypeId);
    formData.set('image', this.file);
    formData.set('isService', this.cardForm.value.isService);
    
      this.cardService.createCard(formData).subscribe(
      async res => {
            console.log(res);
            await this.dialogRef.close();
        },
        error => console.log(error)
      );
  }

}
