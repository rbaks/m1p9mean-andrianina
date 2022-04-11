import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';
import { MenuService } from './menu.service';
import { MENU_ROUTES } from './menu.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(MENU_ROUTES)
  ],
  declarations: [
    MenuListComponent,
    MenuEditComponent
  ],
  providers: [MenuService],
  exports: []
})
export class MenuModule { }
