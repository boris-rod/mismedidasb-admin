import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, TemplateRef } from '@angular/core';
import { Concept } from '../../../core-mismes/models/concept';
import { NbWindowRef, NbToastrService, NbDialogService, NbDialogRef } from '@nebular/theme';
import { ConceptService } from '../concept.service';
import { Poll } from '../../../core-mismes/models/poll';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../../core-mismes/logger.service';
import { PollsService } from '../../polls/polls.service';
import { DeletePollComponent } from '../../polls/delete-poll/delete-poll.component';
const log = new Logger('Concept details');
@Component({
  selector: 'concept-details',
  templateUrl: './concept-details.component.html',
  styleUrls: ['./concept-details.component.scss']
})
export class ConceptDetailsComponent implements OnInit {
  title = '';
  isLoading = false;
  concept: Concept;
  polls: Poll[];

  selectedPoll: Poll;
  showInput = false;
  pollName = '';

  pollToDelete = 0;

  @ViewChild('conceptTitleElement', { static: false }) conceptTitleElement!: ElementRef;

  constructor(protected ref: NbDialogRef<ConceptDetailsComponent>,
    private conceptService: ConceptService,
    private pollService: PollsService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService) { }

  ngOnInit() {
    this.loadPolls();
  }
  loadPolls() {
    this.isLoading = true;
    this.conceptService.getConceptPolls(this.concept.id)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        // this.polls = resp.body['result'];
        this.polls = resp.body['result'].sort((a, b) => a.order - b.order)
      }, error => {
        log.error(error);
      });
  }
  // save() {

  // }
  close() {
    this.ref.close();
  }
  selectionChange(event: any, poll: Poll) {
    const ind = this.polls.findIndex(p => p.id === poll.id);
    this.polls[event - 1].order = ind + 1;
    const obj = {
      pollOneId: poll.id,
      pollOneOrder: poll.order,
      pollTwoId: this.polls[event - 1].id,
      pollTwoOrder: this.polls[event - 1].order
    };

    this.conceptService.updateConceptPollOrder(this.concept.id, obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.toastrService.success('Cuestionarios actualizados satisfactoriamente.', 'Concepto');
        this.loadPolls();
      }, error => {
        log.error(error);
      });
  }


  hideInput() {
    if (this.pollName !== '') {
      this.showInput = false;
      if (this.selectedPoll.name !== this.pollName) {
        this.selectedPoll.name = this.pollName;
        this.pollService.updatePollTitle(this.selectedPoll.id, this.selectedPoll.name)
          .pipe(finalize(() => {

          }))
          .subscribe(not => {
            this.toastrService.success('Cuestionario actualizado satisfactoriamente.', 'Concepto');
            const index = this.polls.findIndex(p => p.id === this.selectedPoll.id);
            if (index > -1) {
              this.polls[index].name = this.selectedPoll.name;
              this.polls = [...this.polls];
            }
          },
          );
      }
    }
  }
  inlineEdition(poll: Poll) {
    this.selectedPoll = poll;
    this.pollName = poll.name;
    this.showInput = true;
    setTimeout(() => {
      this.conceptTitleElement.nativeElement.focus();
    }, 0);
  }

  newPoll() {
    const obj = {
      name: 'Cuestionario-' + new Date().toUTCString(),
      conceptId: this.concept.id
    };
    this.pollService.addPoll(obj)
      .pipe(finalize(() => {

      }))
      .subscribe(not => {
        this.toastrService.success('Cuestionario adicionado satisfactoriamente.', 'Cuestionario');
        this.loadPolls();
      },
      );
  }

  deletePoll(poll: Poll, dialog: TemplateRef<any>) {

    this.pollToDelete = poll.id;
    this.dialogService.open(dialog, {

    }).onClose.subscribe(s => {
      this.loadPolls();
    });
  }

  deletePollDialog(ref: NbDialogRef<any>) {
    this.isLoading = true;
    this.pollService.deletePoll(this.pollToDelete)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.pollToDelete = 0;
        this.toastrService.success('Custionario eliminado satisfactoriamente.', 'Eliminar Cuestionario');
        ref.close();
      });
  }
  dismissDeletePoll(ref: NbDialogRef<any>) {
    ref.close();
  }
}

