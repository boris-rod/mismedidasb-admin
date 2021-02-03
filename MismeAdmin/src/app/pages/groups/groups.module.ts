import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AntModule } from 'src/app/ant.module';
import { SharedModule } from '../../core-mismes/shared/shared.module';
import { GroupsRoutingModule } from './groups-routing.module';

@NgModule({
  declarations: [],
  imports: [
    GroupsRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AntModule,
  ],
})
export class GroupsModule { }
