import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs/operators';
import { Group } from 'src/app/core-mismes/models/group';
import { GroupsService } from 'src/app/pages/groups/groups.service';

@Component({
  selector: 'app-group-audience',
  templateUrl: './group-audience.component.html',
  styleUrls: ['./group-audience.component.css']
})
export class GroupAudienceComponent implements OnInit {
  isLoading = false;
  list: Group[] = [];
  selectedGroups: Group[] = [];

  constructor(private groupService: GroupsService, private modal: NzModalRef) { }

  ngOnInit(): void {
    this.loadGroups();
  }

  change(ret: {}): void {
    // tslint:disable-next-line:no-string-literal
    if (ret['from'] === 'left') {
      // tslint:disable-next-line:no-string-literal
      ret['list'].forEach(user => {
        const index = this.selectedGroups.findIndex(u => u.id === user.id);
        if (index === -1) {
          this.selectedGroups.push(user);
        }
      });
    } else {
      // tslint:disable-next-line:no-string-literal
      ret['list'].forEach(group => {
        const index = this.selectedGroups.findIndex(u => u.id === group.id);
        if (index !== -1) {
          this.selectedGroups.splice(index, 1);
        }
      });
    }
  }

  loadGroups(): void {
    this.isLoading = true;
    this.groupService.getGroups(1, 1000000, '', '', null)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.list = resp.body.result;
      });
  }

  filter(inputValue: string, item: Group): boolean {
    return item.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
      item.adminEmail.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  }

  close(selectedGroups = []): void {
    this.modal.destroy(selectedGroups);
  }

  selectAndExit(): void {
    this.close(this.selectedGroups);
  }

}
