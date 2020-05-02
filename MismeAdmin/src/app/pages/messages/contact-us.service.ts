import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../../core-mismes/constants/constants';
import { ContactUs } from '../../core-mismes/models/contact-us';

@Injectable({
    providedIn: 'root'
})
export class ContactUsService {
    constructor(private http: HttpClient) { }

    getMessages(page: number, perPage: number, sortOrder: string, search: string, readFilter: number, priorityFilter: number) {
        const params: HttpParams = new HttpParams()
            .append('page', page.toString())
            .append('perPage', perPage.toString())
            .append('sortOrder', sortOrder)
            .append('search', search)
            .append('priorityFilter', priorityFilter.toString())
            .append('readFilter', readFilter.toString());

        return this.http.get<ContactUs>(Constants.CONTACT_US_BASE, {
            params: params,
            observe: 'response'
        });
    }

    markReadUnread(id: number, read: boolean) {
        const params: HttpParams = new HttpParams()
            .append('read', read.toString());

        return this.http.post<any>(Constants.CONTACT_US_BASE + '/' + id + '/read-status', {}, {
            params: params,
            observe: 'response'
        });
    }

    markImportantNormal(id: number, important: boolean) {
        const params: HttpParams = new HttpParams()
            .append('important', important.toString());
        return this.http.post<any>(Constants.CONTACT_US_BASE + '/' + id + '/important-status', {}, {
            params: params,
            observe: 'response'
        });
    }

}
