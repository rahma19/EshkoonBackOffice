import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CardsService } from './services/cards.service';
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
 import{MatSelectModule} from '@angular/material/select';
 import{ MatRadioModule} from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UpdateCardComponent } from './update-card/update-card.component';
import { DeleteCardComponent } from './delete-card/delete-card.component';
import { CreateSubscriptionComponent } from './create-subscription/create-subscription.component';
import { DeleteSubscriptionComponent } from './delete-subscription/delete-subscription.component';
import { UpdateSubscriptionComponent } from './update-subscription/update-subscription.component';
import { OrderService } from './services/order.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HttpResponseInterceptor } from './core/interceptors/http-response.interceptor';
import { AuthService } from './services/auth.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,MatFormFieldModule,
    ReactiveFormsModule,MatInputModule,
    HttpClientModule, MatSelectModule,
    ComponentsModule,MatRadioModule,
    RouterModule,
    AppRoutingModule,
    MatIconModule,MatDialogModule
  ],
  declarations:[
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
], 
  exports:[MatIconModule,MatDialogModule,MatRadioModule
  ,MatSelectModule,MatInputModule,MatFormFieldModule],
  entryComponents:[],
  providers: [CardsService,OrderService, AuthService, AuthGuard,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: {} },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true,
    },
     ,{provide: MAT_DIALOG_DEFAULT_OPTIONS,  useValue: {hasBackdrop: false}},
],
  bootstrap: [AppComponent]
})
export class AppModule { }
