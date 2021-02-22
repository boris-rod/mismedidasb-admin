import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  imports: [
    NzLayoutModule,
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
    NzTabsModule,
    NzListModule,
    NzSkeletonModule,
    NzSelectModule,
    NzTypographyModule,
    NzFormModule,
    NzUploadModule,
    NzInputNumberModule,
    NzCardModule,
    NzRadioModule,
    NzTransferModule,
    NzSpinModule],
  exports: [
    NzLayoutModule,
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
    NzTabsModule,
    NzListModule,
    NzSkeletonModule,
    NzSelectModule,
    NzTypographyModule,
    NzFormModule,
    NzUploadModule,
    NzInputNumberModule,
    NzCardModule,
    NzRadioModule,
    NzTransferModule,
    NzSpinModule
  ],
  providers: [NzMessageService, NzModalService]
})
export class AntModule { }
