import { Component, OnInit, OnDestroy } from '@angular/core';
import { EatStatSerie } from '../../../core-mismes/models/eat-stats-series';
import { UserService } from '../../users/users.service';
import * as moment from 'moment';

@Component({
  selector: 'eat-stats',
  templateUrl: './eat-stats.component.html',
  styleUrls: ['./eat-stats.component.scss']
})
export class EatStatsComponent implements OnInit, OnDestroy {
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

  total: number = 0;
  currentFilterSelection = 1;

  // registeredUserSubscription: Subscription;
  // activatedUserSubscription: Subscription;
  // disabledUserSubscription: Subscription;

  constructor(private userService: UserService/*, private userStatsSharedService: UserStatsSharedService*/) {
    // this.registeredUserSubscription = this.userStatsSharedService.getRegisteredUserSubject().subscribe(user => {
    //   this.updateRegisteredUsers(user);
    // });

    // this.activatedUserSubscription = this.userStatsSharedService.getActivedUserSubject().subscribe(user => {
    //   this.updateActivatedUsers(user);
    // });

    // this.disabledUserSubscription = this.userStatsSharedService.getDisabledUserSubject().subscribe(user => {
    //   this.updateDisabledUsers(user);
    // });

  }

  ngOnInit() {
    this.loadEatStatsCount();
    this.loadEatStatsByDate();
  }

  loadEatStatsCount() {
    this.userService.getUserEatsCount().subscribe(
      stats => {
        this.total = stats.body['result'];
      }
    );
  }

  loadEatStatsByDate() {
    this.userService.getUserEatsByDates(this.currentFilterSelection).subscribe(
      stats => {
        // this.total = 0;
        this.results = [...stats.body['result']];
        this.results.forEach(r => {
          if (this.currentFilterSelection === 1) {
            r.name = moment.utc(Number.parseInt(r.name) * 3600 * 1000).format('hh a')
          }
          // r.series.forEach(s => {
          //   this.total += s.value;
          // });
        });
      }
    );
  }

  selectionChange(event: any) {
    this.loadEatStatsByDate();
  }

  // updateRegisteredUsers(user: User) {
  //   this.loadUserStatsByDate();
  // }

  // updateActivatedUsers(user: User) {
  //   this.loadUserStatsByDate();
  // }

  // updateDisabledUsers(user: User) {
  //   this.loadUserStatsByDate();
  // }

  ngOnDestroy() {
    // this.disabledUserSubscription.unsubscribe();
    // this.registeredUserSubscription.unsubscribe();
    // this.activatedUserSubscription.unsubscribe();
  }
}
