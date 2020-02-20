import { NgModule } from '@angular/core';
import {
  NbMenuModule,
  NbCardModule,
  NbLayoutModule,
  NbUserModule,
  NbSelectModule,
  NbIconModule,
  NbButtonModule,
  NbWindowModule,
  NbRadioModule,
  NbInputModule
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { UsersComponent } from './users/users.component';
import { TableComponent } from './users/table/table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PollsComponent } from './polls/polls.component';
import { DishesComponent } from './dishes/dishes.component';
import { PollsTableComponent } from './polls/polls-table/polls-table.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { PersonalDataTableComponent } from './personal-data/personal-data-table/personal-data-table.component';
import { DishesTableComponent } from './dishes/dishes-table/dishes-table.component';
import { AddDishComponent } from './dishes/add-dish/add-dish.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NbCardModule,
    NbLayoutModule,
    NbUserModule,
    NbSelectModule,
    NbIconModule,
    NbButtonModule,
    NbRadioModule,
    NbInputModule,
    NbWindowModule.forChild(),
    NgxDatatableModule
  ],
  declarations: [
    PagesComponent,
    UsersComponent,
    TableComponent,
    PollsComponent,
    DishesComponent,
    PollsTableComponent,
    PersonalDataComponent,
    PersonalDataTableComponent,
    DishesTableComponent,
    AddDishComponent,
  ],
  entryComponents: [
    AddDishComponent
  ]
})
export class PagesModule {
}
