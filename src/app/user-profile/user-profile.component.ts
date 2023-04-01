import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
// import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  form!: FormGroup;
  confirmPassword="";
  user:any;
  constructor(private formBuilder: FormBuilder,private authService:AuthService,
    // private toastr:ToastrService
    ){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [''],
      role: [''],
      isActif: [''],
      createdAt:[''],
    updatedAt:[''],
      password: [''],
    })
  }
 

ngOnInit(): void {
  this.authService.user$.subscribe(user=>{
    this.user=user;
  });
}

get password() {
  return this.f['password'].value;
}

get email() {
  return this.f['email'].value;
}

get name() {
  return this.f['name'].value;
}

get lastName() {
  return this.f['lastName'].value;
}

get f() { return this.form.controls; }

onSubmit() {
  console.log(this.form.value );
  
  // stop here if form is invalid
  if (this.form.invalid) {
    // this.toastr.error('Veuillez remplir tous les champs');
  }      
  if(this.password && this.confirmPassword && this.password!=this.confirmPassword){
    // this.toastr.error('Veuillez vérifier le mot de passe');
  }
  return this.authService.updateUser(this.form.value,this.user.email)
  .pipe(first())
  .subscribe(
    async (data:any) => {
      // this.toastr.success('Vos données ont été modifiés avec succès');

    },
    error => {
      // this.toastr.error('Erreur lors de l enregistrement');

    });
}
}
 