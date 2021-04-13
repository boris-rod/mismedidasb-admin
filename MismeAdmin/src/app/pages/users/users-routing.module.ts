import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { GroupUsersComponent } from './group-users/group-users.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'group-users', component: GroupUsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
