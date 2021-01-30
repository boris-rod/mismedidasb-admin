import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserAudienceComponent } from './user-audience/user-audience.component';
import { GroupAudienceComponent } from './group-audience/group-audience.component';
import { User } from 'src/app/core-mismes/models/user';
import { MessagesService } from '../messages.service';
import { finalize } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-send-messages-audience',
  templateUrl: './send-messages-audience.component.html',
  styleUrls: ['./send-messages-audience.component.css']
})
export class SendMessagesAudienceComponent implements OnInit {
  // 0 all, -1 specific users, 1 specific groups
  audience = '0';
  message = '';
  subject = '';
  isLoading = false;
  selectedUsers: User[] = [];
  selectedGroups: any[] = [];

  constructor(private modalService: NzModalService,
    private messageService: MessagesService,
    private notifService: NzMessageService) { }

  ngOnInit(): void {
  }

  send(): void {
    this.isLoading = true;
    const selectedUserIds = [];
    if (this.audience === '0') {
      selectedUserIds.push(-1);
    } else if (this.audience === '-1') {
      this.selectedUsers.forEach(u => {
        selectedUserIds.push(u.id);
      });
    }

    const obj = {
      userIds: selectedUserIds,
      subject: this.subject,
      body: this.message
    };

    this.messageService.sendEmailToUsers(obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(resp => {
        this.notifService.create('success', 'Mensaje enviado satisfactoriamente.');
      });
  }
  addAudience(): void {
    if (this.audience === '-1') {
      const modal = this.modalService.create({
        nzTitle: 'Seleccione los Usuarios',
        nzContent: UserAudienceComponent,
        nzFooter: null,
        // nzComponentParams: { userId: user.id }
        nzWidth: 900,
        // nzBodyStyle: { height: '450px', 'overflow-y': 'auto' }
      });
      modal.afterClose.subscribe(resp => {
        this.selectedUsers = resp;
      });
    }
    else if (this.audience === '1') {
      const modal = this.modalService.create({
        nzTitle: 'Seleccione los Grupos',
        nzContent: GroupAudienceComponent,
        nzFooter: null,
        // nzComponentParams: { userId: user.id }
        nzWidth: 900,
        // nzBodyStyle: { height: '450px', 'overflow-y': 'auto' }
      });
    }

  }

  onChangeAudienceSelection(e: any): void {
    this.selectedUsers = [];
    this.selectedGroups = [];
  }

}
