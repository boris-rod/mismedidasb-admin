import { Component, OnInit } from '@angular/core';
import { CompoundDish } from '../../../core-mismes/models/compound-dish';
import { DishesService } from '../dishes.service';
import { NbSearchService } from '@nebular/theme';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'user-dish',
  templateUrl: './user-dish.component.html',
  styleUrls: ['./user-dish.component.scss']
})
export class UserDishComponent implements OnInit {

  perPage: number = 10;
  isLoading: boolean = false;
  searchTerm: string = '';

  results: CompoundDish[];
  resetIsNeeded: boolean = false;

  constructor(private dishService: DishesService, private searchService: NbSearchService) { }

  ngOnInit() {
    this.loadDishes();
    this.searchService.onSearchSubmit().subscribe(s => {
      this.searchTerm = s.term;
      this.resetIsNeeded = true;
      this.loadDishes();
    });
  }

  loadDishes() {
    this.isLoading = true;

    this.dishService.getUsersDishes(this.searchTerm)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.results = resp.body['result'];
      }, error => {
      });
  }

  onReseted(reset: boolean) {
    if (reset) {
      this.searchTerm = '';
      this.resetIsNeeded = false;
      this.loadDishes();
    }
  }

  reviewUserDish(uDish: CompoundDish) {
    console.log(uDish);
  }
}
