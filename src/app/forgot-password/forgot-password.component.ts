import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
verif=false
  RequestResetForm: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]),
  });;
  errorMessage: string='';
  successMessage: string='';
  IsvalidForm = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
   ) {

  }


  ngOnInit() {

  
  }


  RequestResetUser() {
    this.verif=true
    this.authService.forgotPassword(this.RequestResetForm.value.email).subscribe((data:any)=>{
      this.toast.success('E-mail de réinitialisation du mot de passe envoyé');

    },(err:any)=>{
      this.toast.error("E-mail n'existe pas");
this.verif=false
    });
  }

}
