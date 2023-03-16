import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { CardsService } from 'app/services/cards.service';
import { CreateCardComponent } from '../../create-card/create-card.component';
import { UpdateCardComponent } from 'app/update-card/update-card.component';
import { DeleteCardComponent } from 'app/delete-card/delete-card.component';
import { CreateSubscriptionComponent } from 'app/create-subscription/create-subscription.component';
import { UpdateSubscriptionComponent } from 'app/update-subscription/update-subscription.component';
import { UpdateTypeCarteComponent } from 'app/update-type-carte/update-type-carte.component';
import { DeleteTypeCarteComponent } from 'app/delete-type-carte/delete-type-carte.component';
import { CreateTypeCarteComponent } from 'app/create-type-carte/create-type-carte.component';
import { DeleteSubscriptionComponent } from 'app/delete-subscription/delete-subscription.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule,
    MatRadioModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    CreateCardComponent,
    UpdateCardComponent,
    DeleteCardComponent,
    CreateSubscriptionComponent,
    DeleteSubscriptionComponent,
    UpdateSubscriptionComponent,
    UpdateTypeCarteComponent,
    DeleteTypeCarteComponent,
    CreateTypeCarteComponent
  ],
  exports:[MatFormFieldModule,MatDialogModule],
  entryComponents:[CreateCardComponent],

})

export class AdminLayoutModule {}
