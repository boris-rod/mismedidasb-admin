import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { UserStatsComponent } from './user-stats/user-stats.component';
import { EatStatsComponent } from './eat-stats/eat-stats.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UserStatsByDateComponent } from './user-stats-by-date/user-stats-by-date.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NgxChartsModule
  ],
  declarations: [
    DashboardComponent,
    UserStatsComponent,
    EatStatsComponent,
    UserStatsByDateComponent,
  ],
})
export class DashboardModule { }
