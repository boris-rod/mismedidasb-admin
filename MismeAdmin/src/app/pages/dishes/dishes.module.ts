import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishesRoutingModule } from './dishes-routing.module';
import { AntModule } from '../../ant.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DishesComponent } from './dishes.component';
import { AddDishComponent } from './add-dish/add-dish.component';
import { SharedModule } from '../../core-mismes/shared/shared.module';
import { UserDishesComponent } from './user-dishes/user-dishes.component';
import { ReviewDishComponent } from './review-dish/review-dish.component';



@NgModule({
  declarations: [DishesComponent, AddDishComponent, UserDishesComponent, ReviewDishComponent],
  imports: [
    CommonModule,
    DishesRoutingModule,
    AntModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DishesModule { }
