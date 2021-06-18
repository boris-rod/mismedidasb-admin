import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntModule } from '../../ant.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { TranslationsRoutingModule } from './translations-routing.module';
import { TranslationsComponent } from './translations.component';
import { AnswersTranslationsComponent } from './answers-translations/answers-translations.component';
import { ConceptsTranslationsComponent } from './concepts-translations/concepts-translations.component';
import { DishesTranslationsComponent } from './dishes-translations/dishes-translations.component';
import { GeneralContentTranslationsComponent } from './general-content-translations/general-content-translations.component';
import { PollsTranslationsComponent } from './polls-translations/polls-translations.component';
import { QuestionsTranslationsComponent } from './questions-translations/questions-translations.component';
import { RemindersTranslationsComponent } from './reminders-translations/reminders-translations.component';
import { ResultsTranslationsComponent } from './results-translations/results-translations.component';
import { TipsTranslationsComponent } from './tips-translations/tips-translations.component';
import { TipsForTranslationComponent } from './tips-translations/tips-for-translation/tips-for-translation.component';
import { ResultsForTranslationComponent } from './results-translations/results-for-translation/results-for-translation.component';
import { ReminderForTranslationComponent } from './reminders-translations/reminder-for-translation/reminder-for-translation.component';
import { GeneralContentForTranslationComponent } from './general-content-translations/general-content-for-translation/general-content-for-translation.component';
import { AnswerForTranslationComponent } from './answers-translations/answer-for-translation/answer-for-translation.component';

@NgModule({
  declarations: [TranslationsComponent, AnswersTranslationsComponent,
    ConceptsTranslationsComponent, DishesTranslationsComponent,
    GeneralContentTranslationsComponent, PollsTranslationsComponent,
    QuestionsTranslationsComponent, RemindersTranslationsComponent, ResultsTranslationsComponent, TipsTranslationsComponent, TipsForTranslationComponent, ResultsForTranslationComponent, ReminderForTranslationComponent, GeneralContentForTranslationComponent, AnswerForTranslationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AntModule,
    TranslationsRoutingModule,
    QuillModule.forRoot()
  ]
})
export class TranslationsModule { }
