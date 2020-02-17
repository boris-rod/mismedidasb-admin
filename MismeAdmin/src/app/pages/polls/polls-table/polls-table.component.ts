import { Component, OnInit, Input } from '@angular/core';
import { Poll } from '../../../core-mismes/models/poll';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'polls-table',
  templateUrl: './polls-table.component.html',
  styleUrls: ['./polls-table.component.scss']
})
export class PollsTableComponent implements OnInit {
  @Input() polls: Poll[];
  @Input() isLoading: boolean;
  @Input() page: number;
  @Input() perPage: number;
  @Input() total: number;
  ColumnMode = ColumnMode.force;

  constructor() { }

  ngOnInit() {
  }

}
