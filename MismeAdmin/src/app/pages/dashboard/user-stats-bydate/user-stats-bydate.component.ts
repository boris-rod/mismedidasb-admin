import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core-mismes/models/user';
import { UserStatSerie } from 'src/app/core-mismes/models/user-stats-series';
import { UserStatsSharedService } from 'src/app/core-mismes/shared/services/user-stats-shared.service';
import { UsersService } from '../../users/users.service';

import * as moment from 'moment';
@Component({
  selector: 'app-user-stats-bydate',
  templateUrl: './user-stats-bydate.component.html',
  styleUrls: ['./user-stats-bydate.component.css']
})
export class UserStatsBydateComponent implements OnInit, OnDestroy {
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

  total = 0;
  currentFilterSelection = 1;

  registeredUserSubscription: Subscription;
  activatedUserSubscription: Subscription;
  disabledUserSubscription: Subscription;

  constructor(private userService: UsersService, private userStatsSharedService: UserStatsSharedService) {
    this.registeredUserSubscription = this.userStatsSharedService.getRegisteredUserSubject().subscribe(user => {
      this.updateRegisteredUsers(user);
    });

    this.activatedUserSubscription = this.userStatsSharedService.getActivedUserSubject().subscribe(user => {
      this.updateActivatedUsers(user);
    });

    this.disabledUserSubscription = this.userStatsSharedService.getDisabledUserSubject().subscribe(user => {
      this.updateDisabledUsers(user);
    });

  }

  ngOnInit(): void {
    this.loadUserStatsByDate();
  }

  loadUserStatsByDate(): void {
    this.userService.getUserStatsByDates(this.currentFilterSelection).subscribe(
      stats => {
        this.total = 0;
        this.results = [...stats.body.result];
        this.results.forEach(r => {
          if (this.currentFilterSelection === 1) {
            // tslint:disable-next-line:radix
            r.name = moment.utc(Number.parseInt(r.name) * 3600 * 1000).format('hh a');
          }
          r.series.forEach(s => {
            this.total += s.value;
          });
        });
      }
    );
  }

  selectionChange(event: any): void {
    this.loadUserStatsByDate();
  }

  updateRegisteredUsers(user: User): void {
    this.loadUserStatsByDate();
  }

  updateActivatedUsers(user: User): void {
    this.loadUserStatsByDate();
  }

  updateDisabledUsers(user: User): void {
    this.loadUserStatsByDate();
  }

  ngOnDestroy(): void {
    this.disabledUserSubscription.unsubscribe();
    this.registeredUserSubscription.unsubscribe();
    this.activatedUserSubscription.unsubscribe();
  }
}
