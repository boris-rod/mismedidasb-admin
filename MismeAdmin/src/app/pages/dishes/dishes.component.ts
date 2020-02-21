import { Component, OnInit } from '@angular/core';
import { Dish } from '../../core-mismes/models/dish';
import { DishesService } from './dishes.service';
import { NbSearchService } from '@nebular/theme';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../core-mismes/logger.service';

const log = new Logger('Dishes');
@Component({
  selector: 'dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {
  perPage: number = 10;
  isLoading: boolean = false;
  searchTerm: string = '';

  results: Dish[];
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

    this.dishService.getDishes(this.searchTerm)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {

        this.results = resp.body['result'];
      }, error => {
        log.error(error);
      });
  }

  onReseted(reset: boolean) {
    if (reset) {
      this.searchTerm = '';
      this.resetIsNeeded = false;
      this.loadDishes();
    }
  }

}
