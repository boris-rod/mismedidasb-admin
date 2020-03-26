import { Component, OnInit } from '@angular/core';
import { PollsService } from './polls.service';
import { Poll } from '../../core-mismes/models/poll';
import { Logger } from '../../core-mismes/logger.service';
import { finalize } from 'rxjs/operators';

const log = new Logger('Polls');

@Component({
  selector: 'polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {
  isLoading: boolean = false;
  perPage: number = 10;
  results: Poll[];
  conceptFilter = -1;
  constructor(private pollService: PollsService) { }

  ngOnInit() {
    this.loadPolls();
  }

  loadPolls() {
    this.isLoading = true;

    this.pollService.getPolls(this.conceptFilter)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.results = resp.body['result'];
      }, error => {
        log.error(error);
      });
  }

  onFilterChange(conceptId: number) {
    this.conceptFilter = conceptId;
    this.loadPolls();
  }

}
