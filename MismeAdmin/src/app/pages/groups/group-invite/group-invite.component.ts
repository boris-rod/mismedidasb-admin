import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { GroupsService } from '../groups.service';
import { Invitation } from '../../../core-mismes/models/invitation';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-group-invite',
  templateUrl: './group-invite.component.html',
  styleUrls: ['./group-invite.component.css']
})
export class GroupInviteComponent implements OnInit {
  isLoading = false;

  email = new FormControl();

  invitations: Invitation[] = [];
  newInvitations: string[] = [];

  groupId = 0;

  constructor(private groupService: GroupsService,
    private messageService: NzMessageService,
    private modal: NzModalRef) {
    this.email.setValidators([Validators.required, Validators.email]);

  }

  ngOnInit(): void {
    this.email.setValue('');
  }
  close(refresh = false): void {
    this.modal.destroy(refresh);
  }

  invite(): void {
    this.isLoading = true;
    const emails = [];
    this.newInvitations.forEach(element => {
      emails.push({ email: element });
    });
    const obj = {
      emails
    };

    this.groupService.sentGroupInvites(this.groupId, obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.messageService.success('Invitaciones enviadas satisfactoriamente.');
        this.close(true);
      }, error => {
        this.messageService.error(error.error.message);
      });
  }

  add(): void {
    const ind = this.newInvitations.findIndex(i => i === this.email.value);
    const ind1 = this.invitations.findIndex(i => i.userEmail === this.email.value);
    if (ind === -1 && ind1 === -1) {
      this.newInvitations.push(this.email.value);
      this.email.setValue('');
    } else {
      this.messageService.info('El usuario ya fue invitado.');
    }
  }

  removeNewInvite(invite: string): void {
    const ind = this.newInvitations.findIndex(i => i === invite);
    if (ind !== -1) {
      this.newInvitations.splice(ind, 1);
    }
  }

}
