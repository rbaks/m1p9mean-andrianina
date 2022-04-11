import { Component, OnInit } from '@angular/core';
import { RestaurantFilter } from '../restaurant-filter';
import { RestaurantService } from '../restaurant.service';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'app-restaurant',
  templateUrl: 'restaurant-list.component.html'
})
export class RestaurantListComponent implements OnInit {

  filter = new RestaurantFilter();
  selectedRestaurant!: Restaurant;
  feedback: any = {};

  get restaurantList(): Restaurant[] {
    return this.restaurantService.restaurantList;
  }

  constructor(private restaurantService: RestaurantService) {
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.restaurantService.load(this.filter);
  }

  select(selected: Restaurant): void {
    this.selectedRestaurant = selected;
  }

  delete(restaurant: Restaurant): void {
    if (confirm('Are you sure?')) {
      this.restaurantService.delete(restaurant).subscribe({
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
