import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { UserStatsComponent } from './user-stats/user-stats.component';
import { EatStatsComponent } from './eat-stats/eat-stats.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

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
  ],
})
export class DashboardModule { }
