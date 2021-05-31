import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/core-mismes/constants/constants';
import { User } from 'src/app/core-mismes/models/user';
import { UserStatSerie } from 'src/app/core-mismes/models/user-stats-series';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  getUsers(page: number, perPage: number, sortOrder: string,
    search: string, statusFilter: number, minEatValue: number, maxEatValue: number,
    minEmotionValue: number, maxEmotionValue: number): Observable<any> {
    let params: HttpParams = new HttpParams()
      .append('page', page.toString())
      .append('perPage', perPage.toString())
      .append('sortOrder', sortOrder)
      .append('search', search)
      .append('statusFilter', statusFilter.toString());
    if (minEatValue > 0) {
      params = params.append('minPlannedEats', minEatValue.toString());
    }
    if (maxEatValue > 0) {
      params = params.append('maxPlannedEats', maxEatValue.toString());
    }
    if (minEmotionValue > 0) {
      params = params.append('minEmotionMedia', minEmotionValue.toString());
    }
    if (maxEmotionValue > 0) {
      params = params.append('maxEmotionMedia', maxEmotionValue.toString());
    }

    return this.http.get<User>(Constants.GET_USERS, {
      params,
      observe: 'response'
    });
  }

  getUserStats(): Observable<any> {
    return this.http.get<User>(Constants.GET_USERS_STATS, {
      observe: 'response'
    });
  }

  getUserStatsByDates(filter: number): Observable<any> {
    const params: HttpParams = new HttpParams()
      .append('dateType', filter.toString());

    return this.http.get<UserStatSerie[]>(Constants.GET_USERS_STATS_BY_DATE, {
      params,
      observe: 'response'
    });
  }

  getUserEatsByDates(filter: number): Observable<any> {
    const params: HttpParams = new HttpParams()
      .append('dateType', filter.toString());

    return this.http.get<UserStatSerie[]>(Constants.GET_EATS_STATS_BY_DATE, {
      params,
      observe: 'response'
    });
  }

  getUserEatsCount(): Observable<any> {
    return this.http.get<number>(Constants.GET_EATS_COUNT, {
      observe: 'response'
    });
  }

  disableUser(id: number): Observable<any> {
    return this.http.post<any>(Constants.GET_USERS + '/' + id + '/disable', {}, {});
  }

  enableUser(id: number): Observable<any> {
    return this.http.post<any>(Constants.GET_USERS + '/' + id + '/enable', {}, {});
  }

  notify(id: number, obj: any): Observable<any> {
    return this.http.post<any>(Constants.GET_USERS + '/' + id + '/notification', obj, {});
  }

  getUserForDetailsView(userId: number): Observable<any> {
    return this.http.get<any>(Constants.GET_ADMIN_USER + '/' + userId);
  }
  getUserForDetailsViewNoAdmin(userId: number): Observable<any> {
    return this.http.get<any>(Constants.GET_USERS + '/' + userId);
  }

  getUserQuestionsAnswersByConcept(userId: number, concept: string): Observable<any> {
    const params: HttpParams = new HttpParams()
      .append('conceptName', concept);

    return this.http.get<any>(Constants.GET_ADMIN_USER + '/' + userId + '/question-answers', {
      params
    });
  }


  getUserByAgesSummary(): Observable<any> {
    return this.http.get<any>(Constants.GET_ADMIN_USER + '/statistics-summary');
  }

  sendCoins(obj: any): Observable<any> {
    return this.http.put<any>(Constants.GET_ADMIN_USER + '/give-coins-rewards', obj, {});
  }

  unsubscribeEmail(token: string): Observable<any> {
    return this.http.patch<any>('account/email-unsuscribe/' + token, {});
  }


  getGroupUsers(groupId: number, page: number, perPage: number, sortOrder: string,
    search: string, statusFilter: number): Observable<any> {

    const params: HttpParams = new HttpParams()
      .append('page', page.toString())
      .append('perPage', perPage.toString())
      .append('sortOrder', sortOrder)
      .append('search', search)
      .append('statusFilter', statusFilter.toString());

    return this.http.get<User>(Constants.GROUPS_BASE_NO_ADMIN + '/' + groupId + '/users', {
      params,
      observe: 'response'
    });
  }

}
