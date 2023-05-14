import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { first, map } from 'rxjs';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  verif = false
  RequestResetForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
    Validators.minLength(8),]),
    confirmPassword: new FormControl('', [Validators.required]),
    resettoken: new FormControl(''),
  });
  errorMessage: string = '';
  successMessage: string = '';
  IsvalidForm = true;
  resetToken: any
  CurrentState = ''
  user: any
  constructor(
    private authService: AuthService,
    private router: ActivatedRoute,
    private route: Router,
    public dialog: MatDialog,
    private toast: ToastrService,
    private toastr: ToastrService,
  ) {

  }
  ngOnInit(): void {
    // console.log(this.router.snapshot.paramMap.get('token'));
    this.resetToken = this.router.snapshot.paramMap.get('token');
    this.VerifyToken()
  }

  VerifyToken() {
    this.authService.checkTokenPass({ resettoken: this.resetToken }).subscribe({
      next: (value) => {
        this.CurrentState = 'Verified'
      },
      error: (error) => {
        this.CurrentState = 'NotVerified'
      },
      complete: () => {
      }
    });
  }

  resetPassword() {
    if (this.RequestResetForm.value.newPassword != this.RequestResetForm.value.confirmPassword) {
      this.toastr.error('Veuillez vérifier le mot de passe');
    }
    else {
      this.RequestResetForm.value.resettoken = this.resetToken
      this.authService.updatePassword(this.RequestResetForm.value)
        .pipe(first())
        .subscribe(
          async (data: any) => {
            this.toastr.success('Vos données ont été modifiés avec succès');
            this.route.navigateByUrl('/');

            const dialogRef = this.dialog.open(LoginComponent, {
              width: '600px'
            })
          },
          error => {
            this.toastr.error('Erreur lors de l enregistrement');

          });
    }
  }
}
