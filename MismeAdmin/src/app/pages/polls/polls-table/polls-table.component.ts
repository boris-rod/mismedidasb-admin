import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { Poll } from '../../../core-mismes/models/poll';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NbDialogService } from '@nebular/theme';
import { EditPollComponent } from '../edit-poll/edit-poll.component';
import { DeletePollComponent } from '../delete-poll/delete-poll.component';
import { PollDetailsComponent } from '../poll-details/poll-details.component';
import { Concept } from '../../../core-mismes/models/concept';
import { ConceptService } from '../../concept/concept.service';
import { finalize } from 'rxjs/operators';
import { ReadonlyPollComponent } from '../readonly-poll/readonly-poll.component';
import { PollTipsComponent } from '../poll-tips/poll-tips.component';

@Component({
  selector: 'polls-table',
  templateUrl: './polls-table.component.html',
  styleUrls: ['./polls-table.component.scss']
})
export class PollsTableComponent implements OnInit {
  @Input() polls: Poll[];
  @Input() isLoading: boolean;
  @Input() perPage: number;

  ColumnMode = ColumnMode.force;

  @Output() onReloadIsNeeded = new EventEmitter<boolean>()
  @Output() onFilterChange = new EventEmitter<number>()

  concepts: Concept[];
  currentFilerSelection: number = -1;

  constructor(private dialogService: NbDialogService,
    private conceptService: ConceptService) { }

  ngOnInit() {

    this.conceptService.getConcepts()
      .pipe(finalize(() => {
      }))
      .subscribe(resp => {
        this.concepts = resp.body['result'];

      }, error => {
      });
  }

  editPoll(p: Poll) {
    this.dialogService.open(EditPollComponent, {
      context: {
        title: 'Editar Cuestionario',
        pollToEdit: p
      }
    }).onClose.subscribe(s => {
      this.onReloadIsNeeded.emit(true);
    });
  }

  // newPoll() {
  //   this.dialogService.open(EditPollComponent, {
  //     context: {
  //       title: 'Nuevo Cuestionario'
  //     }
  //   }).onClose.subscribe(s => {
  //     this.onReloadIsNeeded.emit(true);
  //   });
  // }

  // deletePoll(poll: Poll) {
  //   this.dialogService.open(DeletePollComponent, {
  //     context: {
  //       title: 'Eliminar Cuestionario',
  //       pollId: poll.id
  //     }
  //   }).onClose.subscribe(s => {
  //     this.onReloadIsNeeded.emit(true);
  //   });
  // }

  pollDetails(poll: Poll) {
    this.dialogService.open(PollDetailsComponent, {
      context: {
        title: 'Detalles del Cuestionario',
        poll: poll
      }
    }).onClose.subscribe(s => {
      this.onReloadIsNeeded.emit(true);
    });
  }

  selectionChange(event: any) {
    this.onFilterChange.emit(event);
  }
  reset() {
    this.currentFilerSelection = -1;
    this.onFilterChange.emit(-1);
  }

  // makeReadOnly(p: Poll) {
  //   this.dialogService.open(ReadonlyPollComponent, {
  //     context: {
  //       title: 'Solo Lectura',
  //       poll: p
  //     }
  //   }).onClose.subscribe(s => {
  //     this.onReloadIsNeeded.emit(true);
  //   });
  // }

  // questionAnswers(row: Poll) {
  //   row.isReadOnly = false;
  //   this.dialogService.open(PollDetailsComponent, {
  //     context: {
  //       title: 'Preguntas/Respuestas',
  //       poll: row
  //     }
  //   }).onClose.subscribe(s => {
  //     this.onReloadIsNeeded.emit(true);
  //   });
  // }

  tips(row: Poll) {
    this.dialogService.open(PollTipsComponent, {
      context: {
        title: 'Consejos',
        poll: row
      }
    }).onClose.subscribe(s => {
      this.onReloadIsNeeded.emit(true);
    });
  }
}
