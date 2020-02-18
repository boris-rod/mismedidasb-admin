import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../core-mismes/models/user';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Logger } from '../../../core-mismes';
const log = new Logger('Users Table');
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() users: User[];
  @Input() isLoading: boolean;
  @Input() page: number;
  @Input() perPage: number;
  @Input() total: number;
  @Input() showReset: boolean;

  @Output() paged = new EventEmitter<number>()
  @Output() filtered = new EventEmitter<number>()
  @Output() sorted = new EventEmitter<string>()
  @Output() reseted = new EventEmitter<boolean>()
  currentFilerSelection: number = null;

  ColumnMode = ColumnMode.force;
  constructor() { }

  ngOnInit() {
  }
  setPage(pageInfo) {
    this.paged.emit(pageInfo.offset + 1);
  }
  selectionChange(selection: any) {
    if (selection !== null) {
      this.showReset = true;
    }
    this.filtered.emit(selection);
  }

  setSort(sortInfo) {
    const sort = sortInfo.sorts[0].prop + '_' + sortInfo.sorts[0].dir;
    this.sorted.emit(sort);
  }

  reset() {
    this.currentFilerSelection = null;
    this.showReset = false;
    this.reseted.emit(true);
  }
}
