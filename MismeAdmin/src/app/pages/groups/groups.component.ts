import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Group } from '../../core-mismes/models/group';
import { GroupsService } from './groups.service';
import { Logger } from '../../core-mismes/logger.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditGroupComponent } from './edit-group/edit-group.component';

const log = new Logger('Groups');
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  isLoading = false;
  results: Group[] = [];
  total = 0;
  perPage = 10;
  page = 1;
  sort = '';
  searchTerm = '';
  isActive = -1;
  showReset = false;

  constructor(private groupService: GroupsService,
    private messageService: NzMessageService,
    private modalService: NzModalService) { }

  ngOnInit(): void {
  }

  loadGroups(): void {
    this.isLoading = true;
    let act = null;
    if (this.isActive === 0) {
      act = false;
    } else if (this.isActive === 1) {
      act = true;
    }
    console.log(act);

    this.groupService.getGroups(this.page, this.perPage, this.sort, this.searchTerm, act)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        const pData = resp.headers.get('PagingData');
        this.total = JSON.parse(pData).totalItems;
        this.results = resp.body.result;
        log.info(this.results);
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
    this.loadGroups();
  }

  newGroup(): void {
    const modal = this.modalService.create({
      nzTitle: 'Nuevo Grupo',
      nzContent: EditGroupComponent,
      nzFooter: null,
      // nzWidth: 900,
      // nzBodyStyle: { 'max-height': '450px', 'overflow-y': 'auto' },
      // nzComponentParams: {
      //   dishToEdit: dish
      // }
    });
    modal.afterClose.subscribe(
      resp => {
        if (resp === true) {
          this.loadGroups();
        }
      }
    );
  }

  edit(g: Group): void {
    const modal = this.modalService.create({
      nzTitle: 'Editar Grupo',
      nzContent: EditGroupComponent,
      nzFooter: null,
      // nzWidth: 900,
      // nzBodyStyle: { 'max-height': '450px', 'overflow-y': 'auto' },
      nzComponentParams: {
        groupToEdit: g
      }
    });
    modal.afterClose.subscribe(
      resp => {
        if (resp === true) {
          this.loadGroups();
        }
      }
    );
  }

  search(): void {
    if (this.searchTerm.trim() !== '') {
      this.showReset = true;
      this.loadGroups();
    }
  }

  reset(): void {
    this.showReset = false;
    this.searchTerm = '';
    this.isActive = -1;
    this.loadGroups();
  }

  onChangeSelection(event: any): void {
    if (event !== -1) {
      this.showReset = true;
    } else {
      if (this.searchTerm === '') {
        this.showReset = false;
      }
    }
    this.loadGroups();
  }

  activate(g: Group): void {
    this.isLoading = true;
    this.groupService.activateGroup(g.id)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.messageService.create('success', 'Grupo activado satisfactoriamente.');
        this.loadGroups();
      });
  }
  deactivate(g: Group): void {
    this.isLoading = true;
    this.groupService.deactivateGroup(g.id)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.messageService.create('success', 'Grupo desactivado satisfactoriamente.');
        this.loadGroups();
      });
  }
}

