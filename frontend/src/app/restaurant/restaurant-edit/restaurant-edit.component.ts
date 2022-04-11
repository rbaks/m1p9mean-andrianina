import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../restaurant.service';
import { Restaurant } from '../restaurant';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html'
})
export class RestaurantEditComponent implements OnInit {

  id!: string;
  restaurant!: Restaurant;
  feedback: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p['id']),
        switchMap(id => {
          if (id === 'new') { return of(new Restaurant()); }
          return this.restaurantService.findById(id);
        })
      )
      .subscribe({
        next: restaurant => {
          this.restaurant = restaurant;
          this.feedback = {};
        },
        error: err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      });
  }

  save() {
    this.restaurantService.save(this.restaurant).subscribe({
      next: restaurant => {
        this.restaurant = restaurant;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(async () => {
          await this.router.navigate(['/restaurants']);
        }, 1000);
      },
      error: err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    });
  }

  async cancel() {
    await this.router.navigate(['/restaurants']);
  }
}
