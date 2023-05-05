import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { GetInvoiceComponent } from './get-invoice/get-invoice.component';

const routes: Routes =[
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  {
    path:'forgotPassword',
    component: ForgotPasswordComponent,
    pathMatch: 'full',

  },
  {
    path:'exportInvoice/:orderId',
    component: GetInvoiceComponent,
    pathMatch: 'full',

  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate:[AuthGuard]
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }],
    canActivate:[AuthGuard]

  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
