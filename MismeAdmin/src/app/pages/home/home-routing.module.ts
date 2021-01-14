import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core-mismes';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [AuthenticationGuard], children: [
      { path: 'users', loadChildren: () => import('../users/users.module').then(m => m.UsersModule) },
      { path: 'concepts', loadChildren: () => import('../concepts/concepts.module').then(m => m.ConceptsModule) },
      { path: 'polls', loadChildren: () => import('../polls/polls.module').then(m => m.PollsModule) }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
