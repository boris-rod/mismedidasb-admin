import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Concept } from 'src/app/core-mismes/models/concept';
import { Poll } from 'src/app/core-mismes/models/poll';
import { PollsService } from '../polls.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-poll-edit',
  templateUrl: './poll-edit.component.html',
  styleUrls: ['./poll-edit.component.css']
})
export class PollEditComponent implements OnInit {
  pollToEdit: Poll;
  isLoading = false;

  pollName = new FormControl();
  pollDescription = new FormControl();
  concepts: Concept[];

  selectedConcept: number;
  constructor(private modal: NzModalRef,
    private pollService: PollsService,
    private messageService: NzMessageService) {

  }

  ngOnInit(): void {
    this.pollName.setValidators(Validators.required);
    this.pollName.setValue(this.pollToEdit.name);

    this.pollDescription.setValue(this.pollToEdit.description);
    const index = this.concepts.findIndex(c => c.id === this.pollToEdit.conceptId);
    if (index > -1) {
      this.selectedConcept = this.concepts[index].id;
    }
    else {
      this.selectedConcept = this.concepts[0].id;
    }
  }

  savePoll(): void {
    this.isLoading = true;

    const obj = {
      conceptId: this.selectedConcept,
      name: this.pollName.value,
      description: this.pollDescription.value
    };

    if (this.pollToEdit) {
      // tslint:disable-next-line:no-string-literal
      obj['id'] = this.pollToEdit.id;
      this.pollService.updatePoll(obj)
        .pipe(finalize(() => {
          this.isLoading = false;
        }))
        .subscribe(poll => {
          this.messageService.success('Cuestionario actualizado satisfactoriamente.');
          this.close(true);
        }, error => {
          if (error.status === 400) {
            this.messageService.error('Ya existe un cuestionario con el mismo nombre');
          }
        });
    }
    // else {
    //   this.pollService.addPoll(obj)
    //     .pipe(finalize(() => {
    //       this.isLoading = false;
    //     }))
    //     .subscribe(poll => {
    //       this.toastrService.success('Cuestionario adicionado satisfactoriamente.', 'Nuevo Cuestionario');
    //       this.close();
    //     }, error => {
    //       if (error.status === 400) {
    //         this.toastrService.danger('Ya existe un cuestionario con el mismo nombre', 'Nuevo Cuestionario');
    //       }
    //     });
    // }
  }

  cleanFields(): void {
    this.pollDescription.setValue('');
    this.pollName.setValue('');
  }

  close(refreshIsNeeded = false): void {
    this.cleanFields();
    this.modal.destroy();
  }
}
