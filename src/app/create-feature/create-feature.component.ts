import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, Subscription } from 'rxjs';
import { CardsService } from '../services/cards.service';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'app/services/order.service';

@Component({
  selector: 'app-create-feature',
  templateUrl: './create-feature.component.html',
  styleUrls: ['./create-feature.component.css']
})
export class CreateFeatureComponent implements OnInit {
  file:any;
  cardForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    img: ['', Validators.required],
  });

  @ViewChild('myForm', { static: false })
  public MyForm: any;

  fname:string='';
  selectedFW = new FormControl();
  menu: any[] = [];
  imagePath: any="";

  submitForm(e:any){
    if(this.MyForm.valid){
        //Submit form logic here!
    }
  }

  subscription = new Subscription();
  constructor(private formBuilder: FormBuilder,  
    private orderService: OrderService,public dialogRef: MatDialogRef<CreateFeatureComponent>) { }

  get f() {
    return this.cardForm.controls;
  }

  get name() {
    return this.f['name'].value;
  }

  get img() {
    return this.f['img'].value;
  }

  ngOnInit(): void {
   
  }

  onSelectedFile(event:any) {
    const reader = new FileReader();

    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.cardForm.value.img= this.file;
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.imagePath = reader.result;

      }
    }
  }

  submit(){
    // if (this.cardForm.invalid) {
    //   return;
    // }    
    const formData = new FormData();    
    formData.set('name', this.cardForm.value.name);
    formData.set('image', this.file);
    
    this.orderService.createFeature(formData).subscribe(
      async res => {
            (res);
            await this.dialogRef.close();
        },
        error => console.log(error)
      );
  }

}

