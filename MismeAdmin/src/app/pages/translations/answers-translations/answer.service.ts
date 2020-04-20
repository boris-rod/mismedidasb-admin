import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../../../core-mismes/constants/constants';
import { Answer } from '../../../core-mismes/models/answer';

@Injectable({
    providedIn: 'root'
})
export class AnswerService {
    constructor(private http: HttpClient) { }
    getAnswers() {
        return this.http.get<Answer[]>(Constants.ANSWER_BASE + '/admin', {
            observe: 'response'
        });
    }

    updateAnswerTranslations(answerId: number, obj: any) {
        return this.http.post<any>(Constants.ANSWER_BASE + '/' + answerId + '/define-translation', obj);
    }
}