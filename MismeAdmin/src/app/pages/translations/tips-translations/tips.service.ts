import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../../../core-mismes/constants/constants';
import { Tip } from '../../../core-mismes/models/tip';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipsService {
  constructor(private http: HttpClient) { }
  getTips(): Observable<any> {
    return this.http.get<Tip[]>(Constants.TIP_BASE, {
      observe: 'response'
    });
  }

  updateTipTranslations(tipId: number, obj: any): Observable<any> {
    return this.http.post<any>(Constants.TIP_BASE + '/' + tipId + '/define-translation', obj);
  }
}
