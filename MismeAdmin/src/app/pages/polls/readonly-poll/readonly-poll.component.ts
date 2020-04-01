import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Poll } from '../../../core-mismes/models/poll';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { LocationStrategy } from '@angular/common';
import { PollsService } from '../polls.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'readonly-poll',
  templateUrl: './readonly-poll.component.html',
  styleUrls: ['./readonly-poll.component.scss']
})
export class ReadonlyPollComponent implements OnInit, AfterViewInit {
  title = '';
  poll: Poll;
  text = '';
  constructor(private ref: NbDialogRef<ReadonlyPollComponent>,
    private pollsService: PollsService,
    private toastrService: NbToastrService) {
    this.text = this.poll ? (this.poll.htmlContent ? this.poll.htmlContent : '') : '';
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  save() {
    const obj = {
      readOnly: true,
      htmlContent: this.text
    };
    this.pollsService.updatePollReadOnly(this.poll.id, obj)
      .pipe(finalize(() => {
      }))
      .subscribe(resp => {
        this.toastrService.success('Cuestionario actualizado satisfactoriamente.', 'Cuestionario');
        this.dismiss();
      }, error => {
      });
  }

  dismiss() {
    this.ref.close();
  }

  onContentChange(content: string) {
    this.text = content;
  }
}
