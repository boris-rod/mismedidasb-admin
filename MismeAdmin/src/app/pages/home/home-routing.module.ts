import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core-mismes';
import { HomeComponent } from './home.component';
import { MessagesModule } from '../messages/messages.module';

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [AuthenticationGuard], children: [
      { path: 'users', loadChildren: () => import('../users/users.module').then(m => m.UsersModule) },
      { path: 'concepts', loadChildren: () => import('../concepts/concepts.module').then(m => m.ConceptsModule) },
      { path: 'polls', loadChildren: () => import('../polls/polls.module').then(m => m.PollsModule) },
      { path: 'dishes', loadChildren: () => import('../dishes/dishes.module').then(m => m.DishesModule) },
      { path: 'messages', loadChildren: () => import('../messages/messages.module').then(m => m.MessagesModule) }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
