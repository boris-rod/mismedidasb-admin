import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../../core-mismes/models/user';
import { Constants } from '../../core-mismes/constants/constants';
import { UserStatSerie } from '../../core-mismes/models/user-stats-series';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    getUsers(page: number, perPage: number, sortOrder: string, search: string, statusFilter: number) {
        const params: HttpParams = new HttpParams()
            .append('page', page.toString())
            .append('perPage', perPage.toString())
            .append('sortOrder', sortOrder)
            .append('search', search)
            .append('statusFilter', statusFilter.toString());

        return this.http.get<User>(Constants.GET_USERS, {
            params: params,
            observe: 'response'
        });
    }
    getUserStats() {
        return this.http.get<User>(Constants.GET_USERS_STATS, {
            observe: 'response'
        });
    }
    getUserStatsByDates(filter: number) {
        const params: HttpParams = new HttpParams()
            .append('dateType', filter.toString());

        return this.http.get<UserStatSerie[]>(Constants.GET_USERS_STATS_BY_DATE, {
            params: params,
            observe: 'response'
        });
    }

    getUserEatsByDates(filter: number) {
        const params: HttpParams = new HttpParams()
            .append('dateType', filter.toString());

        return this.http.get<UserStatSerie[]>(Constants.GET_EATS_STATS_BY_DATE, {
            params: params,
            observe: 'response'
        });
    }

    getUserEatsCount() {
        return this.http.get<number>(Constants.GET_EATS_COUNT, {
            observe: 'response'
        });
    }

    disableUser(id: number) {
        return this.http.post<any>(Constants.GET_USERS + '/' + id + '/disable', {}, {});
    }

    enableUser(id: number) {
        return this.http.post<any>(Constants.GET_USERS + '/' + id + '/enable', {}, {});
    }

    notify(id: number, obj: any) {
        return this.http.post<any>(Constants.GET_USERS + '/' + id + '/notification', obj, {});
    }
}
