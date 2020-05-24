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
  NbListModule,
  NbTooltipModule,
  NbAccordionModule,
  NbTabsetModule,
  NbCheckboxModule
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
import { PollDetailsComponent } from './polls/poll-details/poll-details.component';
import { AddQuestionComponent } from './question/add-question/add-question.component';
import { EditQuestionComponent } from './question/edit-question/edit-question.component';
import { ReadonlyPollComponent } from './polls/readonly-poll/readonly-poll.component';
import { PollTipsComponent } from './polls/poll-tips/poll-tips.component';
import { DisableUserComponent } from './users/disable-user/disable-user.component';
import { EnableUserComponent } from './users/enable-user/enable-user.component';
import { NotifyUserComponent } from './users/notify-user/notify-user.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationsComponent } from './translations/translations.component';
import { AnswersTranslationsComponent } from './translations/answers-translations/answers-translations.component';
import { ConceptTranslationsComponent } from './translations/concept-translations/concept-translations.component';
import { PollTranslationsComponent } from './translations/poll-translations/poll-translations.component';
import { QuestionTranslationsComponent } from './translations/question-translations/question-translations.component';
import { TipsTranslationsComponent } from './translations/tips-translations/tips-translations.component';
import { ConceptFormTranslationComponent } from './translations/concept-translations/concept-form-translation/concept-form-translation.component';
import { TipsFormTranslationComponent } from './translations/tips-translations/tips-form-translation/tips-form-translation.component';
import { PollFormTranslateComponent } from './translations/poll-translations/poll-form-translate/poll-form-translate.component';
import { DishesTranslationsComponent } from './translations/dishes-translations/dishes-translations.component';
import { ResultsTranslationsComponent } from './translations/results-translations/results-translations.component';
import { ReminderTranslationsComponent } from './translations/reminder-translations/reminder-translations.component';
import { QuestionFormTranslateComponent } from './translations/question-translations/question-form-translate/question-form-translate.component';
import { AnswerFormTranslateComponent } from './translations/answers-translations/answer-form-translate/answer-form-translate.component';
import { DishFormTranslateComponent } from './translations/dishes-translations/dish-form-translate/dish-form-translate.component';
import { ReminderFormTranslateComponent } from './translations/reminder-translations/reminder-form-translate/reminder-form-translate.component';
import { ResultFormTranslateComponent } from './translations/results-translations/result-form-translate/result-form-translate.component';
import { GeneralContentTranslationsComponent } from './translations/general-content-translations/general-content-translations.component';
import { ContentFormTranslateComponent } from './translations/general-content-translations/content-form-translate/content-form-translate.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageTableComponent } from './messages/message-table/message-table.component';
import { ViewMessageComponent } from './messages/view-message/view-message.component';
import { UserDishComponent } from './dishes/user-dish/user-dish.component';


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
    NbTooltipModule,
    NbAccordionModule,
    NbTabsetModule,
    NbCheckboxModule,
    NbWindowModule.forChild(),
    NbDialogModule.forChild(),
    NgxDatatableModule,
    SharedModule,
    NgSelectModule,
    TranslateModule
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
    PollDetailsComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    ReadonlyPollComponent,
    PollTipsComponent,
    DisableUserComponent,
    EnableUserComponent,
    NotifyUserComponent,
    TranslationsComponent,
    AnswersTranslationsComponent,
    ConceptTranslationsComponent,
    PollTranslationsComponent,
    QuestionTranslationsComponent,
    TipsTranslationsComponent,
    ConceptFormTranslationComponent,
    TipsFormTranslationComponent,
    PollFormTranslateComponent,
    DishesTranslationsComponent,
    ResultsTranslationsComponent,
    ReminderTranslationsComponent,
    QuestionFormTranslateComponent,
    AnswerFormTranslateComponent,
    DishFormTranslateComponent,
    ReminderFormTranslateComponent,
    ResultFormTranslateComponent,
    GeneralContentTranslationsComponent,
    ContentFormTranslateComponent,
    MessagesComponent,
    MessageTableComponent,
    ViewMessageComponent,
    UserDishComponent,
  ],
  entryComponents: [
    DeletePollComponent,
    EditPollComponent,
    AddDishComponent,
    DeleteDishComponent,
    EditConceptComponent,
    ConceptDetailsComponent,
    PollDetailsComponent,
    EditQuestionComponent,
    ReadonlyPollComponent,
    PollTipsComponent,
    DisableUserComponent,
    EnableUserComponent,
    NotifyUserComponent,
    ViewMessageComponent
  ]
})
export class PagesModule {
}
