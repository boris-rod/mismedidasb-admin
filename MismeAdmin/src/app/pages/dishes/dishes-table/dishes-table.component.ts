import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dish } from '../../../core-mismes/models/dish';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AddDishComponent } from '../add-dish/add-dish.component';
import { NbWindowService } from '@nebular/theme';
import { Logger } from '../../../core-mismes';
const log = new Logger('Dishes Table');
@Component({
  selector: 'dishes-table',
  templateUrl: './dishes-table.component.html',
  styleUrls: ['./dishes-table.component.scss']
})
export class DishesTableComponent implements OnInit {

  @Input() dishes: Dish[];
  @Input() isLoading: boolean;
  @Input() perPage: number;
  @Input() showReset: boolean;

  @Output() reseted = new EventEmitter<boolean>()

  ColumnMode = ColumnMode.force;

  constructor(private windowService: NbWindowService) { }

  ngOnInit() {
  }

  reset() {
    this.showReset = false;
    this.reseted.emit(true);
  }

  newDish() {
    const wind = this.windowService.open(AddDishComponent, {
      title: 'Nuevo Plato',
      context: {

      }
    });

    wind.onClose.subscribe(s => {

    });
  }
}
