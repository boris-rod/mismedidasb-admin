import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Poll } from '../../../core-mismes/models/poll';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NbDialogService } from '@nebular/theme';
import { EditPollComponent } from '../edit-poll/edit-poll.component';
import { DeletePollComponent } from '../delete-poll/delete-poll.component';

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

  constructor(private dialogService: NbDialogService) { }

  ngOnInit() {
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

  newPoll() {
    this.dialogService.open(EditPollComponent, {
      context: {
        title: 'Nuevo Cuestionario'
      }
    }).onClose.subscribe(s => {
      this.onReloadIsNeeded.emit(true);
    });
  }

  deletePoll(poll: Poll) {
    this.dialogService.open(DeletePollComponent, {
      context: {
        title: 'Eliminar Cuestionario',
        pollId: poll.id
      }
    }).onClose.subscribe(s => {
      this.onReloadIsNeeded.emit(true);
    });
  }
}
