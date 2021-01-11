import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceptsComponent } from './concepts.component';
import { ConceptsRoutingModule } from './concepts-routing.module';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [ConceptsComponent, EditComponent],
  imports: [
    ConceptsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzIconModule,
    NzInputModule,
    NzToolTipModule,
    NzAvatarModule,
    NzGridModule,
    NzTypographyModule,
    NzFormModule,
    NzDividerModule,
    NzButtonModule,
  ],
  providers: [NzMessageService]
})
export class ConceptsModule { }
