import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactUs } from '../../../core-mismes/models/contact-us';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ViewMessageComponent } from '../view-message/view-message.component';
import { ContactUsService } from '../contact-us.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'message-table',
  templateUrl: './message-table.component.html',
  styleUrls: ['./message-table.component.scss']
})
export class MessageTableComponent implements OnInit {

  @Input() messages: ContactUs[];
  @Input() isLoading: boolean;
  @Input() page: number;
  @Input() perPage: number;
  @Input() total: number;
  @Input() showReset: boolean;

  @Output() paged = new EventEmitter<number>()
  @Output() priorityFiltered = new EventEmitter<number>()
  @Output() readFiltered = new EventEmitter<number>()
  @Output() sorted = new EventEmitter<string>()
  @Output() reseted = new EventEmitter<boolean>()

  @Output() refreshMessagesRead = new EventEmitter<ContactUs>()
  @Output() refreshMessagesImportant = new EventEmitter<ContactUs>()
  @Output() refreshMessagesAnswered = new EventEmitter<ContactUs>()

  currentPriorityFilterSelection: number = -1;
  currentReadFilterSelection: number = -1;

  ColumnMode = ColumnMode.force;
  constructor(private dialogService: NbDialogService,
    private contactUsService: ContactUsService,
    private toastrService: NbToastrService) { }

  ngOnInit() {
  }

  setPage(pageInfo) {
    this.paged.emit(pageInfo.offset + 1);
  }

  prioritySelectionChange(selection: any) {
    if (selection !== -1) {
      this.showReset = true;
    }
    else {
      this.showReset = false;
    }
    this.priorityFiltered.emit(selection);
  }

  readSelectionChange(selection: any) {
    if (selection !== -1) {
      this.showReset = true;
    }
    else {
      this.showReset = false;
    }
    this.readFiltered.emit(selection);
  }

  setSort(sortInfo) {
    const sort = sortInfo.sorts[0].prop + '_' + sortInfo.sorts[0].dir;
    this.sorted.emit(sort);
  }

  reset() {
    this.currentPriorityFilterSelection = -1;
    this.currentReadFilterSelection = -1;
    this.showReset = false;
    this.reseted.emit(true);
  }

  read(mess: ContactUs) {
    this.dialogService.open(ViewMessageComponent, {
      context: {
        message: mess
      }
    }).onClose.subscribe(s => {
      var ind = this.messages.findIndex(m => m.id === mess.id);
      if (ind > -1) {

        if (this.messages[ind].read === false) {
          this.refreshMessagesRead.emit(this.messages[ind]);
        }

        if (s === true) {
          this.refreshMessagesAnswered.emit(this.messages[ind]);
        }
      }
    });
  }
  markAsReadUnread(mess: ContactUs) {
    this.contactUsService.markReadUnread(mess.id, mess.read === true ? false : true)
      .pipe(finalize(() => {
      }))
      .subscribe(resp => {
        this.toastrService.success('Mensaje actualizado satisfactoriamente.', 'Actualizar Mensaje');
        var ind = this.messages.findIndex(m => m.id === mess.id);
        if (ind > -1) {
          this.refreshMessagesRead.emit(this.messages[ind]);
        }
      }, error => {
      });
  }

  markAsImportant(mess: ContactUs) {
    this.contactUsService.markImportantNormal(mess.id, mess.priorityId === 0 ? true : false)
      .pipe(finalize(() => {
      }))
      .subscribe(resp => {
        this.toastrService.success('Mensaje actualizado satisfactoriamente.', 'Actualizar Mensaje');
        var ind = this.messages.findIndex(m => m.id === mess.id);
        if (ind > -1) {
          this.refreshMessagesImportant.emit(this.messages[ind]);
        }
      }, error => {
      });
  }
}
