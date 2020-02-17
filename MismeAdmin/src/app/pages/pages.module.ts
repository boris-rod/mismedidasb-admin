import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule, NbLayoutModule, NbUserModule, NbSelectModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { UsersComponent } from './users/users.component';
import { TableComponent } from './users/table/table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PollsComponent } from './polls/polls.component';
import { DishesComponent } from './dishes/dishes.component';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NbCardModule,
    NbLayoutModule,
    NbUserModule,
    NbSelectModule,
    NgxDatatableModule
  ],
  declarations: [
    PagesComponent,
    UsersComponent,
    TableComponent,
    PollsComponent,
    DishesComponent,
  ],
})
export class PagesModule {
}
