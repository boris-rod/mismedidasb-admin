import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RejectInviteComponent } from './reject-invite.component';

const routes: Routes = [
  { path: '', component: RejectInviteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RejectInviteRoutingModule { }

