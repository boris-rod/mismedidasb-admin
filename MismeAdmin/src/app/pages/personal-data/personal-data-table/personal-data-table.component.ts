import { Component, OnInit, Input } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { PersonalData } from '../../../core-mismes/models/personal-data';

@Component({
  selector: 'personal-data-table',
  templateUrl: './personal-data-table.component.html',
  styleUrls: ['./personal-data-table.component.scss']
})
export class PersonalDataTableComponent implements OnInit {
  @Input() pDatas: PersonalData[];
  @Input() isLoading: boolean;
  @Input() page: number;
  @Input() perPage: number;
  @Input() total: number;
  ColumnMode = ColumnMode.force;

  constructor() { }

  ngOnInit() {
  }

}
