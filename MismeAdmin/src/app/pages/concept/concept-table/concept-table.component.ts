import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Concept } from '../../../core-mismes/models/concept';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NbWindowService, NbDialogService } from '@nebular/theme';
import { EditConceptComponent } from '../edit-concept/edit-concept.component';

@Component({
  selector: 'concept-table',
  templateUrl: './concept-table.component.html',
  styleUrls: ['./concept-table.component.scss']
})
export class ConceptTableComponent implements OnInit {

  @Input() concepts: Concept[];
  @Input() isLoading: boolean;
  @Input() perPage: number;

  @Output() reseted = new EventEmitter<boolean>()

  ColumnMode;

  constructor(private windowService: NbWindowService,
    private dialogService: NbDialogService) {
    this.ColumnMode = ColumnMode.force
  }

  ngOnInit() {
  }

  editConcept(concept: Concept) {
    const wind = this.windowService.open(EditConceptComponent, {
      title: 'Editar Concepto',
      context: {
        conceptToEdit: concept
      }
    });

    wind.onClose.subscribe(s => {
      this.reseted.emit(true);
    });
  }

}
