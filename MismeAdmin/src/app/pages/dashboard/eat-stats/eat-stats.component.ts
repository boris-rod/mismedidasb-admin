import { Component, OnInit } from '@angular/core';
import { EatStatSerie } from 'src/app/core-mismes/models/eat-stats-series';
import { UsersService } from '../../users/users.service';

import * as moment from 'moment';
@Component({
  selector: 'app-eat-stats',
  templateUrl: './eat-stats.component.html',
  styleUrls: ['./eat-stats.component.css']
})
export class EatStatsComponent implements OnInit {

  results: EatStatSerie[] = [];
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

  total = 0;
  currentFilterSelection = 1;

  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
    this.loadEatStatsCount();
    this.loadEatStatsByDate();
  }

  loadEatStatsCount(): void {
    this.userService.getUserEatsCount().subscribe(
      stats => {
        this.total = stats.body.result;
      }
    );
  }

  loadEatStatsByDate(): void {
    this.userService.getUserEatsByDates(this.currentFilterSelection).subscribe(
      stats => {
        this.results = [...stats.body.result];
        this.results.forEach(r => {
          if (this.currentFilterSelection === 1) {
            // tslint:disable-next-line:radix
            r.name = moment.utc(Number.parseInt(r.name) * 3600 * 1000).format('hh a');
          }
        });
      }
    );
  }

  selectionChange(event: any): void {
    this.loadEatStatsByDate();
  }




}
