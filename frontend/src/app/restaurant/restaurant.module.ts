import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantEditComponent } from './restaurant-edit/restaurant-edit.component';
import { RestaurantService } from './restaurant.service';
import { RESTAURANT_ROUTES } from './restaurant.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(RESTAURANT_ROUTES)
  ],
  declarations: [
    RestaurantListComponent,
    RestaurantEditComponent
  ],
  providers: [RestaurantService],
  exports: []
})
export class RestaurantModule { }
