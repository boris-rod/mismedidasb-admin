import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { GroupUsersComponent } from './group-users/group-users.component';
import { GroupUsersCalendarComponent } from './group-users-calendar/group-users-calendar.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'group-users', component: GroupUsersComponent },
  { path: 'calendar/:userId', component: GroupUsersCalendarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
