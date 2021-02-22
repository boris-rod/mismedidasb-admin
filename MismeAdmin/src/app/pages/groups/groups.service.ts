import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../../core-mismes/constants/constants';
import { Observable } from 'rxjs';
import { Group } from 'src/app/core-mismes/models/group';
import { Invitation } from '../../core-mismes/models/invitation';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  constructor(private http: HttpClient) { }

  getGroups(page: number, perPage: number, sort: string, search: string,
    isActive?: boolean): Observable<any> {
    let params: HttpParams = new HttpParams()
      .append('page', page.toString())
      .append('perPage', perPage.toString())
      .append('sortOrder', sort)
      .append('search', search);

    if (isActive !== null) {
      params = params.append('isActive', isActive.toString());
    }

    return this.http.get<Group[]>(Constants.GROUPS_BASE, {
      params,
      observe: 'response'
    });
  }

  addGroup(obj: any): Observable<any> {
    return this.http.post<any>(Constants.GROUPS_BASE, obj);
  }

  activateGroup(groupId: number): Observable<any> {
    return this.http.patch<any>(Constants.GROUPS_BASE + '/' + groupId + '/active', {});
  }

  deactivateGroup(groupId: number): Observable<any> {
    return this.http.patch<any>(Constants.GROUPS_BASE + '/' + groupId + '/deactivate', {});
  }

  getGroupInvitations(groupId: number, page: number, perPage: number, sort: string, search: string,
    status: number[]): Observable<any> {
    let params: HttpParams = new HttpParams()
      .append('page', page.toString())
      .append('perPage', perPage.toString())
      .append('sortOrder', sort)
      .append('search', search);

    status.forEach(sf => {
      params = params.append('statuses', sf.toString());
    });

    return this.http.get<Invitation[]>(Constants.GROUPS_BASE_NO_ADMIN + '/' + groupId + '/group-invitations', {
      params,
      observe: 'response'
    });
  }

  sentGroupInvites(groupId: number, obj: any): Observable<any> {
    return this.http.post<any>(Constants.GROUPS_BASE_NO_ADMIN + '/' + groupId + '/group-invitations', obj);
  }

  deleteInvite(groupId: number, invitationId: number): Observable<any> {
    return this.http.delete<any>(Constants.GROUPS_BASE_NO_ADMIN + '/' + groupId + '/group-invitations/' + invitationId);
  }

  acceptInvitation(token: string): Observable<any> {
    const params: HttpParams = new HttpParams()
      .append('token', token);
    return this.http.patch<any>(Constants.GROUPS_BASE_NO_ADMIN + '/group-invitations/accept', {}, { params });
  }

  declineInvitation(token: string): Observable<any> {
    const params: HttpParams = new HttpParams()
      .append('token', token);
    return this.http.patch<any>(Constants.GROUPS_BASE_NO_ADMIN + '/group-invitations/decline', {}, { params });
  }
}
