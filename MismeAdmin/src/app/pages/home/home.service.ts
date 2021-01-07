import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/core-mismes/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) { }

  changePass(changePass: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(Constants.CHANGE_PASS, changePass, {
      observe: 'response'
    });
  }
  getProfile(): Observable<HttpResponse<any>> {
    return this.http.get(Constants.GET_PROFILE, {
      observe: 'response'
    });
  }
}
