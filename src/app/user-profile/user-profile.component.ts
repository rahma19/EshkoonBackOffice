import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  form!: FormGroup;
  // confirmPassword="";
  user:any;
  isLoading=true
  constructor(private formBuilder: FormBuilder,private authService:AuthService,
    private toastr:ToastrService
    // private toastr:ToastrService
    ){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: [''],
      isActif: [''],
      createdAt:[''],
    updatedAt:[''],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
    Validators.minLength(8),]],
         confirmPassword:[''],
        });

        setTimeout(() => {
          this.isLoading = false; // Set isLoading to false when loading is complete
        }, 3000);
  }
 

ngOnInit(): void {
  this.authService.getUserByEmail(JSON.parse(this.authService.currentUserValue)?.email);
    this.authService.user$.subscribe(async user => {    
      this.user = await user;
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
  // stop here if form is invalid
  if (this.form.invalid) {
    return this.toastr.error('Veuillez remplir tous les champs');
  }      
  if(this.form.value.password && this.form.value.confirmPassword && this.form.value.password!=this.form.value.confirmPassword){
    return  this.toastr.error('Veuillez vérifier le mot de passe');
  }
  return this.authService.updateUser(this.form.value,this.user.email)
  .pipe(first())
  .subscribe(
    async (data:any) => {
      this.toastr.success('Vos données ont été modifiés avec succès');

    },
    error => {
      this.toastr.error('Erreur lors de l enregistrement');

    });
}
}
 