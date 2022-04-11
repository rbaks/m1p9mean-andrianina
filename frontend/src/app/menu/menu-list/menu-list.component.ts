import { Component, OnInit } from '@angular/core';
import { MenuFilter } from '../menu-filter';
import { MenuService } from '../menu.service';
import { Menu } from '../menu';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu-list.component.html',
})
export class MenuListComponent implements OnInit {
  filter = new MenuFilter();
  selectedMenu!: Menu;
  feedback: any = {};

  get menuList(): Menu[] {
    return this.menuService.menuList;
  }

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.menuService.load(this.filter);
  }

  select(selected: Menu): void {
    this.selectedMenu = selected;
  }

  delete(menu: Menu): void {
    if (confirm('Are you sure?')) {
      this.menuService.delete(menu).subscribe({
        next: () => {
          this.feedback = {
            type: 'success',
            message: 'Delete was successful!',
          };
          setTimeout(() => {
            this.search();
          }, 1000);
        },
        error: (err) => {
          this.feedback = { type: 'warning', message: 'Error deleting.' };
        },
      });
    }
  }
}
