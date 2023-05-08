import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { CardsService } from '../services/cards.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-type-carte',
  templateUrl: './update-type-carte.component.html',
  styleUrls: ['./update-type-carte.component.css']
})
export class UpdateTypeCarteComponent implements OnInit {

  id: any;
  card!: any;
  cardTypeForm: FormGroup = this.formBuilder.group({
    cardTypeId: ['', Validators.required],
    name: ['', Validators.required],
    // price: ['', Validators.required]
  });
  formData: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
    private cardService: CardsService, private router: Router,private toast:ToastrService,
    private route: ActivatedRoute, public dialogRef: MatDialogRef<UpdateTypeCarteComponent>
  ) {
    this.cardTypeForm.setValue(data);
  }
  ngOnInit(): void {

  }

  get f() {
    return this.cardTypeForm.controls;
  }

  get name() {
    return this.f['name'].value;
  }

  get cardTypeId() {
    return this.f['cardTypeId'].value;
  }
  submit(): void {
    this.cardService.updatemenu(this.cardTypeId, this.cardTypeForm.value).pipe(first())
      .subscribe(
        async data => {
          await this.dialogRef.close(Object.assign(this.cardTypeForm.value));
      this.toast.success('Type a été modifié avec succées')

        },
        error => {
      this.toast.error('erreur')

        });
  }

}
