import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs/operators';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  isLoading = false;
  body = '';
  subject = '';

  userId = 0;
  constructor(private modal: NzModalRef, private messageService: NzMessageService, private usersService: UsersService) { }

  ngOnInit(): void {
  }
  send(): void {
    this.isLoading = true;
    const obj = {
      title: this.subject,
      body: this.body
    };
    this.usersService.notify(this.userId, obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.messageService.create('success', 'Usario notificado satisfactoriamente.');
        this.modal.destroy();
      });

  }
  close(): void {
    this.modal.destroy();
  }
}
