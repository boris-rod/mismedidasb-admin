import { Component, OnInit } from '@angular/core';
import { CompoundDish } from '../../../core-mismes/models/compound-dish';
import { DishesService } from '../dishes.service';
import { NbSearchService, NbDialogService } from '@nebular/theme';
import { finalize } from 'rxjs/operators';
import { CompoundDishReviewComponent } from '../compound-dish-review/compound-dish-review.component';

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
  showReset: boolean = false;

  currentFilterSelection: number = 0;

  constructor(private dishService: DishesService, private searchService: NbSearchService, private dialogService: NbDialogService) { }

  ngOnInit() {
    this.loadDishes();
    this.searchService.onSearchSubmit().subscribe(s => {
      this.searchTerm = s.term;
      this.showReset = true;
      this.loadDishes();
    });
  }

  loadDishes() {
    this.isLoading = true;

    this.dishService.getUsersDishes(this.searchTerm, this.currentFilterSelection)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.results = resp.body['result'];
      }, error => {
      });
  }

  reset() {
    this.searchTerm = '';
    this.showReset = false;
    this.currentFilterSelection = 0;
    this.loadDishes();
  }

  reviewUserDish(uDish: CompoundDish) {
    this.dialogService.open(CompoundDishReviewComponent, {
      context: {
        dishToEdit: uDish
      }
    }).onClose.subscribe(s => {
      this.loadDishes();
    });
  }

  selectionChange(selection: any) {
    this.currentFilterSelection = selection;
    if (selection !== 0) {
      this.showReset = true;
    }
    else {
      this.showReset = false;
    }
    this.loadDishes();
  }

}
