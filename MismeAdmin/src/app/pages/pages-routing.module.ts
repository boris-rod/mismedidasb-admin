import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { PollsComponent } from './polls/polls.component';
import { DishesComponent } from './dishes/dishes.component';
import { AuthenticationGuard } from '../core-mismes';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { ConceptComponent } from './concept/concept.component';
import { TranslationsComponent } from './translations/translations.component';
import { TipsTranslationsComponent } from './translations/tips-translations/tips-translations.component';
import { ConceptTranslationsComponent } from './translations/concept-translations/concept-translations.component';
import { QuestionTranslationsComponent } from './translations/question-translations/question-translations.component';
import { AnswersTranslationsComponent } from './translations/answers-translations/answers-translations.component';
import { PollTranslationsComponent } from './translations/poll-translations/poll-translations.component';
import { DishesTranslationsComponent } from './translations/dishes-translations/dishes-translations.component';
import { ResultsTranslationsComponent } from './translations/results-translations/results-translations.component';
import { ReminderTranslationsComponent } from './translations/reminder-translations/reminder-translations.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivate: [AuthenticationGuard],
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'users',
      component: UsersComponent,
    },
    {
      path: 'concept',
      component: ConceptComponent,
    },
    // {
    //   path: 'personal-data',
    //   component: PersonalDataComponent,
    // },
    {
      path: 'polls',
      component: PollsComponent,
    },
    {
      path: 'dishes',
      component: DishesComponent,
    },
    {
      path: 'translations/tip',
      component: TipsTranslationsComponent,
    },
    {
      path: 'translations/question',
      component: QuestionTranslationsComponent,
    },
    {
      path: 'translations/concept',
      component: ConceptTranslationsComponent,
    },
    {
      path: 'translations/answer',
      component: AnswersTranslationsComponent,
    },
    {
      path: 'translations/poll',
      component: PollTranslationsComponent,
    },
    {
      path: 'translations/reminder',
      component: ReminderTranslationsComponent,
    },
    {
      path: 'translations/result',
      component: ResultsTranslationsComponent,
    },
    {
      path: 'translations/dish',
      component: DishesTranslationsComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
