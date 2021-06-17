import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslationsComponent } from './translations.component';

const routes: Routes = [
  { path: '', component: TranslationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslationsRoutingModule { }
