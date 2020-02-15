import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { PollsComponent } from './polls/polls.component';
import { DishesComponent } from './dishes/dishes.component';
import { AuthenticationGuard } from '../core-mismes';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivate: [AuthenticationGuard],
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'users',
      component: UsersComponent,
    },
    {
      path: 'polls',
      component: PollsComponent,
    },
    {
      path: 'dishes',
      component: DishesComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
