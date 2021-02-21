import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AntModule } from 'src/app/ant.module';
import { SharedModule } from '../../core-mismes/shared/shared.module';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { GroupMembersComponent } from './group-members/group-members.component';
import { GroupInviteComponent } from './group-invite/group-invite.component';

@NgModule({
  declarations: [GroupsComponent, EditGroupComponent, GroupMembersComponent, GroupInviteComponent],
  imports: [
    GroupsRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AntModule
  ],
})
export class GroupsModule { }
