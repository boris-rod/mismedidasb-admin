import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core-mismes';
import { ConceptsComponent } from './concepts.component';

const routes: Routes = [
  { path: '', component: ConceptsComponent, canActivate: [AuthenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConceptsRoutingModule { }
