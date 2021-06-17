import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../../../core-mismes/constants/constants';
import { Result } from '../../../core-mismes/models/result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  constructor(private http: HttpClient) { }

  getResults(): Observable<any> {
    return this.http.get<Result[]>(Constants.RESULT_BASE, {
      observe: 'response'
    });
  }

  updateResultTranslations(resultId: number, obj: any): Observable<any> {
    return this.http.post<any>(Constants.RESULT_BASE + '/' + resultId + '/define-translation', obj);
  }
}
