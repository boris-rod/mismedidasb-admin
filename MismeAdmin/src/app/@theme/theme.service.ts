import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../core-mismes/constants/constants';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    constructor(private http: HttpClient) { }

    changePass(changePass: any) {
        return this.http.post<any>(Constants.CHANGE_PASS, changePass, {
            observe: 'response'
        });
    }
    getProfile() {
        return this.http.get(Constants.GET_PROFILE, {
            observe: 'response'
        });
    }
}
