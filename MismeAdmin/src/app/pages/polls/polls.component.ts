import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Poll } from 'src/app/core-mismes/models/poll';
import { PollsService } from './polls.service';
import { Logger } from '../../core-mismes/logger.service';
import { Concept } from 'src/app/core-mismes/models/concept';
import { ConceptsService } from '../concepts/concepts.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PollDetailsComponent } from './poll-details/poll-details.component';
import { PollEditComponent } from './poll-edit/poll-edit.component';
import { PollTipsComponent } from './poll-tips/poll-tips.component';
const log = new Logger('Polls');

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css']
})
export class PollsComponent implements OnInit {

  isLoading = false;
  perPage = 10;
  results: Poll[];
  concepts: Concept[];
  conceptFilter = -1;
  constructor(private pollService: PollsService,
    private conceptService: ConceptsService,
    private modalService: NzModalService) { }

  ngOnInit(): void {
    this.conceptService.getConcepts()
      .pipe(finalize(() => {
      }))
      .subscribe(resp => {
        this.concepts = resp.body.result;
      }, error => {
      });
    this.loadPolls();
  }

  loadPolls(): void {
    this.isLoading = true;

    this.pollService.getPolls(this.conceptFilter)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.results = resp.body.result;
        log.info(this.results);
      }, error => {
        log.error(error);
      });
  }

  onFilterChange(conceptId: number): void {
    this.conceptFilter = conceptId;
    this.loadPolls();
  }

  reset(): void {
    this.conceptFilter = -1;
    this.loadPolls();
  }

  details(poll: Poll): void {
    const modal = this.modalService.create({
      nzTitle: 'Detalles del Cuestionario',
      nzContent: PollDetailsComponent,
      nzFooter: null,
      nzComponentParams: { poll },
      nzWidth: 800
      // nzBodyStyle: { height: '450px', 'overflow-y': 'auto' }
    });
    modal.afterClose.subscribe(resp => {
      if (resp === true) {
        this.loadPolls();
      }
    }, err => { });
  }
  tips(poll: Poll): void {
    const modal = this.modalService.create({
      nzTitle: 'Consejos',
      nzContent: PollTipsComponent,
      nzFooter: null,
      nzComponentParams: { poll },
      nzWidth: 950
      // nzBodyStyle: { height: '450px', 'overflow-y': 'auto' }
    });
    modal.afterClose.subscribe(resp => {
      if (resp === true) {
        this.loadPolls();
      }
    }, err => { });

  }


  edit(poll: Poll): void {
    const modal = this.modalService.create({
      nzTitle: 'Editar Cuestionario',
      nzContent: PollEditComponent,
      nzFooter: null,
      nzComponentParams: { concepts: this.concepts, pollToEdit: poll }
      // nzWidth: 1000,
      // nzBodyStyle: { height: '450px', 'overflow-y': 'auto' }
    });
    modal.afterClose.subscribe(resp => {
      if (resp === true) {
        this.loadPolls();
      }
    }, err => { });
  }

}
