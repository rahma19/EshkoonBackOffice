import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-update-card',
  templateUrl: './update-card.component.html',
  styleUrls: ['./update-card.component.css']
})
export class UpdateCardComponent implements OnInit {

  id: any;
  card!: any;
  cardForm: FormGroup = this.formBuilder.group({
    cardId: ['', Validators.required],
    name: ['', Validators.required],
    card_type: ['', Validators.required],
    price: ['', Validators.required],
    cardTypeCardTypeId: ['', Validators.required],
    description: ['', Validators.required],
    createdAt: ['', Validators.required],
    updatedAt: ['', Validators.required],
    img: ['', Validators.required],
    isService: ['', Validators.required],
    type: ['', Validators.required]

  });
  formData: any;
  menu:any[]=[];
  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
    private cardService: CardsService, private router: Router, public dialogRef: MatDialogRef<UpdateCardComponent>,
    private route: ActivatedRoute
  ) {
    this.cardForm.setValue(data);
  }

  ngOnInit(): void {  
    console.log(this.data);
      
    this.id = this.data.cardId;
    this.menu=this.cardService.getTypesValue()
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
  get card_type() {
    return this.f['card_type'].value;
  }

  get description() {
    return this.f['description'].value;
  }

  get cardTypeCardTypeId() {
    return this.f['cardTypeCardTypeId'].value;
  }

  get img() {
    return this.f['img'].value;
  }

  submit() {
    if (this.cardForm.invalid) {
      return;
    }
    console.log(this.cardForm.value);

    this.cardService.updateCard(this.id, this.cardForm.value)
      .pipe(first())
      .subscribe(
        async data => {
          console.log(this.cardService.cardTypeSubject.value);
          await this.dialogRef.close(Object.assign(this.cardForm.value));

          // this.cardService.getMenu();
          // window.location.reload();
        },
        error => {
        });
  }
}

