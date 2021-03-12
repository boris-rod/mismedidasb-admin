import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs/operators';
import { Group } from 'src/app/core-mismes/models/group';
import { User } from 'src/app/core-mismes/models/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-send-coins',
  templateUrl: './user-send-coins.component.html',
  styleUrls: ['./user-send-coins.component.css']
})
export class UserSendCoinsComponent implements OnInit {
  user: User;
  group: Group;

  coinsQty = 1;
  title = new FormControl();
  body = new FormControl();

  allUsers = false;
  isLoading = false;
  constructor(private userService: UsersService, private messageService: NzMessageService,
    private modal: NzModalRef) {
    this.title.setValidators(Validators.required);
    this.title.setValue('');

    this.body.setValue('');
  }

  ngOnInit(): void {
  }

  close(): void {
    this.modal.destroy();
  }
  send(): void {
    this.isLoading = true;

    const userIds = [];
    const groupIds = [];
    if (this.allUsers === true) {
      userIds.push(-1);
    } else {
      if (this.group) {
        groupIds.push(this.group.id);
      } else if (this.user) {
        userIds.push(this.user.id);
      }

    }

    const obj = {
      coins: this.coinsQty,
      userIds,
      groupIds,
      title: this.title.value,
      body: this.body.value
    };

    this.userService.sendCoins(obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.messageService.success('Monedas enviadas satisfactoriamente.');
        this.close();
      }, error => {
        this.messageService.error('Ha ocurrido un error enviando las monedas.');
      });
  }

}
