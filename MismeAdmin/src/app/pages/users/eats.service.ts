import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../../core-mismes/models/user';
import { Constants } from '../../core-mismes/constants/constants';
import { UserStatSerie } from '../../core-mismes/models/user-stats-series';
import { Observable } from 'rxjs';
import { startsWith } from '@rxweb/reactive-form-validators';

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

  getMonthSummary(userId: number, startDate: string, endDate: string): Observable<any> {
    const params: HttpParams = new HttpParams()
      .append('date', startDate)
      .append('endDate', endDate);

    return this.http.get<any>(Constants.EATS_BASE + '/users/' + userId + '/plan-summaries',
      {
        params
      });
  }

  getUserPlanByDate(userId: number, date: string, page: number, perPage: number, eatType = null): Observable<any> {
    const params: HttpParams = new HttpParams()
      .append('userId', userId.toString())
      .append('date', date)
      .append('perPage', perPage.toString())
      .append('page', page.toString());

    return this.http.get<any>(Constants.EATS_BASE + '/user-eats',
      {
        params
      });
  }

  getPlanIsBalanced(userId: number, obj: any): Observable<any> {
    return this.http.put<any>(Constants.EATS_BASE + '/users/' + userId + '/is-balanced-plan', obj);
  }

  setUserPlan(plan: any, userId: number): Observable<any> {
    return this.http.post<any>(Constants.EATS_BASE + '/users/' + userId + '/bulk-eats', plan);
  }
}
