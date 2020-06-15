import { Component, OnInit, Input } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { EatsService } from '../../eats.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'details-eats',
  templateUrl: './details-eats.component.html',
  styleUrls: ['./details-eats.component.scss']
})
export class DetailsEatsComponent implements OnInit {
  @Input() userId: number;
  eats: any[];
  isLoading: boolean;
  page = 1;
  perPage = 5;
  total: number;
  ColumnMode = ColumnMode.force;
  constructor(private eatsService: EatsService) { }

  ngOnInit() {
    this.loadEats();
  }
  loadEats() {
    this.isLoading = true;

    this.eatsService.getUserEats(this.userId, this.page, this.perPage)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        const pData = resp.headers.get('PagingData');
        this.total = JSON.parse(pData)['totalItems'];
        this.eats = resp.body['result'];
        this.eats.forEach(e => {
          let totalKCal = 0;
          let totalFat = 0;
          let totalProteins = 0;
          let totalFiber = 0;
          let totalCarbo = 0;
          const dishes: any[] = e['eatDishResponse'];
          const userDishes: any[] = e['eatCompoundDishResponse'];
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

          e['totalKCal'] = totalKCal.toFixed(2);
          e['totalFat'] = totalFat.toFixed(2);
          e['totalFiber'] = totalFiber.toFixed(2);
          e['totalProteins'] = totalProteins.toFixed(2);
          e['totalCarbohydrates'] = totalCarbo.toFixed(2);
        });
        console.log(this.eats);
      }, error => {
      });
  }
  setPage(pageInfo) {
    this.page = pageInfo.offset + 1;
    this.loadEats();
  }
  summaryForKcal(cells: string[]) {
    let tot = +0;
    cells.forEach(e => {
      tot += parseFloat(e);
    });
    return tot.toFixed(2);
  }
  summaryForProteins(cells: string[]) {
    let tot = 0;
    cells.forEach(e => {
      tot += parseFloat(e);
    });
    return tot.toFixed(2);
  }
  summaryForFat(cells: string[]) {
    let tot = 0;
    cells.forEach(e => {
      tot += parseFloat(e);
    });
    return tot.toFixed(2);
  }
  summaryForFiber(cells: string[]) {
    let tot = 0;
    cells.forEach(e => {
      tot += parseFloat(e);
    });
    return tot.toFixed(2);
  }
  summaryForCarbohydrates(cells: string[]) {
    let tot = 0;
    cells.forEach(e => {
      tot += parseFloat(e);
    });
    return tot.toFixed(2);
  }
}
