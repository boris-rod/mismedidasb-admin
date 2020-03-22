import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Poll } from '../../../core-mismes/models/poll';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NbWindowService } from '@nebular/theme';
import { EditPollComponent } from '../edit-poll/edit-poll.component';

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

  constructor(private windowService: NbWindowService) { }

  ngOnInit() {
  }

  editPoll(p: Poll) {
    const wind = this.windowService.open(EditPollComponent, {
      title: 'Editar Cuestionario',
      context: {
        pollToEdit: p,
      }
    }).onClose.subscribe(s => {
      this.onReloadIsNeeded.emit(true);
    });
  }
  newPoll() {
    const wind = this.windowService.open(EditPollComponent, {
      title: 'Nuevo Cuestionario',
      context: {}
    }).onClose.subscribe(s => {
      this.onReloadIsNeeded.emit(true);
    });
  }


}
