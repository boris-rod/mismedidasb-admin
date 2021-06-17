import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ReminderService } from '../reminder.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-reminder-for-translation',
  templateUrl: './reminder-for-translation.component.html',
  styleUrls: ['./reminder-for-translation.component.css']
})
export class ReminderForTranslationComponent implements OnInit {

  isLoading = false;
  @Input() reminderId: number;
  @Input() lang: string;
  @Input() title: string;
  @Input() body: string;

  @Output() valuesChanged = new EventEmitter<any>();

  titleString = '';
  contentString = '';

  constructor(private reminderService: ReminderService,
    private toastrService: NzMessageService) { }

  ngOnInit(): void {

    this.titleString = this.title ? this.title : '';

    this.contentString = this.body ? this.body : '';
  }

  saveTranslation(): void {
    this.isLoading = true;
    const obj = {
      lang: this.lang,
      title: this.titleString,
      body: this.contentString
    };
    this.reminderService.updateReminderTranslations(this.reminderId, obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(re => {
        this.toastrService.success('Traducción actualizada satisfactoriamente.');
        // if (this.lang === 'es') {
        this.valuesChanged.emit({
          title: this.titleString, body: this.contentString,
          id: this.reminderId, lang: this.lang
        });
        // }
      });

  }

}
