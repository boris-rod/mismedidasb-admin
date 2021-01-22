import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Dish } from 'src/app/core-mismes/models/dish';
import { DishesService } from './dishes.service';
import { Logger } from '../../core-mismes/logger.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { TagService } from './tags.service';
import { Tag } from 'src/app/core-mismes/models/tag';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddDishComponent } from './add-dish/add-dish.component';
import { Subscriber } from 'rxjs';

const log = new Logger('Dishes');
@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {

  page = 1;
  perPage = 5;
  isLoading = true;
  total = 0;
  searchTerm = '';

  tagsFilter: number[] = [];
  currentTag = -1;

  results: Dish[];
  showReset = false;
  sort = '';

  tags: Tag[] = [];

  constructor(private dishService: DishesService,
    private tagService: TagService,
    private messageService: NzMessageService,
    private modalService: NzModalService) { }

  ngOnInit(): void {
    this.tagService.getTags().subscribe(t => {
      this.tags = [...t.body.result];
    });
  }


  loadDishes(): void {
    this.isLoading = true;

    this.dishService.getDishes(this.searchTerm, this.tagsFilter, this.page, this.perPage, this.sort)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.results = resp.body.result;
        const pData = resp.headers.get('PagingData');
        this.total = JSON.parse(pData).totalItems;
      }, error => {
        log.error(error);
      });
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


  delete(dish: Dish): void {
    this.isLoading = true;
    this.dishService.deleteDish(dish.id)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.messageService.success('Plato eliminado satisfactoriamente.');
        this.loadDishes();
      });
  }
  edit(dish: Dish): void {
    const modal = this.modalService.create({
      nzTitle: 'Editar Plato',
      nzContent: AddDishComponent,
      nzFooter: null,
      nzWidth: 900,
      nzBodyStyle: { 'max-height': '450px', 'overflow-y': 'auto' },
      nzComponentParams: {
        dishToEdit: dish
      }
    });
    modal.afterClose.subscribe(
      resp => {
        if (resp === true) {
          this.loadDishes();
        }
      }
    );
  }
  newDish(): void {
    const modal = this.modalService.create({
      nzTitle: 'Nuevo Plato',
      nzContent: AddDishComponent,
      nzFooter: null,
      nzWidth: 900,
      nzBodyStyle: { 'max-height': '450px', 'overflow-y': 'auto' },
      nzComponentParams: {
        dishToEdit: null
      }
    });
    modal.afterClose.subscribe(
      resp => {
        if (resp === true) {
          this.loadDishes();
        }
      }
    );
  }
  onChangeTagSelection(event: any): void {
    this.showReset = true;
    if (event === -1) {
      this.tagsFilter = [];
    }
    else {
      this.tagsFilter = [];
      this.tagsFilter.push(event);
    }
    this.loadDishes();
  }
  search(): void {
    this.showReset = true;
    if (this.currentTag === -1) {
      this.tagsFilter = [];
    }
    else {
      this.tagsFilter = [];
      this.tagsFilter.push(this.currentTag);
    }
    this.loadDishes();
  }
  reset(): void {
    this.searchTerm = '';
    this.currentTag = -1;
    this.tagsFilter = [];
    this.showReset = false;
    this.loadDishes();
  }
}
