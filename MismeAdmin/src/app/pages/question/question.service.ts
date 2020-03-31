import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../../core-mismes/constants/constants';
import { Injectable } from '@angular/core';
import { Question } from '../../core-mismes/models/question';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {
    constructor(private http: HttpClient) { }

    updateQuestionTitle(questionId: number, title: string) {
        let params: HttpParams = new HttpParams()
            .append('title', title);
        return this.http.patch<Question>(Constants.QUESTION_BASE + '/' + questionId + '/change-title', {}, { params: params });
    }

    addOrUpdateQuestionWithAnswers(obj: any) {
        return this.http.post<Question>(Constants.QUESTION_BASE + '/add-or-update', obj);
    }

    deleteQuestion(questionId: number) {
        return this.http.delete(Constants.QUESTION_BASE + '/' + questionId);
    }

    getPollQuestions(pollId: number) {
        let params: HttpParams = new HttpParams()
            .append('pollId', pollId.toString());
        return this.http.get(Constants.QUESTION_BASE, { params });
    }
}
