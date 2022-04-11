import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DishListComponent } from './dish-list/dish-list.component';
import { DishEditComponent } from './dish-edit/dish-edit.component';
import { DishService } from './dish.service';
import { DISH_ROUTES } from './dish.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(DISH_ROUTES)
  ],
  declarations: [
    DishListComponent,
    DishEditComponent
  ],
  providers: [DishService],
  exports: []
})
export class DishModule { }
