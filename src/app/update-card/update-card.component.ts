import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-update-card',
  templateUrl: './update-card.component.html',
  styleUrls: ['./update-card.component.css']
})
export class UpdateCardComponent implements OnInit {

  id: any;
  file:any;
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
    // type: ['', Validators.required]

  });
  formData: any;
  imagePath: string="";
  path='https://backend.e-shkoon.com/uploads/cards/';

  menu:any[]=[];
  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
    private cardService: CardsService, private router: Router, public dialogRef: MatDialogRef<UpdateCardComponent>,
    private route: ActivatedRoute, private toast:ToastrService
  ) {
    this.cardForm.setValue(data);
  } 
  img :any
  check=false
  ngOnInit(): void {  
    this.id = this.data.cardId;
    this.menu=this.cardService.getTypesValue();
    this.img=this.cardForm.value.img
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

  onSelectedFile(event:any) {
    const reader = new FileReader();

    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.img= this.file;
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.img = reader.result;
        this.check= true
    }
  }
}

  submit() {
    if (this.cardForm.invalid) {
      return;
    }
    const formData = new FormData();    
    formData.set('name', this.cardForm.value.name);
    formData.set('description', this.cardForm.value.description);
    formData.set('price', this.cardForm.value.price);
    formData.set('cardTypeCardTypeId', this.cardForm.value.cardTypeCardTypeId);
    if(this.file){
      formData.set('image', this.file);
    }
    formData.set('isService', this.cardForm.value.isService);
    this.cardService.updateCard(this.id, formData)
      .pipe(first())
      .subscribe(
        async data => {
      this.toast.success('Carte a été modifiée avec succées')

          await this.dialogRef.close(Object.assign(this.cardForm.value));

          // this.cardService.getMenu();
          // window.location.reload();
        },
        error => {
      this.toast.error('Veuillez vérifier vos données')

        });
  }
}

