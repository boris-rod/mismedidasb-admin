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
  NbInputModule,
  NbDialogModule,
  NbListModule
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
import { SharedModule } from '../core-mismes/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { DeleteDishComponent } from './dishes/delete-dish/delete-dish.component';
import { ConceptComponent } from './concept/concept.component';
import { ConceptTableComponent } from './concept/concept-table/concept-table.component';
import { EditConceptComponent } from './concept/edit-concept/edit-concept.component';
import { ConceptDetailsComponent } from './concept/concept-details/concept-details.component';
import { DeletePollComponent } from './polls/delete-poll/delete-poll.component';
import { EditPollComponent } from './polls/edit-poll/edit-poll.component';


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
    NbListModule,
    NbWindowModule.forChild(),
    NbDialogModule.forChild(),
    NgxDatatableModule,
    SharedModule,
    NgSelectModule
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
    DeleteDishComponent,
    ConceptComponent,
    ConceptTableComponent,
    EditConceptComponent,
    ConceptDetailsComponent,
    DeletePollComponent,
    EditPollComponent,
  ],
  entryComponents: [
    DeletePollComponent,
    EditPollComponent,
    AddDishComponent,
    DeleteDishComponent,
    EditConceptComponent,
    ConceptDetailsComponent
  ]
})
export class PagesModule {
}
