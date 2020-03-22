import { Component, OnInit } from '@angular/core';
import { Poll } from '../../../core-mismes/models/poll';
import { NbWindowRef, NbToastrService, NbDialogRef } from '@nebular/theme';
import { PollsService } from '../polls.service';
import { FormControl, Validators } from '@angular/forms';
import { Concept } from '../../../core-mismes/models/concept';
import { ConceptService } from '../../concept/concept.service';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../../core-mismes/logger.service';
const log = new Logger('Edit poll');
@Component({
  selector: 'edit-poll',
  templateUrl: './edit-poll.component.html',
  styleUrls: ['./edit-poll.component.scss']
})
export class EditPollComponent implements OnInit {
  title = '';
  pollToEdit: Poll;
  isLoading: boolean = false;

  pollName = new FormControl();
  pollDescription = new FormControl();
  concepts: Concept[];

  selectedConcept: number;

  constructor(protected ref: NbDialogRef<EditPollComponent>,
    private pollService: PollsService,
    private toastrService: NbToastrService,
    private conceptService: ConceptService) {
    this.pollName.setValidators(Validators.required);
    this.pollName.setValue('');

    this.pollDescription.setValue('');
  }

  ngOnInit() {
    this.isLoading = true;
    this.conceptService.getConcepts()
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.concepts = [...resp.body['result']];
        if (this.concepts.length > 0) {
          if (this.pollToEdit) {
            var index = this.concepts.findIndex(c => c.id === this.pollToEdit.conceptId);
            if (index > -1) {
              this.selectedConcept = this.concepts[index].id;
            }
          } else {
            this.selectedConcept = this.concepts[0].id;
          }
        }

      }, error => {
        log.error(error);
      });

    if (this.pollToEdit) {
      this.pollName.setValue(this.pollToEdit.name);
      this.pollDescription.setValue(this.pollToEdit.description);
    }
  }

  savePoll() {
    this.isLoading = true;

    const obj = {
      conceptId: this.selectedConcept,
      name: this.pollName.value,
      description: this.pollDescription.value
    };

    if (this.pollToEdit) {
      obj['id'] = this.pollToEdit.id;
      this.pollService.updatePoll(obj)
        .pipe(finalize(() => {
          this.isLoading = false;
        }))
        .subscribe(poll => {
          this.toastrService.success('Cuestionario actualizado satisfactoriamente.', 'Actualizar Cuestionario');
          this.close();
        }, error => {
          if (error.status === 400) {
            this.toastrService.danger('Ya existe un cuestionario con el mismo nombre', 'Actualizar Cuestionario');
          }
        });
    } else {
      this.pollService.addPoll(obj)
        .pipe(finalize(() => {
          this.isLoading = false;
        }))
        .subscribe(poll => {
          this.toastrService.success('Cuestionario adicionado satisfactoriamente.', 'Nuevo Cuestionario');
          this.close();
        }, error => {
          if (error.status === 400) {
            this.toastrService.danger('Ya existe un cuestionario con el mismo nombre', 'Nuevo Cuestionario');
          }
        });
    }
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
