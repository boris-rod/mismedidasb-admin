import { Component, OnInit, Input } from '@angular/core';
import { PollsService } from '../polls.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'delete-poll',
  templateUrl: './delete-poll.component.html',
  styleUrls: ['./delete-poll.component.scss']
})
export class DeletePollComponent implements OnInit {
  title: string;
  pollId: number;
  isLoading: boolean = false;

  constructor(private pollService: PollsService,
    protected ref: NbDialogRef<DeletePollComponent>,
    private toastrService: NbToastrService) { }

  ngOnInit() {
  }
  delete() {
    this.isLoading = true;
    this.pollService.deletePoll(this.pollId)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.toastrService.success('Custionario eliminado satisfactoriamente.', 'Eliminar Cuestionario');
        this.ref.close();
      });
  }
  dismiss() {
    this.ref.close();
  }
}
