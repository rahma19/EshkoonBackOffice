import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private formBuilder: FormBuilder,private toastr:ToastrService,
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
    if (this.cardTypeForm.invalid) {
      return this.toastr.error('Veuillez remplir tout les champs');
    }
    this.cardService.createmenuType(this.cardTypeForm.value)
      .pipe(first())
      .subscribe(
        async data => {
      this.toastr.success('Type a été ajouté avec succès');
          await this.dialogRef.close();
        },
        error => {
      this.toastr.error('Erreur');
        });
  }

}
