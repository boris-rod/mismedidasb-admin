import { HttpClient, HttpParams } from '@angular/common/http';
import { Poll } from '../../core-mismes/models/poll';
import { Constants } from '../../core-mismes/constants/constants';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PollsService {
    constructor(private http: HttpClient) { }

    getPolls(conceptId: number) {
        let params: HttpParams = new HttpParams()
            .append('conceptId', conceptId.toString());
        return this.http.get<Poll>(Constants.POLL_BASE, {
            params: params,
            observe: 'response'
        });
    }

    updatePollTitle(pollId: number, title: string) {
        let params: HttpParams = new HttpParams()
            .append('title', title);
        return this.http.patch<Poll>(Constants.POLL_BASE + '/' + pollId, {}, { params: params });
    }

    addPoll(poll: any) {
        return this.http.post<Poll>(Constants.POLL_BASE, poll);
    }
    updatePoll(poll: any) {
        return this.http.put<Poll>(Constants.POLL_BASE, poll);
    }
    deletePoll(pollId: number) {
        return this.http.delete(Constants.POLL_BASE + '/' + pollId);
    }

    updatePollQuestionOrder(pollId: number, obj: any) {
        return this.http.post<any>(Constants.POLL_BASE + '/' + pollId + '/questions-order', obj);
    }

    updatePollReadOnly(pollId: number, obj: any) {
        return this.http.post<any>(Constants.POLL_BASE + '/' + pollId + '/read-only', obj);
    }

    addTip(tip: any) {
        return this.http.post<any>(Constants.POLL_BASE + '/tips', tip);
    }

    deleteTip(tipId: number) {
        return this.http.delete(Constants.POLL_BASE + '/tips/delete/' + tipId);
    }

    updateTipContent(tipId: number, content: string) {
        let params: HttpParams = new HttpParams()
            .append('content', content);
        return this.http.patch<Poll>(Constants.POLL_BASE + '/tips/' + tipId, {}, { params: params });
    }

    activateTip(tipId: number, pollId: number, position: number) {
        let params: HttpParams = new HttpParams()
            .append('pollId', pollId.toString())
            .append('position', position.toString());
        return this.http.post<any>(Constants.POLL_BASE + '/tips/activate/' + tipId, {}, { params: params });
    }

    getAdminPolls() {
        return this.http.get<Poll[]>(Constants.POLL_BASE + '/admin', {
            observe: 'response'
        });
    }

    updatePollTranslations(pollId: number, obj: any) {
        return this.http.post<any>(Constants.POLL_BASE + '/' + pollId + '/define-translation', obj);
    }
}
