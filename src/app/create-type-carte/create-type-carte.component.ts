import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-create-type-carte',
  templateUrl: './create-type-carte.component.html',
  styleUrls: ['./create-type-carte.component.css']
})
export class CreateTypeCarteComponent implements OnInit {
  cardTypeForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    });

  constructor(private formBuilder: FormBuilder,
    private cardService: CardsService,public dialogRef: MatDialogRef<CreateTypeCarteComponent>) { 
      dialogRef.disableClose = true;

    }

  get f() {
    return this.cardTypeForm.controls;
  }

  get name() {
    return this.f['name'].value;
  }

  //  get price() {
  //   return this.f['price'].value;
  // }
 
  ngOnInit(): void {
  }

  submit(){
    console.log(this.cardTypeForm.value);
    
    if (this.cardTypeForm.invalid) {
      return;
    }
    this.cardService.createmenuType(this.cardTypeForm.value)
      .pipe(first())
      .subscribe(
        async data => {
          console.log(data);
          await this.dialogRef.close();
        },
        error => {
        });
  }

}
