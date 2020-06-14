import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../core-mismes/models/user';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Logger } from '../../../core-mismes';
import { NbDialogService } from '@nebular/theme';
import { EnableUserComponent } from '../enable-user/enable-user.component';
import { DisableUserComponent } from '../disable-user/disable-user.component';
import { NotifyUserComponent } from '../notify-user/notify-user.component';
import { DetailsUserComponent } from '../details-user/details-user.component';
const log = new Logger('Users Table');
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() users: User[];
  @Input() isLoading: boolean;
  @Input() page: number;
  @Input() perPage: number;
  @Input() total: number;
  @Input() showReset: boolean;

  @Output() paged = new EventEmitter<number>()
  @Output() filtered = new EventEmitter<number>()
  @Output() sorted = new EventEmitter<string>()
  @Output() reseted = new EventEmitter<boolean>()
  currentFilerSelection: number = -1;

  ColumnMode = ColumnMode.force;
  constructor(private dialogService: NbDialogService) { }

  ngOnInit() {
  }
  setPage(pageInfo) {
    this.paged.emit(pageInfo.offset + 1);
  }
  selectionChange(selection: any) {
    if (selection !== -1) {
      this.showReset = true;
    }
    else {
      this.showReset = false;
    }
    this.filtered.emit(selection);
  }

  setSort(sortInfo) {
    const sort = sortInfo.sorts[0].prop + '_' + sortInfo.sorts[0].dir;
    this.sorted.emit(sort);
  }

  reset() {
    this.currentFilerSelection = -1;
    this.showReset = false;
    this.reseted.emit(true);
  }

  sendMessage(user: User) {
    this.dialogService.open(NotifyUserComponent, {
      context: {
        userId: user.id
      }
    }).onClose.subscribe(s => {
      this.reseted.emit(true);
    });
  }
  enable(user: User) {
    this.dialogService.open(EnableUserComponent, {
      context: {
        userId: user.id
      }
    }).onClose.subscribe(s => {
      this.reseted.emit(true);
    });

  }
  disable(user: User) {
    this.dialogService.open(DisableUserComponent, {
      context: {
        userId: user.id
      }
    }).onClose.subscribe(s => {
      this.reseted.emit(true);
    });
  }

  userDetails(user: User) {
    this.dialogService.open(DetailsUserComponent, {
      context: {
        user: user
      }
    }).onClose.subscribe(s => {
    });
  }
}
