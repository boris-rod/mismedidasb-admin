import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntModule } from '../../ant.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenusRoutingModule } from './menus-routing.module';
import { MenusComponent } from './menus.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { SelectDishComponent } from './select-dish/select-dish.component';


@NgModule({
  declarations: [MenusComponent, EditMenuComponent, SelectDishComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AntModule,
    MenusRoutingModule
  ]
})
export class MenusModule { }
