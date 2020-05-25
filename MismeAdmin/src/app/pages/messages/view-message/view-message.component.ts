import { Component, OnInit } from '@angular/core';
import { ContactUs } from '../../../core-mismes/models/contact-us';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ContactUsService } from '../contact-us.service';
import { finalize } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

import * as moment from 'moment';
@Component({
  selector: 'view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss']
})
export class ViewMessageComponent implements OnInit {
  body = new FormControl();

  message: ContactUs;
  answering: boolean = false;

  constructor(protected ref: NbDialogRef<ViewMessageComponent>,
    private contactUsService: ContactUsService, private toastrService: NbToastrService) {
  }

  ngOnInit() {
    this.body.setValidators(Validators.required);
    this.body.setValue(`
    -------------------------------------------
    Fecha: `+ moment(this.message.createdAt).format('DD/MM/YYYY hh:mm a').toString() + ` 
    Asunto: `+ this.message.subject + `
    `+ this.message.body);

    this.markAsRead();
  }

  close() {
    this.ref.close();
  }

  markAsRead() {
    this.contactUsService.markReadUnread(this.message.id, true)
      .pipe(finalize(() => {
      }))
      .subscribe(resp => {
      }, error => {
      });
  }

  answer() {
    this.answering = true;
  }
  send() {
    const obj = {
      contactUsId: this.message.id,
      userEmail: this.message.userEmail,
      body: this.body.value
    };
    this.contactUsService.answerMessage(obj)
      .pipe(finalize(() => {
      }))
      .subscribe(resp => {
        this.answering = false;
        this.toastrService.success('Mensaje respondido satisfactoriamente.', 'Responder');
        this.ref.close(true)
      }, error => {
      });

  }
}
