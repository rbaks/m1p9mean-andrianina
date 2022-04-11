import { Routes } from '@angular/router';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantEditComponent } from './restaurant-edit/restaurant-edit.component';

export const RESTAURANT_ROUTES: Routes = [
  {
    path: 'restaurants',
    component: RestaurantListComponent
  },
  {
    path: 'restaurants/:id',
    component: RestaurantEditComponent
  }
];
