import { Component, OnInit } from '@angular/core';
import { DishFilter } from '../dish-filter';
import { DishService } from '../dish.service';
import { Dish } from '../dish';

@Component({
  selector: 'app-dish',
  templateUrl: 'dish-list.component.html'
})
export class DishListComponent implements OnInit {

  filter = new DishFilter();
  selectedDish!: Dish;
  feedback: any = {};

  get dishList(): Dish[] {
    return this.dishService.dishList;
  }

  constructor(private dishService: DishService) {
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.dishService.load(this.filter);
  }

  select(selected: Dish): void {
    this.selectedDish = selected;
  }

  delete(dish: Dish): void {
    if (confirm('Are you sure?')) {
      this.dishService.delete(dish).subscribe({
        next: () => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.search();
          }, 1000);
        },
        error: err => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
        }
      });
    }
  }
}
