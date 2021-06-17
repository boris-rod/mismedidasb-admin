import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../../../core-mismes/constants/constants';
import { Tip } from '../../../core-mismes/models/tip';
import { GeneralContent } from '../../../core-mismes/models/general-content';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralContentService {
  constructor(private http: HttpClient) { }
  getContents(): Observable<any> {
    return this.http.get<GeneralContent[]>(Constants.GENERAL_CONTENT_BASE + '/admin', {
      observe: 'response'
    });
  }

  updateContentsTranslations(contentId: number, obj: any): Observable<any> {
    return this.http.post<any>(Constants.GENERAL_CONTENT_BASE + '/' + contentId + '/define-translation', obj);
  }
}
