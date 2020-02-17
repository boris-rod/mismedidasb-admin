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

  @Output() paged = new EventEmitter<number>()
  @Output() filtered = new EventEmitter<number>()
  currentFilerSelection: number = -1;

  ColumnMode = ColumnMode.force;
  constructor() { }

  ngOnInit() {
  }
  setPage(pageInfo) {
    this.paged.emit(pageInfo.offset + 1);
  }
  selectionChange(selection: any) {
    if (selection !== this.currentFilerSelection) {
      log.debug("entre");
      this.filtered.emit(selection);
    }

  }
}
