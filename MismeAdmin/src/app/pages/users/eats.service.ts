import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../../core-mismes/models/user';
import { Constants } from '../../core-mismes/constants/constants';
import { UserStatSerie } from '../../core-mismes/models/user-stats-series';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EatsService {
  constructor(private http: HttpClient) { }

  getUserEats(userId: number, page: number, perPage: number): Observable<any> {
    const params: HttpParams = new HttpParams()
      .append('page', page.toString())
      .append('perPage', perPage.toString())
      .append('userId', userId.toString());

    return this.http.get<any>(Constants.EATS_BASE + '/admin-user-eats', {
      params,
      observe: 'response'
    });
  }

}
