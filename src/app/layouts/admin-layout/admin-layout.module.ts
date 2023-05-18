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
import { status } from 'app/core/pipes/status.pipe';
import { OrderDetailsComponent } from 'app/order-details/order-details.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { CreateFeatureComponent } from 'app/create-feature/create-feature.component';
import { DeleteFeatureComponent } from 'app/delete-feature/delete-feature.component';
import { AllFeatureComponent } from 'app/all-feature/all-feature.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {  MatTableModule } from '@angular/material/table';
import { UpdateProfileComponent } from 'app/update-profile/update-profile.component';
import { MenuComponent } from 'app/menu/menu.component';
import { CreateMenuComponent } from 'app/create-menu/create-menu.component';
import { MenuListComponent } from 'app/menu-list/menu-list.component';
import { UpdateMenuDetailComponent } from 'app/update-menu-detail/update-menu-detail.component';
import { DeleteMenuDetailComponent } from 'app/delete-menu-detail/delete-menu-detail.component';
import { AddCategoryComponent } from 'app/add-category/add-category.component';
import { UpdateCategoryComponent } from 'app/update-category/update-category.component';
import { DeleteCategoryComponent } from 'app/delete-category/delete-category.component';
import { MatChipsModule } from '@angular/material/chips';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AllUsersComponent } from 'app/all-users/all-users.component';
import { userStatus } from 'app/core/pipes/userStatus.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,MatChipsModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    ClipboardModule,
    MatRippleModule,
    MatFormFieldModule,
    MatIconModule,
    Ng2SearchPipeModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule,
    MatRadioModule,
    
    MatSlideToggleModule
  ],
  declarations: [
    UpdateProfileComponent,
    status,
    userStatus,
    AllUsersComponent,
    OrderDetailsComponent,
    DashboardComponent,
    DeleteFeatureComponent,
    CreateFeatureComponent,
    AllFeatureComponent,
    UserProfileComponent,
    TableListComponent,
    MenuListComponent,
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
    CreateTypeCarteComponent,
    MenuComponent,
    CreateMenuComponent,
    UpdateMenuDetailComponent,
    DeleteMenuDetailComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    DeleteCategoryComponent
  ],
  exports:[MatFormFieldModule,MatDialogModule,MatChipsModule],
  entryComponents:[CreateCardComponent],

})

export class AdminLayoutModule {}
