import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CancelSubscriptionComponent } from './cancel-subscription.component';

const routes: Routes = [
  { path: '', component: CancelSubscriptionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CancelSubscriptionRoutingModule { }

