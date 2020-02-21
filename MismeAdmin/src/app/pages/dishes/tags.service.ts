import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../../core-mismes/constants/constants';
import { Tag } from '../../core-mismes/models/tag';

@Injectable({
    providedIn: 'root'
})
export class TagService {
    constructor(private http: HttpClient) { }

    getTags() {
        // const params: HttpParams = new HttpParams()
        //     .append('search', search);

        return this.http.get<Tag>(Constants.GET_TAGS, {
            observe: 'response'
        });
    }
}
