import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { CardsService } from '../services/cards.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-subscription',
  templateUrl: './update-subscription.component.html',
  styleUrls: ['./update-subscription.component.css']
})
export class UpdateSubscriptionComponent implements OnInit {

  id: any;
  card!: any;
  subsForm: FormGroup = this.formBuilder.group({
    subsId: ['', Validators.required],
    type: ['', Validators.required],
    price: ['', Validators.required],
    duration: ['', Validators.required]
  });
  formData: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
    private cardService: CardsService, private router: Router,private toast:ToastrService,
    private route: ActivatedRoute, public dialogRef: MatDialogRef<UpdateSubscriptionComponent>
  ) {
    this.subsForm.setValue(data);
  }
  ngOnInit(): void {
  }

  get f() {
    return this.subsForm.controls;
  }

  get type() {
    return this.f['type'].value;
  }

  get duration() {
    return this.f['duration'].value;
  }

  get subsId() {
    return this.f['subsId'].value;
  }
  submit(): void {
    this.cardService.updateSubscription(this.subsId, this.subsForm.value).pipe(first())
      .subscribe(
        async data => {
          await this.dialogRef.close(Object.assign(this.subsForm.value));
          this.toast.success('Plat a été modifié avec succées')

        },
        error => {
          this.toast.success('Erreur')

        });
  }
}
