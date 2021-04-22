import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AntModule } from '../../ant.module';
import { CancelSubscriptionRoutingModule } from './cancel-subscription-routing.module';
import { CancelSubscriptionComponent } from './cancel-subscription.component';



@NgModule({
  declarations: [CancelSubscriptionComponent],
  imports: [
    CommonModule,
    CancelSubscriptionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AntModule
  ]
})
export class CancelSubscriptionModule { }
