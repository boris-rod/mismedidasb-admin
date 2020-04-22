import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ReminderService } from '../reminder.service';
import { NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'reminder-form-translate',
  templateUrl: './reminder-form-translate.component.html',
  styleUrls: ['./reminder-form-translate.component.scss']
})
export class ReminderFormTranslateComponent implements OnInit {
  isLoading = false;
  @Input() reminderId: number;
  @Input() lang: string;
  @Input() title: string;
  @Input() body: string;

  @Output() valuesChanged = new EventEmitter<any>();

  titleControl = new FormControl();
  bodyControl = new FormControl();

  constructor(private reminderService: ReminderService,
    private toastrService: NbToastrService) { }

  ngOnInit() {

    this.titleControl.setValue(this.title ? this.title : '');
    this.titleControl.setValidators(Validators.required);

    this.bodyControl.setValue(this.body ? this.body : '');
    this.bodyControl.setValidators(Validators.required);
  }

  saveTranslation() {
    this.isLoading = true;
    const obj = {
      'lang': this.lang,
      'title': this.titleControl.value,
      'body': this.bodyControl.value
    };
    this.reminderService.updateReminderTranslations(this.reminderId, obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(re => {
        this.toastrService.success('Traducción actualizada satisfactoriamente.', 'Traducir Recordatorio');
        // if (this.lang === 'es') {
        this.valuesChanged.emit({ 'title': this.titleControl.value, 'body': this.bodyControl.value, 'id': this.reminderId, 'lang': this.lang });
        // }
      });

  }
}
