import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsService } from 'app/services/cards.service';
import { OrderService } from 'app/services/order.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  id="";
  profileForm: FormGroup = this.formBuilder.group({
    profileId: ['', Validators.required],
    link: ['', Validators.required],
  })
  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService, private router: Router, public dialogRef: MatDialogRef<UpdateProfileComponent>,
    private route: ActivatedRoute
  ) {
    this.profileForm.setValue(data);
  } 

  ngOnInit(): void {        
    this.id = this.data.profileId;
  }

  submit(){
    this.orderService.generateQrCode(this.profileForm.value).subscribe(async res=>{
      console.log(res);
      await this.dialogRef.close();

    })
  }
}