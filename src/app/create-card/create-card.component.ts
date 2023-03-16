import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
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
    // type: ['', Validators.required],
    price: ['', Validators.required],
    cardTypeCardTypeId: ['', Validators.required],
    img: ['', Validators.required],
    description: ['', Validators.required]
  });

  @ViewChild('myForm', { static: false })
  public MyForm: any;

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

  ngOnInit(): void {
    // this.cardService.getTypesValue().forEach((element:any) => {
    //   console.log(element.name)
    //   this.menu.push(element.name);
    // });
    this.menu=this.cardService.getTypesValue()
  }

  onSelectedFile(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.cardForm.value.img=file;
      console.log(this.cardForm.value.img);
      
    }
  }

  submit(){
    // if (this.cardForm.invalid) {
    //   return;
    // }    
    // this.cardService.createCard(this.cardForm.value)
    //   .pipe(first())
    //   .subscribe(
    //     async data => {
    //       console.log(data);
    //       await this.dialogRef.close();
    //     },
    //     error => {
    //     });
    const formData = new FormData();
    console.log(this.cardForm.value.img);
    
    formData.set('name', this.cardForm.value.name);
    formData.set('description', this.cardForm.value.description);
    formData.set('price', this.cardForm.value.price);
    formData.set('cardTypeCardTypeId', this.cardForm.value.cardTypeCardTypeId);
    formData.set('image', this.cardForm.value.img);
    formData.forEach((value, key) => {
      console.log("key %s: value %s", key, value);
      })
      console.log(formData.get("name"))
    
      this.cardService.createCard(formData).subscribe(
      async res => {
            console.log(res);
            await this.dialogRef.close();
            // this.router.navigate(['/']);
        },
        error => console.log(error)
      );
  }

}
