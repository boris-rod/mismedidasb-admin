import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AntModule } from '../../ant.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { EatStatsComponent } from './eat-stats/eat-stats.component';
import { UserStatsComponent } from './user-stats/user-stats.component';
import { UserStatsBydateComponent } from './user-stats-bydate/user-stats-bydate.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [DashboardComponent, EatStatsComponent, UserStatsComponent, UserStatsBydateComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AntModule,
    NgxChartsModule
  ]
})
export class DashboardModule { }
