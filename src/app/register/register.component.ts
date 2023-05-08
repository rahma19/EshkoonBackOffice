import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  verif=false;
  loading = false;
  submitted = false;
  constructor(private fb: FormBuilder, private http: HttpClient,
    private route: ActivatedRoute, public dialog: MatDialog,
    private router: Router, private toastr: ToastrService,
    private authService: AuthService,) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      // address: ['', [Validators.required]],
      role: ['admin'],
      // phoneNum: ['', [Validators.required]],
      isActif: [true],
      email: ['', [Validators.required,  	Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")    ]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]

      // email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  ngOnInit(): void {

  }


  // get address() {
  //   return this.f['address'].value;
  // }

  get isActif() {
    return this.f['isActif'].value;
  }

  // get phoneNum() {
  //   return this.f['phoneNum'].value;
  // }

  get email() {
    return this.f['email'].value;
  }

  get password() {
    return this.f['password'].value;
  }

  get confirmPassword() {
    return this.f['confirmPassword'].value;
  }

  get name() {
    return this.f['name'].value;
  }

  get lastName() {
    return this.f['lastName'].value;
  }

  get f() { return this.form.controls; }

  async onSubmit() {
    this.submitted = true;
    this.verif=true;
    // stop here if form is invalid
    if (this.form.invalid) {
      this.toastr.error('Veuillez saisir des données valides');
    }
   else if (this.password != this.confirmPassword) {
      this.toastr.error('Veuillez vérifier le mot de passe');
    }
    else{
      this.loading = true;
   await this.authService.register(this.form.value)
      .pipe(first())
      .subscribe({
         next: async () => {
       await   this.toastr.success('Utilisateur a été créé avec succès');
          this.router.navigateByUrl('/login');
        },
        error: error => {
          if(error.status=='403'){
            this.toastr.error('Email déja utilisé ');

          }

        }
      });
    }
    this.verif=false;

  }

  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error);
  }

}
