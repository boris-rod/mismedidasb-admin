import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { EatsService } from '../eats.service';
import { Logger } from '../../../core-mismes/logger.service';
import { UserPlanSummary } from '../../../core-mismes/models/plan-summary';
import { NzModalService } from 'ng-zorro-antd/modal';
import { OneDayPlanComponent } from '../one-day-plan/one-day-plan.component';

const log = new Logger('Eats calendar');

@Component({
  selector: 'app-group-users-calendar',
  templateUrl: './group-users-calendar.component.html',
  styleUrls: ['./group-users-calendar.component.css']
})
export class GroupUsersCalendarComponent implements OnInit {
  isLoading = false;
  selectedValue = new Date();
  currentMonth = 0;
  userId = 0;

  summaries: UserPlanSummary[] = [];

  constructor(private eatService: EatsService, private route: ActivatedRoute,
    private modalService: NzModalService) { }

  ngOnInit(): void {
    this.currentMonth = this.selectedValue.getMonth();
    this.route.params.subscribe(param => {
      this.userId = param.userId;
      this.getMonthEatsSummary();
    });
  }

  selectChange(select: Date): void {
    if (this.currentMonth !== select.getMonth()) {
      this.currentMonth = select.getMonth();
      this.getMonthEatsSummary();
    }

  }

  getMonthEatsSummary(): void {
    const firstDay = new Date(this.selectedValue.getFullYear(), this.selectedValue.getMonth(), 1).toUTCString();
    const lastDay = new Date(this.selectedValue.getFullYear(), this.selectedValue.getMonth() + 1, 0).toUTCString();

    this.eatService.getMonthSummary(this.userId, firstDay, lastDay)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.summaries = resp.result;
        this.summaries.forEach(sum => {
          sum.planDateTime = new Date(sum.planDateTime);
        });
      }, error => { });
  }

  getEntry(date: Date): any {
    const ind = this.summaries.findIndex(r => new Date(r.planDateTime).getFullYear() === date.getFullYear() &&
      new Date(r.planDateTime).getMonth() === date.getMonth() && new Date(r.planDateTime).getDate() === date.getDate());
    if (ind > -1) {
      return this.summaries[ind];
    }
    return null;

  }

  explorePlan(entry: UserPlanSummary): void {
    const modal = this.modalService.create({
      nzTitle: 'Revisar Plan',
      nzContent: OneDayPlanComponent,
      nzFooter: null,
      nzComponentParams: { userId: this.userId, entry },
      nzWidth: 1400,
      nzBodyStyle: { height: '600px', 'overflow-y': 'auto' }
    });
    modal.afterClose.subscribe(resp => {
      if (resp === true) {
        this.getMonthEatsSummary();
      }
    });
  }

  newPlan(date: Date): void {
    const d = new Date();
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), d.getHours(), d.getMinutes());

    const modal = this.modalService.create({
      nzTitle: 'Revisar Plan',
      nzContent: OneDayPlanComponent,
      nzFooter: null,
      nzComponentParams: { userId: this.userId, newPlan: true, newPlanDate: date },
      nzWidth: 1400,
      nzBodyStyle: { height: '600px', 'overflow-y': 'auto' }
    });
    modal.afterClose.subscribe(resp => {
      if (resp === true) {
        this.getMonthEatsSummary();
      }
    });
  }
}
