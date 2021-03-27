import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../../core-mismes/constants/constants';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/core-mismes/models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  constructor(private http: HttpClient) { }

  getMenusAdmin(page: number, perPage: number, sortOrder: string, search: string)
    : Observable<any> {
    const params: HttpParams = new HttpParams()
      .append('page', page.toString())
      .append('perPage', perPage.toString())
      .append('sortOrder', sortOrder)
      .append('search', search);

    return this.http.get<Menu>(Constants.MENU_ADMIN, {
      params,
      observe: 'response'
    });
  }

  addMenuBasic(obj: any): Observable<any> {

    return this.http.post<any>(Constants.MENU, obj, {
      observe: 'response'
    });
  }
  addMenuWithDishes(obj: any, menuId: number): Observable<any> {

    return this.http.post<any>(Constants.MENU + '/' + menuId + '/update-eats', obj, {
      observe: 'response'
    });
  }

  activateMenu(menuId: number): Observable<any> {
    return this.http.patch<any>(Constants.MENU + '/' + menuId + '/active', {});
  }

  deactivateMenu(menuId: number): Observable<any> {
    return this.http.patch<any>(Constants.MENU + '/' + menuId + '/deactivate', {});
  }

  // markImportantNormal(id: number, important: boolean): Observable<any> {
  //   const params: HttpParams = new HttpParams()
  //     .append('important', important.toString());
  //   return this.http.post<any>(Constants.CONTACT_US_BASE + '/' + id + '/important-status', {}, {
  //     params,
  //     observe: 'response'
  //   });
  // }
  // answerMessage(body: any): Observable<any> {
  //   return this.http.post<any>(Constants.CONTACT_US_BASE + '/answer', body, {});
  // }

  // sendEmailToUsers(body: any): Observable<any> {
  //   return this.http.put<any>(Constants.GET_ADMIN_USER + '/send-email', body, {});
  // }

}
