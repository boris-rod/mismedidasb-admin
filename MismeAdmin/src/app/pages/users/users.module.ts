import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { QuillModule } from 'ngx-quill';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [UsersComponent, MessageComponent, DetailsComponent],
  imports: [
    UsersRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzAvatarModule,
    NzDropDownModule,
    NzMenuModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzGridModule,
    NzToolTipModule,
    NzPopconfirmModule,
    NzDividerModule,
    QuillModule.forRoot()
  ],
  providers: [NzMessageService, NzModalService]
})
export class UsersModule { }
