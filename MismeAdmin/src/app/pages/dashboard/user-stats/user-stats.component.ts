import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core-mismes/models/user';
import { UserStatsSharedService } from 'src/app/core-mismes/shared/services/user-stats-shared.service';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit, OnDestroy {

  pendingString = 'Por Activar';
  disabledString = 'Deshabilitado';
  activeString = 'Activo';
  userStats = [];

  total = 0;
  active = 0;
  pending = 0;
  disabled = 0;
  registeredUserSubscription: Subscription;
  activatedUserSubscription: Subscription;
  disabledUserSubscription: Subscription;
  constructor(private userService: UsersService,
    private userStatsSharedService: UserStatsSharedService) {
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
    this.getUserStats();
  }

  updateRegisteredUsers(user: User): void {
    // update total and pending users
    this.total = this.total + 1;
    this.pending = this.pending + 1;

    // update value
    const index = this.userStats.findIndex(u => u.name === this.pendingString);
    if (index !== -1) {
      const us = this.userStats[index];
      us.value = this.pending;
      this.userStats.splice(index, 1);
      this.userStats = [...this.userStats, us];
    }
    // create if not exists the entry for pending users
    else {
      const us = {
        value: this.pending,
        name: this.pendingString
      };
      this.userStats = [...this.userStats, us];
    }
  }

  updateActivatedUsers(user: User): void {
    this.pending = this.pending - 1;
    this.active = this.active + 1;

    const pendingIndex = this.userStats.findIndex(u => u.name === this.pendingString);
    const activeIndex = this.userStats.findIndex(u => u.name === this.activeString);
    if (pendingIndex !== -1) {
      const us = this.userStats[pendingIndex];
      us.value = this.pending;

      this.userStats.splice(pendingIndex, 1);
      this.userStats = [...this.userStats, us];
    }
    // create if not exists the entry for pending users
    else {
      const us = {
        value: this.pending,
        name: this.pendingString
      };
      this.userStats = [...this.userStats, us];
    }


    if (activeIndex !== -1) {
      const us = this.userStats[activeIndex];
      us.value = this.active;

      this.userStats.splice(activeIndex, 1);
      this.userStats = [...this.userStats, us];
    }
  }

  updateDisabledUsers(user: User): void {
    this.disabled = this.disabled + 1;
    this.active = this.active - 1;

    const disabledIndex = this.userStats.findIndex(u => u.name === this.disabledString);
    const activeIndex = this.userStats.findIndex(u => u.name === this.activeString);
    if (disabledIndex !== -1) {
      const us = this.userStats[disabledIndex];
      us.value = this.disabled;

      this.userStats.splice(disabledIndex, 1);
      this.userStats = [...this.userStats, us];
    }
    // create if not exists the entry for disabled users
    else {
      const us = {
        value: this.disabled,
        name: this.disabledString
      };
      this.userStats = [...this.userStats, us];
    }

    if (activeIndex !== -1) {
      const us = this.userStats[activeIndex];
      us.value = this.active;

      this.userStats.splice(activeIndex, 1);
      this.userStats = [...this.userStats, us];
    }
  }

  getUserStats(): void {
    this.userService.getUserStats().subscribe(stats => {
      this.userStats = stats.body.result;
      this.userStats.forEach(s => {
        this.total = this.total + s.value;
        switch (s.name) {
          case this.activeString:
            this.active = s.value;
            break;
          case this.pendingString:
            this.pending = s.value;
            break;
          default:
            this.disabled = s.value;
            break;
        }
      });
    });
  }
  ngOnDestroy(): void {
    this.disabledUserSubscription.unsubscribe();
    this.registeredUserSubscription.unsubscribe();
    this.activatedUserSubscription.unsubscribe();
  }

}
