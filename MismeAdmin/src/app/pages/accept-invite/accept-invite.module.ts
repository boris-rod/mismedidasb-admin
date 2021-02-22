import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcceptInviteRoutingModule } from './accept-invite-routing.module';
import { AcceptInviteComponent } from './accept-invite.component';
import { AntModule } from '../../ant.module';



@NgModule({
  declarations: [AcceptInviteComponent],
  imports: [
    CommonModule,
    AcceptInviteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AntModule
  ]
})
export class AcceptInviteModule { }
