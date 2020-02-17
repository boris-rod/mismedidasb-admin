import { HttpClient, HttpParams } from '@angular/common/http';
import { Poll } from '../../core-mismes/models/poll';
import { Constants } from '../../core-mismes/constants/constants';
import { Injectable } from '@angular/core';
import { PersonalData } from '../../core-mismes/models/personal-data';

@Injectable({
    providedIn: 'root'
})
export class PersonalDataService {
    constructor(private http: HttpClient) { }

    getPDatas() {
        return this.http.get<PersonalData>(Constants.GET_PERSONAL_DATAS, {
            observe: 'response'
        });
    }
}
