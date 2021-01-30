import { Component, OnInit } from '@angular/core';
import { TransferChange, TransferItem, TransferSelectChange } from 'ng-zorro-antd/transfer';

import { User } from 'src/app/core-mismes/models/user';
import { UsersService } from '../../../users/users.service';
import { Result } from '../../../../core-mismes/models/result';
import { finalize } from 'rxjs/operators';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-audience',
  templateUrl: './user-audience.component.html',
  styleUrls: ['./user-audience.component.css']
})
export class UserAudienceComponent implements OnInit {
  isLoading = false;
  list: User[] = [];

  selectedUsers: User[] = [];
  constructor(private userService: UsersService, private modal: NzModalRef) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  change(ret: {}): void {
    // tslint:disable-next-line:no-string-literal
    if (ret['from'] === 'left') {
      // tslint:disable-next-line:no-string-literal
      ret['list'].forEach(user => {
        const index = this.selectedUsers.findIndex(u => u.id === user.id);
        if (index === -1) {
          this.selectedUsers.push(user);
        }
      });
    } else {
      // tslint:disable-next-line:no-string-literal
      ret['list'].forEach(user => {
        const index = this.selectedUsers.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.selectedUsers.splice(index, 1);
        }
      });
    }
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers(-1, -1, '', '', -1)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.list = resp.body.result;
      });
  }

  filter(inputValue: string, item: User): boolean {
    return item.email.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
      item.fullName.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  }

  close(selectedUsers = []): void {
    this.modal.destroy(selectedUsers);
  }

  selectAndExit(): void {
    this.close(this.selectedUsers);
  }
}
