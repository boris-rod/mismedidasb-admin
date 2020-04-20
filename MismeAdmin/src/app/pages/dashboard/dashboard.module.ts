import { NgModule } from '@angular/core';
import { NbCardModule, NbSelectModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { UserStatsComponent } from './user-stats/user-stats.component';
import { EatStatsComponent } from './eat-stats/eat-stats.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UserStatsByDateComponent } from './user-stats-by-date/user-stats-by-date.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    ThemeModule,
    NgxChartsModule,
    NbSelectModule,
    NgSelectModule
  ],
  declarations: [
    DashboardComponent,
    UserStatsComponent,
    EatStatsComponent,
    UserStatsByDateComponent,
  ],
})
export class DashboardModule { }
