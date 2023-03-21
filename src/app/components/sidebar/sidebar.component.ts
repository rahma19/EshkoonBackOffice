import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'tableau de bord',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'Profil',  icon:'person', class: '' },
    { path: '/typography', title: 'Liste des types des cartes',  icon:'library_books', class: '' },
    { path: '/table-list', title: 'Liste des cartes',  icon:'content_paste', class: '' },
    { path: '/notifications', title: 'Liste des abonnements',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Liste des commandes',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Liste des utilisateurs',  icon:'location_on', class: '' },
    { path: '/upgrade', title: 'Liste des profils',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
