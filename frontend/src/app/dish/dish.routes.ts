import { Routes } from '@angular/router';
import { DishListComponent } from './dish-list/dish-list.component';
import { DishEditComponent } from './dish-edit/dish-edit.component';

export const DISH_ROUTES: Routes = [
  {
    path: 'dishes',
    component: DishListComponent
  },
  {
    path: 'dishes/:id',
    component: DishEditComponent
  }
];
