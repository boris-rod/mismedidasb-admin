import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { HomeRoutingModule } from './home-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AntModule } from 'src/app/ant.module';


@NgModule({
  declarations: [HomeComponent, ChangePasswordComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    CommonModule,
    IconsProviderModule,
    AntModule,
  ],
})
export class HomeModule { }
