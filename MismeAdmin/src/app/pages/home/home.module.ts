import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { HomeRoutingModule } from './home-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';


@NgModule({
  declarations: [HomeComponent, ChangePasswordComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    CommonModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzAvatarModule,
    NzInputModule,
    NzGridModule,
    NzButtonModule,
    NzDropDownModule,
    NzToolTipModule,
  ],
  providers: [NzModalService, NzMessageService]
})
export class HomeModule { }
