import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserStatSerie } from '../../../core-mismes/models/user-stats-series';
import { UserService } from '../../users/users.service';

import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { UserStatsSharedService } from '../../../core-mismes/shared/services/user-stats-shared.service';
import { User } from '../../../core-mismes/models/user';

@Component({
  selector: 'user-stats-by-date',
  templateUrl: './user-stats-by-date.component.html',
  styleUrls: ['./user-stats-by-date.component.scss']
})
export class UserStatsByDateComponent implements OnInit, OnDestroy {

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

  registeredUserSubscription: Subscription;
  activatedUserSubscription: Subscription;
  disabledUserSubscription: Subscription;

  constructor(private userService: UserService, private userStatsSharedService: UserStatsSharedService) {
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

  updateRegisteredUsers(user: User) {
    this.loadUserStatsByDate();
  }

  updateActivatedUsers(user: User) {
    this.loadUserStatsByDate();
  }

  updateDisabledUsers(user: User) {
    this.loadUserStatsByDate();
  }

  ngOnDestroy() {
    this.disabledUserSubscription.unsubscribe();
    this.registeredUserSubscription.unsubscribe();
    this.activatedUserSubscription.unsubscribe();
  }
}
