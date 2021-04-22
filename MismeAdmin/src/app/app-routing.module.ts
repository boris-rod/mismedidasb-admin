import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CancelSubscriptionComponent } from './pages/cancel-subscription/cancel-subscription.component';
import { CancelSubscriptionModule } from './pages/cancel-subscription/cancel-subscription.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home/dashboard' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  {
    path: 'accept-invite/:token',
    loadChildren: () => import('./pages/accept-invite/accept-invite.module').then(m => m.AcceptInviteModule)
  },
  {
    path: 'reject-invite/:token',
    loadChildren: () => import('./pages/reject-invite/reject-invite.module').then(m => m.RejectInviteModule)
  },
  {
    path: 'email-unsuscribe/:token',
    loadChildren: () => import('./pages/cancel-subscription/cancel-subscription.module').then(m => m.CancelSubscriptionModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
