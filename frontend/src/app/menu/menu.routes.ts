import { Routes } from '@angular/router';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';

export const MENU_ROUTES: Routes = [
  {
    path: 'menus',
    component: MenuListComponent
  },
  {
    path: 'menus/:id',
    component: MenuEditComponent
  }
];
