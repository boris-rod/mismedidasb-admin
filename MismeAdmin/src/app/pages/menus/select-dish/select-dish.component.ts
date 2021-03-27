import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Dish } from 'src/app/core-mismes/models/dish';
import { MenusService } from '../menus.service';
import { DishesService } from '../../dishes/dishes.service';
import { debounceTime, finalize, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-select-dish',
  templateUrl: './select-dish.component.html',
  styleUrls: ['./select-dish.component.css']
})
export class SelectDishComponent implements OnInit {
  isLoading = false;
  qty = 1;
  dish: Dish;
  allDishes: Dish[];
  search = '';

  constructor(private menusService: MenusService,
    private messageService: NzMessageService,
    private modal: NzModalRef,
    private modalService: NzModalService,
    private dishService: DishesService) {

  }

  ngOnInit(): void {
    this.getDishes();
  }

  getDishes(): void {
    this.dishService.getDishes(this.search, [], 1, 1000000, '')
      .pipe(finalize(() => {
      }))
      .subscribe(resp => {
        this.allDishes = resp.body.result;
      }, error => {
      });
  }

  close(obj = null): void {
    this.modal.destroy(obj);
  }

  select(): void {
    const obj = { qty: this.qty, dish: this.dish };
    this.close(obj);
  }


}
