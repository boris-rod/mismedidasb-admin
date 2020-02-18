import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dish } from '../../../core-mismes/models/dish';
import { ColumnMode } from '@swimlane/ngx-datatable';

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

  constructor() { }

  ngOnInit() {
  }

  reset() {
    this.showReset = false;
    this.reseted.emit(true);
  }
}
