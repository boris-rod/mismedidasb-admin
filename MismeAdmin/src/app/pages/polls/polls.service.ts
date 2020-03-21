import { HttpClient, HttpParams } from '@angular/common/http';
import { Poll } from '../../core-mismes/models/poll';
import { Constants } from '../../core-mismes/constants/constants';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PollsService {
    constructor(private http: HttpClient) { }

    getPolls() {
        return this.http.get<Poll>(Constants.GET_POLLS, {
            observe: 'response'
        });
    }
    updatePollTitle(pollId: number, title: string) {
        let params: HttpParams = new HttpParams()
            .append('title', title);
        return this.http.patch<Poll>(Constants.UPDATE_POLL_TITLE + '/' + pollId, {}, { params: params });
    }
}
