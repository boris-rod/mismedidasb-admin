import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { AntModule } from '../../ant.module';
import { MessagesRoutingModule } from './messages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewMessageComponent } from './view-message/view-message.component';



@NgModule({
  declarations: [MessagesComponent, ViewMessageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AntModule,
    MessagesRoutingModule
  ]
})
export class MessagesModule { }
