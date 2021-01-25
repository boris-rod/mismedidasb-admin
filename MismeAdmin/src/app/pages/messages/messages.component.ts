import { Component, OnInit } from '@angular/core';
import { ContactUs } from 'src/app/core-mismes/models/contact-us';
import { MessagesService } from './messages.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize } from 'rxjs/operators';
import { Logger } from 'src/app/core-mismes';
import { ViewMessageComponent } from './view-message/view-message.component';
const log = new Logger('Messages');

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  page = 1;
  perPage = 5;
  isLoading = false;
  total = 0;
  sort = '';
  searchTerm = '';
  readFilter = -1;
  priorityFilter = -1;


  results: ContactUs[];
  resetIsNeeded = false;

  constructor(private messageService: MessagesService,
    private nzMessage: NzMessageService,
    private modalService: NzModalService) { }

  ngOnInit(): void {
  }

  loadMessages(): void {
    this.isLoading = true;

    this.messageService.getMessages(this.page, this.perPage, this.sort, this.searchTerm, this.readFilter, this.priorityFilter)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        const pData = resp.headers.get('PagingData');
        this.total = JSON.parse(pData).totalItems;
        this.results = resp.body.result;
      }, error => {
        log.error(error);
      });
  }


  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.perPage = params.pageSize;
    this.page = params.pageIndex;
    if (sortField !== null) {
      if (sortOrder === 'ascend') {
        this.sort = sortField + '_asc';
      }
      else {
        this.sort = sortField + '_desc';
      }
    }
    this.loadMessages();
  }

  onChangePrioritySelection(priority: any): void {
    if (priority !== -1) {
      this.resetIsNeeded = true;
    }
    this.loadMessages();
  }
  onChangeSelection(read: any): void {
    if (read !== -1) {
      this.resetIsNeeded = true;
    }
    this.loadMessages();
  }
  reset(): void {
    this.resetIsNeeded = false;
    this.priorityFilter = -1;
    this.readFilter = -1;
    this.loadMessages();
  }

  view(message: ContactUs): void {
    const modal = this.modalService.create({
      nzTitle: 'Mensaje',
      nzContent: ViewMessageComponent,
      nzFooter: null,
      nzWidth: 900,
      nzBodyStyle: { 'max-height': '450px', 'overflow-y': 'auto' },
      nzComponentParams: {
        message
      }
    });
    modal.afterClose.subscribe(
      resp => {
        if (resp === true) {
          this.loadMessages();
        }
      }
    );

  }

  markAsReadUnread(mess: ContactUs): void {
    this.messageService.markReadUnread(mess.id, mess.read === true ? false : true)
      .pipe(finalize(() => {
      }))
      .subscribe(resp => {
        this.nzMessage.success('Ticket actualizado satisfactoriamente.');
        this.loadMessages();
      }, error => {
      });
  }

  markAsImportant(mess: ContactUs): void {
    this.messageService.markImportantNormal(mess.id, mess.priorityId === 0 ? true : false)
      .pipe(finalize(() => {
      }))
      .subscribe(resp => {
        this.nzMessage.success('Ticket actualizado satisfactoriamente.');
        this.loadMessages();
      }, error => {
      });
  }
}
