import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';
import { QuillModule } from 'ngx-quill';
import { DetailsComponent } from './details/details.component';
import { EatsComponent } from './details/eats/eats.component';
import { ValueMeasuresComponent } from './details/value-measures/value-measures.component';
import { WellnessMeasuresComponent } from './details/wellness-measures/wellness-measures.component';
import { AntModule } from '../../ant.module';
import { UserSendCoinsComponent } from './user-send-coins/user-send-coins.component';
import { GroupUsersComponent } from './group-users/group-users.component';
import { GroupUsersCalendarComponent } from './group-users-calendar/group-users-calendar.component';


@NgModule({
  declarations: [UsersComponent,
    MessageComponent,
    DetailsComponent,
    EatsComponent,
    ValueMeasuresComponent,
    WellnessMeasuresComponent,
    UserSendCoinsComponent,
    GroupUsersComponent,
    GroupUsersCalendarComponent],
  imports: [
    UsersRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AntModule
  ]
})
export class UsersModule { }
