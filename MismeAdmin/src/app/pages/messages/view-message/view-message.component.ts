import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ContactUs } from 'src/app/core-mismes/models/contact-us';
import { MessagesService } from '../messages.service';

import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.css']
})
export class ViewMessageComponent implements OnInit {

  body = new FormControl();

  message: ContactUs;
  answering = false;

  isLoading = false;

  constructor(private messageService: MessagesService,
    private notifService: NzMessageService,
    private modal: NzModalRef) {
  }

  ngOnInit(): void {
    this.body.setValidators(Validators.required);
    this.body.setValue(`
    -------------------------------------------
    Fecha: ` + moment(this.message.createdAt).format('DD/MM/YYYY hh:mm a').toString() + `
    Asunto: ` + this.message.subject + `
    ` + this.message.body);

    this.markAsRead();
  }

  close(refresh = true): void {
    this.modal.destroy(refresh);
  }

  markAsRead(): void {
    this.messageService.markReadUnread(this.message.id, true)
      .pipe(finalize(() => { }))
      .subscribe(resp => {
      }, error => { });
  }

  answer(): void {
    this.answering = true;
  }
  send(): void {
    const obj = {
      contactUsId: this.message.id,
      userEmail: this.message.userEmail,
      body: this.body.value
    };
    this.messageService.answerMessage(obj)
      .pipe(finalize(() => {
      }))
      .subscribe(resp => {
        this.answering = false;
        this.notifService.success('Mensaje respondido satisfactoriamente.');
        this.close(true);
      }, error => {
      });

  }

}
