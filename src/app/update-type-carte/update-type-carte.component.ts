import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-update-type-carte',
  templateUrl: './update-type-carte.component.html',
  styleUrls: ['./update-type-carte.component.css']
})
export class UpdateTypeCarteComponent implements OnInit {

  id:any;
  card!: any;
  cardTypeForm: FormGroup = this.formBuilder.group({
    cardTypeId: ['', Validators.required],
    name: ['', Validators.required],
    // price: ['', Validators.required]
  });
  formData: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private formBuilder: FormBuilder,
    private cardService: CardsService, private router: Router,
    private route: ActivatedRoute,public dialogRef: MatDialogRef<UpdateTypeCarteComponent>
    ) {
      this.cardTypeForm.setValue(data);
     }
  ngOnInit(): void {
    console.log(this.data);
    
    // const param = this.route.snapshot.paramMap.get('typeId');  
    // if (param) {
    //      this.id = +param;
    //     this.getcard(this.id);
    // }
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

    // getcard(id: string) {
    //     this.cardService.getmenuCardById(id).subscribe(
    //       (data : any) => {            
    //         this.card = data.typeCarte;
    //         this.formData = this.card;
    //         this.cardTypeForm.patchValue({
    //           name:this.card.name
    //          });
    //       }      
    //     );
    // }

  // submit(){
  //   if (this.cardTypeForm.invalid) {
  //     return;
  //   }    
  //   this.cardService.updatemenu(this.id,this.cardTypeForm.value)
  //     .pipe(first())
  //     .subscribe(
  //       data => {
  //         console.log(data);
          
  //         //  this.router.navigate(['../home']);
  //       },
  //       error => {
  //       });
  // }
  submit(): void {
    this.cardService.updatemenu(this.cardTypeId,this.cardTypeForm.value).pipe(first())
            .subscribe(
              async data => {
                console.log(this.cardService.cardTypeSubject.value);
                await this.dialogRef.close(Object.assign( this.cardTypeForm.value));

                // this.cardService.getMenu();
                // window.location.reload();
              },
              error => {
              });
  }

}
