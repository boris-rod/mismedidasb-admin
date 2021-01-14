import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollsRoutingModule } from './polls-routing.module';
import { PollsComponent } from './polls.component';
import { AntModule } from '../../ant.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PollDetailsComponent } from './poll-details/poll-details.component';
import { PollEditComponent } from './poll-edit/poll-edit.component';
import { PollTipsComponent } from './poll-tips/poll-tips.component';
import { QuestionEditComponent } from './question-edit/question-edit.component';



@NgModule({
  declarations: [PollsComponent, PollDetailsComponent, PollEditComponent, PollTipsComponent, QuestionEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PollsRoutingModule,
    AntModule
  ]
})
export class PollsModule { }
