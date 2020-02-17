import { Component, OnInit } from '@angular/core';
import { UserService } from './users.service';
import { User } from '../../core-mismes/models/user';
import { Logger } from '../../core-mismes';
import { finalize } from 'rxjs/operators';
import { NbSearchService } from '@nebular/theme';

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
  resetIsNeeded: boolean = false;


  constructor(private userService: UserService, private searchService: NbSearchService) { }

  ngOnInit() {
    this.loadUsers();
    this.searchService.onSearchSubmit().subscribe(s => {
      this.searchTerm = s.term;
      this.resetIsNeeded = true;
      this.loadUsers();
    });
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
  onReseted(reset: boolean) {
    if (reset) {
      this.sort = '';
      this.searchTerm = '';
      this.statusFilter = -1;
      this.page = 1;
      this.resetIsNeeded = false;
      this.loadUsers();
    }
  }
}
