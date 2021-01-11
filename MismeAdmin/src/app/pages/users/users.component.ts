import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table/public-api';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/core-mismes/models/user';
import { Logger } from '../../core-mismes/logger.service';
import { UsersService } from './users.service';
import { MessageComponent } from './message/message.component';
import { DetailsComponent } from './details/details.component';
import { NzMessageService } from 'ng-zorro-antd/message';

const log = new Logger('Users');
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  page = 1;
  perPage = 5;
  isLoading = true;
  total = 0;
  sort = '';
  searchTerm = '';
  statusFilter = -1;

  results: User[];
  showReset = false;

  constructor(private userService: UsersService, private modalService: NzModalService,
    private messageService: NzMessageService) { }

  ngOnInit(): void {
    // this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;

    this.userService.getUsers(this.page, this.perPage, this.sort, this.searchTerm, this.statusFilter)
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
    this.loadUsers();
  }

  search(): void {
    this.showReset = true;
    this.loadUsers();
  }

  reset(): void {
    this.showReset = false;
    this.searchTerm = '';
    this.loadUsers();
  }

  message(user: User): void {
    this.modalService.create({
      nzTitle: 'Enviar Mensaje',
      nzContent: MessageComponent,
      nzFooter: null,
      nzComponentParams: { userId: user.id }
      // nzWidth: 1000,
      // nzBodyStyle: { height: '450px', 'overflow-y': 'auto' }
    });
  }

  details(user: User): void {
    this.modalService.create({
      nzTitle: 'Detalles',
      nzContent: DetailsComponent,
      nzFooter: null,
      nzWidth: 1000,
      nzBodyStyle: { height: '500px', 'overflow-y': 'auto' },
      nzComponentParams: {
        user
      }
    });
  }

  enable(user: User): void {
    this.isLoading = true;
    this.userService.enableUser(user.id)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.messageService.create('success', 'Usuario habilitado satisfactoriamente.');
        this.loadUsers();
      });
  }

  disable(user: User): void {
    this.isLoading = true;
    this.userService.disableUser(user.id)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.messageService.create('success', 'Usuario deshabilitado satisfactoriamente.');
        this.loadUsers();
      });
  }
}
