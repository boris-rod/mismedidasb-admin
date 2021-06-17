import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../../../core-mismes/constants/constants';
import { Answer } from '../../../core-mismes/models/answer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  constructor(private http: HttpClient) { }
  getAnswers(): Observable<any> {
    return this.http.get<Answer[]>(Constants.ANSWER_BASE + '/admin', {
      observe: 'response'
    });
  }

  updateAnswerTranslations(answerId: number, obj: any): Observable<any> {
    return this.http.post<any>(Constants.ANSWER_BASE + '/' + answerId + '/define-translation', obj);
  }
}
