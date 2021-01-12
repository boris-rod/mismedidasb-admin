import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceptsComponent } from './concepts.component';
import { ConceptsRoutingModule } from './concepts-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { AntModule } from 'src/app/ant.module';
import { CoreMismesModule } from '../../core-mismes/core-mismes.module';
import { SharedModule } from '../../core-mismes/shared/shared.module';

@NgModule({
  declarations: [ConceptsComponent, EditComponent],
  imports: [
    ConceptsRoutingModule,
    CommonModule,
    // CoreMismesModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AntModule,
  ],
})
export class ConceptsModule { }
