import { Component, OnInit } from '@angular/core';
import { Reminder } from '../../../core-mismes/models/reminder';
import { ReminderService } from './reminder.service';

@Component({
  selector: 'reminder-translations',
  templateUrl: './reminder-translations.component.html',
  styleUrls: ['./reminder-translations.component.scss']
})
export class ReminderTranslationsComponent implements OnInit {
  reminders: Reminder[];
  backupReminders: Reminder[];

  constructor(private reminderService: ReminderService) { }

  ngOnInit() {
    this.reminderService.getReminders().subscribe(resp => {
      this.reminders = resp.body['result'];
    });
  }

  onContentChanged(event: any) {
    const index = this.reminders.findIndex(c => c.id === event.id);
    if (index !== -1) {
      if (event.lang === 'en') {
        this.reminders[index].titleEN = event.title;
        this.reminders[index].bodyEN = event.body;
      }
      else if (event.lang === 'it') {
        this.reminders[index].titleIT = event.title;
        this.reminders[index].bodyIT = event.body;
      }
      else {
        this.reminders[index].title = event.title;
        this.reminders[index].body = event.body;
      }
      if (this.backupReminders && this.backupReminders.length > 0) {
        this.reminders = this.reminders.filter(t => !t.titleEN || t.titleEN === '' || !t.titleIT || t.titleIT === '');
      }
      this.reminders = [...this.reminders];
    }
  }

  onCheckedChange(event: any) {
    if (event === true) {
      this.backupReminders = this.reminders;
      this.reminders = this.reminders.filter(t => !t.titleEN || t.titleEN === '' || !t.titleIT || t.titleIT === '');
    }
    else {
      this.reminders = [...this.backupReminders];
      this.backupReminders = [];
    }

  }
}