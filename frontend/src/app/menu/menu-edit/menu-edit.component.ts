import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../menu.service';
import { Menu } from '../menu';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html'
})
export class MenuEditComponent implements OnInit {

  id!: string;
  menu!: Menu;
  feedback: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p['id']),
        switchMap(id => {
          if (id === 'new') { return of(new Menu()); }
          return this.menuService.findById(id);
        })
      )
      .subscribe({
        next: menu => {
          this.menu = menu;
          this.feedback = {};
        },
        error: err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      });
  }

  save() {
    this.menuService.save(this.menu).subscribe({
      next: menu => {
        this.menu = menu;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(async () => {
          await this.router.navigate(['/menus']);
        }, 1000);
      },
      error: err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    });
  }

  async cancel() {
    await this.router.navigate(['/menus']);
  }
}
