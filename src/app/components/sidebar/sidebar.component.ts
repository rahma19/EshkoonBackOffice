import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'app/services/navbar.service';

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
    { path: '/users', title: 'Utilisateurs',  icon:'persons', class: '' },
    { path: '/typography', title: 'Liste des types des cartes',  icon:'library_books', class: '' },
    { path: '/table-list', title: 'Liste des cartes',  icon:'content_paste', class: '' },
    { path: '/notifications', title: 'Liste des abonnements',  icon:'library_books', class: '' },
    { path: '/listSM', title: 'Liste des réseaux Sociaux',  icon:'unarchive', class: '' },
    { path: '/oders', title: 'Liste des commandes',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Liste des utilisateurs',  icon:'location_on', class: '' },
    { path: '/upgrade', title: 'Liste des cartes  ',  icon:'notifications', class: '' },
    { path: '/menu', title: 'Liste des menu  ',  icon:'notifications', class: '' },
    // { path: '/menu', title: 'Liste des menu',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  value='e-shkoon'
  constructor(public nav:NavbarService) { }

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
