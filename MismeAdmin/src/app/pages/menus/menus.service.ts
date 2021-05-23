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

  getMenusAdmin(page: number, perPage: number, sortOrder: string, search: string, isActive?: boolean)
    : Observable<any> {
    let params: HttpParams = new HttpParams()
      .append('page', page.toString())
      .append('perPage', perPage.toString())
      .append('sortOrder', sortOrder)
      .append('search', search);

    if (isActive !== null) {
      params = params.append('isActive', isActive.toString());
    }
    return this.http.get<Menu>(Constants.MENU_ADMIN, {
      params,
      observe: 'response'
    });
  }
  getMenusGroup(page: number, perPage: number, sortOrder: string, search: string, groupId: number, isActive?: boolean)
    : Observable<any> {

    let params: HttpParams = new HttpParams()
      .append('page', page.toString())
      .append('perPage', perPage.toString())
      .append('sortOrder', sortOrder)
      .append('search', search);

    if (isActive !== null) {
      params = params.append('isActive', isActive.toString());
    }

    return this.http.get<Menu>(Constants.MENU + '/group/' + groupId, {
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
  updateMenuBasic(obj: any, menuId: number): Observable<any> {
    return this.http.put<any>(Constants.MENU + '/' + menuId, obj, {});
  }

  activateMenu(menuId: number): Observable<any> {
    return this.http.patch<any>(Constants.MENU + '/' + menuId + '/active', {});
  }

  deactivateMenu(menuId: number): Observable<any> {
    return this.http.patch<any>(Constants.MENU + '/' + menuId + '/deactivate', {});
  }

  getGeneralMenus(page: number, perPage: number, sortOrder: string, search: string)
    : Observable<any> {
    const params: HttpParams = new HttpParams()
      .append('page', page.toString())
      .append('perPage', perPage.toString())
      .append('sortOrder', sortOrder)
      .append('search', search);

    return this.http.get<Menu>(Constants.MENU, {
      params,
      observe: 'response'
    });
  }


}
