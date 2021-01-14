import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../../core-mismes/constants/constants';
import { Injectable } from '@angular/core';
import { Question } from '../../core-mismes/models/question';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  constructor(private http: HttpClient) { }

  updateQuestionTitle(questionId: number, title: string): Observable<any> {
    const params: HttpParams = new HttpParams()
      .append('title', title);
    return this.http.patch<Question>(Constants.QUESTION_BASE + '/' + questionId + '/change-title', {}, { params });
  }

  addOrUpdateQuestionWithAnswers(obj: any): Observable<any> {
    return this.http.post<Question>(Constants.QUESTION_BASE + '/add-or-update', obj);
  }

  deleteQuestion(questionId: number): Observable<any> {
    return this.http.delete(Constants.QUESTION_BASE + '/' + questionId);
  }

  getPollQuestions(pollId: number): Observable<any> {
    const params: HttpParams = new HttpParams()
      .append('pollId', pollId.toString());
    return this.http.get(Constants.QUESTION_BASE, { params });
  }
  getAdminQuestions(): Observable<any> {
    return this.http.get(Constants.QUESTION_BASE + '/admin', { observe: 'response' });
  }
  updateTipTranslations(questionId: number, obj: any): Observable<any> {
    return this.http.post<any>(Constants.QUESTION_BASE + '/' + questionId + '/define-translation', obj);
  }
}
