import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize } from 'rxjs/operators';
import { CredentialsService } from 'src/app/core-mismes';
import { Group } from 'src/app/core-mismes/models/group';
import { Invitation } from 'src/app/core-mismes/models/invitation';
import { GroupsService } from '../../groups/groups.service';

@Component({
  selector: 'app-group-invites-admin-group',
  templateUrl: './group-invites-admin-group.component.html',
  styleUrls: ['./group-invites-admin-group.component.css']
})
export class GroupInvitesAdminGroupComponent implements OnInit {
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
    private credsService: CredentialsService
  ) {
    this.groupToEdit = this.credsService.credentials.account.group;
  }

  ngOnInit(): void {

  }

  loadGroupInvitations(): void {
    this.isLoading = true;
    this.groupService.getGroupInvitations(this.groupToEdit.id, this.page, this.perPage, this.sort, this.searchTerm,
      this.status)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        const pData = resp.headers.get('PagingData');
        this.total = JSON.parse(pData).totalItems;
        this.invitations = resp.body.result;
        const ind = this.invitations.findIndex(p => p.userEmail === this.groupToEdit.adminEmail);
        if (ind !== -1) {
          this.invitations.splice(ind, 1);
        }
      }, error => {
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

  onChangeSelection(e: any): void {
    if (e !== -1) {
      this.showReset = true;
      this.status = [];
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
