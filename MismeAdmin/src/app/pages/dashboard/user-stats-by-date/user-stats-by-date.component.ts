import { Component, OnInit } from '@angular/core';
import { UserStatSerie } from '../../../core-mismes/models/user-stats-series';
import { UserService } from '../../users/users.service';

import * as moment from 'moment';

@Component({
  selector: 'user-stats-by-date',
  templateUrl: './user-stats-by-date.component.html',
  styleUrls: ['./user-stats-by-date.component.scss']
})
export class UserStatsByDateComponent implements OnInit {

  results: UserStatSerie[] = [];
  options = [{
    id: 1,
    name: 'Hoy'
  }, {
    id: 2,
    name: 'Mes'
  }, {
    id: 0,
    name: 'Año'
  }];

  total: number = 0;
  currentFilterSelection = 1;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUserStatsByDate();
  }

  loadUserStatsByDate() {
    this.userService.getUserStatsByDates(this.currentFilterSelection).subscribe(
      stats => {
        this.total = 0;
        this.results = [...stats.body['result']];
        this.results.forEach(r => {
          if (this.currentFilterSelection === 1) {
            r.name = moment.utc(Number.parseInt(r.name) * 3600 * 1000).format('hh a')
          }
          r.series.forEach(s => {
            this.total += s.value;
          });
        });
      }
    );
  }

  selectionChange(event: any) {
    this.loadUserStatsByDate();
  }
}
