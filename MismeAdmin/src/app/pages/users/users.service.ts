import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../../core-mismes/models/user';
import { Constants } from '../../core-mismes/constants/constants';

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
}
