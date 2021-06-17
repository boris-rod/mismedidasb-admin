import { Component, OnInit } from '@angular/core';
import { Reminder } from 'src/app/core-mismes/models/reminder';
import { ReminderService } from './reminder.service';

@Component({
  selector: 'app-reminders-translations',
  templateUrl: './reminders-translations.component.html',
  styleUrls: ['./reminders-translations.component.css']
})
export class RemindersTranslationsComponent implements OnInit {

  reminders: Reminder[];
  backupReminders: Reminder[];

  checked = false;

  constructor(private reminderService: ReminderService) { }

  ngOnInit(): void {
    this.reminderService.getReminders().subscribe(resp => {
      this.reminders = resp.body.result;
    });
  }

  onContentChanged(event: any): void {
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

  onCheckedChange(event: any): void {
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
