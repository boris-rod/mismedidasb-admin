import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { AntModule } from '../../ant.module';
import { MessagesRoutingModule } from './messages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewMessageComponent } from './view-message/view-message.component';
import { SendMessagesAudienceComponent } from './send-messages-audience/send-messages-audience.component';
import { QuillModule } from 'ngx-quill';
import { GroupAudienceComponent } from './send-messages-audience/group-audience/group-audience.component';
import { UserAudienceComponent } from './send-messages-audience/user-audience/user-audience.component';



@NgModule({
  declarations: [MessagesComponent, ViewMessageComponent, SendMessagesAudienceComponent, GroupAudienceComponent, UserAudienceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AntModule,
    MessagesRoutingModule,
    QuillModule.forRoot()
  ]
})
export class MessagesModule { }
