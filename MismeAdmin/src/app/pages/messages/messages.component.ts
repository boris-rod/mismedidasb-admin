import { Component, OnInit } from '@angular/core';
import { ContactUs } from '../../core-mismes/models/contact-us';
import { ContactUsService } from './contact-us.service';
import { NbSearchService } from '@nebular/theme';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../core-mismes/logger.service';

const log = new Logger('Messages');
@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  page: number = 1;
  perPage: number = 10;
  isLoading: boolean = false;
  total = 0;
  sort = '';
  searchTerm: string = '';
  readFilter: number = -1;
  priorityFilter: number = -1;


  results: ContactUs[];
  resetIsNeeded: boolean = false;


  constructor(private contactUsService: ContactUsService, private searchService: NbSearchService) { }

  ngOnInit() {
    this.loadMessages();
    this.searchService.onSearchSubmit().subscribe(s => {
      this.searchTerm = s.term;
      this.resetIsNeeded = true;
      this.loadMessages();
    });
  }

  loadMessages() {
    this.isLoading = true;

    this.contactUsService.getMessages(this.page, this.perPage, this.sort, this.searchTerm, this.readFilter, this.priorityFilter)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        const pData = resp.headers.get('PagingData');
        this.total = JSON.parse(pData)['totalItems'];
        this.results = resp.body['result'];
        console.log(this.results);
      }, error => {
        log.error(error);
      });
  }

  onPaged(page: number) {
    this.page = page;
    this.loadMessages();
  }
  onPriorityFiltered(filter: number) {
    this.priorityFilter = filter;
    this.page = 1;
    this.loadMessages();
  }
  onReadFiltered(filter: number) {
    this.readFilter = filter;
    this.page = 1;
    this.loadMessages();
  }
  onSorted(sort: string) {
    this.sort = sort;
    this.loadMessages();
  }
  onReseted(reset: boolean) {
    if (reset) {
      this.sort = '';
      this.searchTerm = '';
      this.readFilter = -1;
      this.priorityFilter = -1;
      this.page = 1;
      this.resetIsNeeded = false;
      this.loadMessages();
    }
  }
  onRefreshMessagesRead(mess: ContactUs) {
    var ind = this.results.findIndex(m => m.id === mess.id);
    if (ind > -1) {
      this.results[ind].read = this.results[ind].read === true ? false : true;
      this.results = [...this.results];
    }
  }
  onRefreshMessagesImportant(mess: ContactUs) {
    var ind = this.results.findIndex(m => m.id === mess.id);
    if (ind > -1) {
      this.results[ind].priorityId = this.results[ind].priorityId === 0 ? 1 : 0;
      this.results = [...this.results];
    }
  }
  onRefreshMessagesAnswered(mess: ContactUs) {
    var ind = this.results.findIndex(m => m.id === mess.id);
    if (ind > -1) {
      this.results[ind].isAnswered = true;
      this.results = [...this.results];
    }
  }

}
