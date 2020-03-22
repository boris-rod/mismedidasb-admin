import { Component, OnInit } from '@angular/core';
import { Poll } from '../../../core-mismes/models/poll';
import { NbWindowRef, NbToastrService } from '@nebular/theme';
import { PollsService } from '../polls.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'edit-poll',
  templateUrl: './edit-poll.component.html',
  styleUrls: ['./edit-poll.component.scss']
})
export class EditPollComponent implements OnInit {
  pollToEdit: Poll;
  isLoading: boolean = false;

  pollName = new FormControl();
  pollDescription = new FormControl();

  constructor(protected ref: NbWindowRef,
    private pollService: PollsService,
    private toastrService: NbToastrService) {
    this.pollName.setValidators(Validators.required);
    this.pollName.setValue('');

    this.pollDescription.setValue('');
  }

  ngOnInit() {
    if (this.pollToEdit) {
      this.pollName.setValue(this.pollToEdit.name);
      this.pollDescription.setValue(this.pollToEdit.description);
    }
  }

  savePoll() {
    this.isLoading = true;
  }

  cleanFields() {
    this.pollDescription.setValue('');
    this.pollName.setValue('');
  }

  close() {
    this.cleanFields();
    this.ref.close();
  }
}
