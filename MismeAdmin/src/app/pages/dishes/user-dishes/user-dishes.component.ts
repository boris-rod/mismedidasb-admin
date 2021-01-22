import { Component, OnInit } from '@angular/core';
import { CompoundDish } from 'src/app/core-mismes/models/compound-dish';
import { DishesService } from '../dishes.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ReviewDishComponent } from '../review-dish/review-dish.component';

@Component({
  selector: 'app-user-dishes',
  templateUrl: './user-dishes.component.html',
  styleUrls: ['./user-dishes.component.css']
})
export class UserDishesComponent implements OnInit {
  perPage = 5;
  page = 1;
  total = 0;
  isLoading = false;
  searchTerm = '';

  results: CompoundDish[];
  showReset = false;

  currentFilterSelection = 0;

  sort = '';

  constructor(private dishService: DishesService,
    private modalService: NzModalService,
    private messageService: NzMessageService) { }

  ngOnInit(): void {
    // this.loadDishes();
  }

  loadDishes(): void {
    this.isLoading = true;

    this.dishService.getUsersDishes(this.searchTerm, this.currentFilterSelection, this.page, this.perPage, this.sort)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.results = resp.body.result;
        const pData = resp.headers.get('PagingData');
        this.total = JSON.parse(pData).totalItems;
        console.log(this.results);
      }, error => {
      });
  }

  reset(): void {
    this.searchTerm = '';
    this.showReset = false;
    this.currentFilterSelection = 0;
    this.loadDishes();
  }

  view(uDish: CompoundDish): void {
    const modal = this.modalService.create({
      nzTitle: 'Plato de Usuario',
      nzContent: ReviewDishComponent,
      nzFooter: null,
      nzWidth: 900,
      // nzBodyStyle: { 'max-height': '450px', 'overflow-y': 'auto', 'overflow-x': 'hidden' },
      nzComponentParams: {
        dishToEdit: uDish
      }
    });

    modal.afterClose.subscribe(resp => {
      if (resp === true) {
        this.loadDishes();
      }
    });
  }

  selectionChange(selection: any): void {
    this.currentFilterSelection = selection;
    if (selection !== 0) {
      this.showReset = true;
    }
    else {
      this.showReset = false;
    }
    this.loadDishes();
  }
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.perPage = params.pageSize;
    this.page = params.pageIndex;
    if (sortField !== null) {
      if (sortOrder === 'ascend') {
        this.sort = sortField + '_asc';
      }
      else {
        this.sort = sortField + '_desc';
      }
    }
    this.loadDishes();
  }
}
