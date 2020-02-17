import { Component, OnInit } from '@angular/core';
import { UserService } from './users.service';
import { User } from '../../core-mismes/models/user';
import { Logger } from '../../core-mismes';
import { finalize } from 'rxjs/operators';

const log = new Logger('Users');
@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  page: number = 1;
  perPage: number = 10;
  isLoading: boolean = false;
  total = 0;
  sort = '';
  searchTerm: string = '';
  statusFilter: number = -1;


  results: User[];


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;

    this.userService.getUsers(this.page, this.perPage, this.sort, this.searchTerm, this.statusFilter)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        const pData = resp.headers.get('PagingData');
        this.total = JSON.parse(pData)['totalItems'];
        this.results = resp.body['result'];
      }, error => {
        log.error(error);
      });
  }

  onPaged(page: number) {
    this.page = page;
    this.loadUsers();
  }
  onFiltered(filter: number) {
    this.statusFilter = filter;
    this.loadUsers();
  }
  onSorted(sort: string) {
    this.sort = sort;
    this.loadUsers();
  }
}
