import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'app/services/auth.service';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  loading = false;
  submitted = false;
  error = '';

  constructor(
    // public dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
                //  this.router.navigate(['./home']);
    }
  }

  ngOnInit() {

  }

  onCancel(): void {
    // this.dialogRef.close();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  get email() {
    return this.f['email'].value;
  }

  get password() {
    return this.f['password'].value;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.authenticationService.login(this.f['email'].value, this.f['password'].value)
    .pipe(first())
    .subscribe(
      async (data:any) => {
        this.router.navigate(['/dashboard']);
      },
      error => {
      });
      // .pipe(first())
      // .subscribe(
      //   data => {
      //     this.router.navigateByUrl('/').then(() => {
      //       // window.location.reload();
      //     });
      //   },
      //   error => {
      //     this.error = error;
      //   });
  }
  goToRegistration(){
    this.router.navigateByUrl('auth/register');
  }
}