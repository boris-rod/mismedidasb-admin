import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RejectInviteRoutingModule } from './reject-invite-routing.module';
import { RejectInviteComponent } from './reject-invite.component';
import { AntModule } from '../../ant.module';



@NgModule({
  declarations: [RejectInviteComponent],
  imports: [
    CommonModule,
    RejectInviteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AntModule
  ]
})
export class RejectInviteModule { }
