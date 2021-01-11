import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceptsComponent } from './concepts.component';
import { ConceptsRoutingModule } from './concepts-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { AntModule } from 'src/app/ant.module';

@NgModule({
  declarations: [ConceptsComponent, EditComponent],
  imports: [
    ConceptsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AntModule,
  ],
})
export class ConceptsModule { }
