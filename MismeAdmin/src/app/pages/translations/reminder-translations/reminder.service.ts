import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../../../core-mismes/constants/constants';
import { Reminder } from '../../../core-mismes/models/reminder';

@Injectable({
    providedIn: 'root'
})
export class ReminderService {
    constructor(private http: HttpClient) { }

    getReminders() {
        return this.http.get<Reminder[]>(Constants.REMINDER_BASE, {
            observe: 'response'
        });
    }

    updateReminderTranslations(reminderId: number, obj: any) {
        return this.http.post<any>(Constants.REMINDER_BASE + '/' + reminderId + '/define-translation', obj);
    }
}
