import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
  declarations: [
    AppComponent,
    AdminLayoutComponent,
],
  exports:[MatIconModule,MatDialogModule,MatRadioModule
  ,MatSelectModule,MatInputModule,MatFormFieldModule],
  entryComponents:[],
  providers: [CardsService ,{provide: MAT_DIALOG_DEFAULT_OPTIONS,  useValue: {hasBackdrop: false}},
],
  bootstrap: [AppComponent]
})
export class AppModule { }
