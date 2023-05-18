import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { CreateCardComponent } from '../../create-card/create-card.component';
import { OrderDetailsComponent } from 'app/order-details/order-details.component';
import { AllFeatureComponent } from 'app/all-feature/all-feature.component';
import { MenuComponent } from 'app/menu/menu.component';
import { CreateMenuComponent } from 'app/create-menu/create-menu.component';
import { MenuListComponent } from 'app/menu-list/menu-list.component';
import { AllUsersComponent } from 'app/all-users/all-users.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }], {
    //     path: '',
    //     children: [ {
    //         path: 'create-card',
    //         component: CreateCardComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'users',   component: AllUsersComponent },
    { path: 'order-dtails/:orderId',   component: OrderDetailsComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'create-card',     component: CreateCardComponent },
    { path: 'oders',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'listSM',        component: AllFeatureComponent },
    { path: 'menu',        component: MenuComponent },
    { path: 'menuList',        component: MenuListComponent },
    { path: 'createMenu',        component: CreateMenuComponent },
];
