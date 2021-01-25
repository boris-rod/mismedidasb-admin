import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../../core-mismes/constants/constants';
import { ContactUs } from '../../core-mismes/models/contact-us';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(private http: HttpClient) { }

  getMessages(page: number, perPage: number, sortOrder: string, search: string, readFilter: number, priorityFilter: number)
    : Observable<any> {
    const params: HttpParams = new HttpParams()
      .append('page', page.toString())
      .append('perPage', perPage.toString())
      .append('sortOrder', sortOrder)
      .append('search', search)
      .append('priorityFilter', priorityFilter.toString())
      .append('readFilter', readFilter.toString());

    return this.http.get<ContactUs>(Constants.CONTACT_US_BASE, {
      params,
      observe: 'response'
    });
  }

  markReadUnread(id: number, read: boolean): Observable<any> {
    const params: HttpParams = new HttpParams()
      .append('read', read.toString());

    return this.http.post<any>(Constants.CONTACT_US_BASE + '/' + id + '/read-status', {}, {
      params,
      observe: 'response'
    });
  }

  markImportantNormal(id: number, important: boolean): Observable<any> {
    const params: HttpParams = new HttpParams()
      .append('important', important.toString());
    return this.http.post<any>(Constants.CONTACT_US_BASE + '/' + id + '/important-status', {}, {
      params,
      observe: 'response'
    });
  }
  answerMessage(body: any): Observable<any> {
    return this.http.post<any>(Constants.CONTACT_US_BASE + '/answer', body, {});
  }

}
