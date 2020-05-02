import { Component, OnInit } from '@angular/core';
import { ContactUs } from '../../../core-mismes/models/contact-us';
import { NbDialogRef } from '@nebular/theme';
import { ContactUsService } from '../contact-us.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss']
})
export class ViewMessageComponent implements OnInit {

  message: ContactUs;
  constructor(protected ref: NbDialogRef<ViewMessageComponent>,
    private contactUsService: ContactUsService) { }

  ngOnInit() {
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
}
