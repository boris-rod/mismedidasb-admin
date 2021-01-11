import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize } from 'rxjs/operators';
import { EatsService } from '../../eats.service';

@Component({
  selector: 'app-eats',
  templateUrl: './eats.component.html',
  styleUrls: ['./eats.component.css']
})
export class EatsComponent implements OnInit {
  @Input() userId: number;
  eats: any[];
  isLoading = false;
  page = 1;
  perPage = 5;
  total: number;

  totalKcalGeneral = 0;
  totalFatGeneral = 0;
  totalFiberGeneral = 0;
  totalCarbohidratesGeneral = 0;
  totalProteinsGeneral = 0;
  constructor(private eatsService: EatsService) { }

  ngOnInit(): void {
    // this.loadEats();
  }

  loadEats(): void {
    this.isLoading = true;
    this.totalCarbohidratesGeneral = 0;
    this.totalFatGeneral = 0;
    this.totalFiberGeneral = 0;
    this.totalKcalGeneral = 0;
    this.totalProteinsGeneral = 0;
    this.eatsService.getUserEats(this.userId, this.page, this.perPage)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        const pData = resp.headers.get('PagingData');
        this.total = JSON.parse(pData).totalItems;
        this.eats = resp.body.result;
        this.eats.forEach(e => {
          let totalKCal = 0;
          let totalFat = 0;
          let totalProteins = 0;
          let totalFiber = 0;
          let totalCarbo = 0;
          const dishes: any[] = e.eatDishResponse;
          const userDishes: any[] = e.eatCompoundDishResponse;
          dishes.forEach(d => {
            totalKCal += d.dish.calories * d.qty;
            totalFat += d.dish.fat * d.qty;
            totalProteins += d.dish.proteins * d.qty;
            totalFiber += d.dish.fiber * d.qty;
            totalCarbo += d.dish.carbohydrates * d.qty;
          });
          userDishes.forEach(d => {
            totalKCal += d.compoundDish.calories * d.qty;
            totalFat += d.compoundDish.fat * d.qty;
            totalProteins += d.compoundDish.proteins * d.qty;
            totalFiber += d.compoundDish.fiber * d.qty;
            totalCarbo += d.compoundDish.carbohydrates * d.qty;
          });

          e.totalKCal = totalKCal.toFixed(2);
          e.totalFat = totalFat.toFixed(2);
          e.totalFiber = totalFiber.toFixed(2);
          e.totalProteins = totalProteins.toFixed(2);
          e.totalCarbohydrates = totalCarbo.toFixed(2);
          this.totalKcalGeneral += totalKCal;
          this.totalCarbohidratesGeneral += totalCarbo;
          this.totalFatGeneral += totalFat;
          this.totalFiberGeneral += totalFiber;
          this.totalProteinsGeneral += totalProteins;
        });
      }, error => {
      });
  }
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.perPage = params.pageSize;
    this.page = params.pageIndex;
    this.loadEats();
  }
}
