import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/core-mismes/models/group';
import { Invitation } from 'src/app/core-mismes/models/invitation';
import { GroupsService } from '../groups.service';
import { Logger } from '../../../core-mismes/logger.service';
import { finalize } from 'rxjs/operators';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GroupInviteComponent } from '../group-invite/group-invite.component';
const log = new Logger('Group invitations');

@Component({
  selector: 'app-group-members',
  templateUrl: './group-members.component.html',
  styleUrls: ['./group-members.component.css']
})
export class GroupMembersComponent implements OnInit {
  isLoading = false;
  page = 1;
  perPage = 10;
  searchTerm = '';
  sort = '';
  status: number[] = [];
  showReset = false;

  activeFilter = -1;

  total = 0;
  groupToEdit: Group;
  invitations: Invitation[];

  constructor(private groupService: GroupsService,
    private messageService: NzMessageService,
    private modalService: NzModalService) { }

  ngOnInit(): void {

  }

  loadGroupInvitations(): void {
    this.isLoading = true;
    this.groupService.getGroupInvitations(this.groupToEdit.id, this.page, this.perPage, this.sort, this.searchTerm, this.status)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        const pData = resp.headers.get('PagingData');
        this.total = JSON.parse(pData).totalItems;
        this.invitations = resp.body.result;
        log.info(this.invitations);
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
    this.loadGroupInvitations();
  }

  newInvite(): void {
    const modal = this.modalService.create({
      nzTitle: 'Invitar',
      nzContent: GroupInviteComponent,
      nzFooter: null,
      // nzWidth: 900,
      // nzBodyStyle: { 'max-height': '450px', 'overflow-y': 'auto' },
      nzComponentParams: {
        invitations: this.invitations,
        groupId: this.groupToEdit.id
      }
    });
    modal.afterClose.subscribe(
      resp => {
        if (resp === true) {
          this.loadGroupInvitations();
        }
      }
    );
  }
  onChangeSelection(e: any): void {
    if (e !== -1) {
      this.showReset = true;
      this.status.push(e);
    } else {
      this.status = [];
      if (this.searchTerm === '') {
        this.showReset = false;
      }
    }
    this.loadGroupInvitations();
  }
  search(): void {
    if (this.searchTerm.trim() !== '') {
      this.showReset = true;
      this.loadGroupInvitations();
    }
  }
  reset(): void {
    this.status = [];
    this.activeFilter = -1;
    this.searchTerm = '';
    this.showReset = false;
    this.loadGroupInvitations();
  }

  deleteInvite(d: Invitation): void {
    this.groupService.deleteInvite(this.groupToEdit.id, d.id)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.messageService.success('Invitación eliminada satisfactoriamente.');
        this.loadGroupInvitations();
      }, error => {
        this.messageService.error(error.error.message);
      });
  }
}
