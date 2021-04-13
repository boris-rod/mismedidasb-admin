import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/core-mismes/models/user';
import { UsersService } from '../users.service';
import { Logger } from '../../../core-mismes/logger.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

const log = new Logger('Group users');

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})
export class GroupUsersComponent implements OnInit {
  page = 1;
  perPage = 5;
  isLoading = true;
  total = 0;
  sort = '';
  searchTerm = '';
  statusFilter = -1;

  results: User[];
  showReset = false;

  eatFilterValue = [0, 0];
  minEatValue = 0;
  maxEatValue = 0;

  emotionFilterValue = [-10.0, -10.0];
  minEmotionValue = -10.0;
  maxEmotionValue = -10.0;

  constructor(private userService: UsersService, private modalService: NzModalService,
    private messageService: NzMessageService) { }

  ngOnInit(): void {
  }

  loadUsers(): void {
    this.isLoading = true;

    this.userService.getUsers(this.page, this.perPage, this.sort, this.searchTerm, this.statusFilter,
      this.minEatValue, this.maxEatValue, this.minEmotionValue, this.maxEmotionValue)
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
    // this.statusFilter = -1;

    // this.eatFilterValue = [0, 0];
    // this.minEatValue = 0;
    // this.maxEatValue = 0;

    // this.emotionFilterValue = [-10.0, -10.0];
    // this.minEmotionValue = -10.0;
    // this.maxEmotionValue = -10.0;

    this.loadUsers();
  }

}
