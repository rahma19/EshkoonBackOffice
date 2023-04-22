import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CardsService } from 'app/services/cards.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-create-subscription',
  templateUrl: './create-subscription.component.html',
  styleUrls: ['./create-subscription.component.css']
})
export class CreateSubscriptionComponent implements OnInit {

  subsForm: FormGroup = this.formBuilder.group({
    type: ['', Validators.required],
    price: ['', Validators.required],
    duration: ['', Validators.required],
    });

  constructor(private formBuilder: FormBuilder,
    private cardService: CardsService,public dialogRef: MatDialogRef<CreateSubscriptionComponent>) { 
      dialogRef.disableClose = true;

    }

  get f() {
    return this.subsForm.controls;
  }

  get name() {
    return this.f['name'].value;
  }

   get price() {
    return this.f['price'].value;
  }
  get duration() {
    return this.f['duration'].value;
  }
  
 
  ngOnInit(): void {
  }

  submit(){
    if (this.subsForm.invalid) {
      return;
    }
    this.cardService.createSubscription(this.subsForm.value)
      .pipe(first())
      .subscribe(
        async data => {
          await this.dialogRef.close();
        },
        error => {
        });
  }

}
