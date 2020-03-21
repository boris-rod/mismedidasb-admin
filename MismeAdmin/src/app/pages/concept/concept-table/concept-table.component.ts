import { Component, OnInit, Input } from '@angular/core';
import { Concept } from '../../../core-mismes/models/concept';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NbWindowService, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'concept-table',
  templateUrl: './concept-table.component.html',
  styleUrls: ['./concept-table.component.scss']
})
export class ConceptTableComponent implements OnInit {

  @Input() concepts: Concept[];
  @Input() isLoading: boolean;
  @Input() perPage: number;

  ColumnMode;

  constructor(private windowService: NbWindowService,
    private dialogService: NbDialogService) {
    this.ColumnMode = ColumnMode.force
  }

  ngOnInit() {
  }

  editConcept(concept: Concept) {

  }

}
