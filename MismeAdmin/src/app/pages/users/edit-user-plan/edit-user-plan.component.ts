import { Component, OnInit } from '@angular/core';
import { EatDish } from '../../../core-mismes/models/eatDish';
import { DishesService } from '../../dishes/dishes.service';
import { Dish } from '../../../core-mismes/models/dish';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user-plan',
  templateUrl: './edit-user-plan.component.html',
  styleUrls: ['./edit-user-plan.component.css']
})
export class EditUserPlanComponent implements OnInit {
  isLoading = true;

  add = false;
  eatDish: EatDish;

  allDishes: Dish[];
  selectedDish: Dish;
  qty = 0;

  constructor(private dishService: DishesService,
    private modal: NzModalRef) {

  }

  ngOnInit(): void {
    if (this.add === false) {
      this.selectedDish = this.eatDish.dish;
    }
    this.loadDishes();
  }
  loadDishes(): void {
    this.dishService.getDishes('', [], 1, 100000, '')
      .pipe(finalize(() => {
        if (this.add === false) {
          this.qty = this.eatDish.qty;
          console.log(this.selectedDish);
          const ind = this.allDishes.findIndex(d => d.id === this.eatDish.dish.id);
          if (ind > -1) {
            this.selectedDish = this.allDishes[ind];
          }

        }
      }))
      .subscribe(resp => {
        this.allDishes = resp.body.result;
        this.isLoading = false;
      }, err => { });

  }

  close(refresh: EatDish | null = null): void {
    this.modal.destroy(refresh);
  }

  save(): void {
    if (this.add === false) {
      this.eatDish.dish = this.selectedDish;
      this.eatDish.qty = this.qty;
      this.close(this.eatDish);
    } else {
      const obj: EatDish = {
        dish: this.selectedDish,
        qty: this.qty
      };
      this.close(obj);
    }
  }

}
