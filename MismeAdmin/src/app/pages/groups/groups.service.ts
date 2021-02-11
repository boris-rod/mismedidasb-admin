import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../../core-mismes/constants/constants';
import { Observable } from 'rxjs';
import { Group } from 'src/app/core-mismes/models/group';

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


  // getAdminConcepts(): Observable<any> {
  //   return this.http.get<Concept[]>(Constants.CONCEPT_BASE + '/admin', {
  //     observe: 'response'
  //   });
  // }
  // updateConcept(concept: any): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('id', concept.id);
  //   formData.append('title', concept.title);
  //   formData.append('description', concept.description);
  //   formData.append('image', concept.image);
  //   formData.append('removedImage', concept.removedImage);
  //   return this.http.put<Concept>(Constants.CONCEPT_BASE + '/' + concept.id, formData);
  // }
  // getConceptPolls(conceptId: number): Observable<any> {
  //   return this.http.get<Poll[]>(Constants.CONCEPT_BASE + '/' + conceptId + '/polls', {
  //     observe: 'response'
  //   });
  // }

  // updateConceptPollOrder(conceptId: number, obj: any): Observable<any> {
  //   return this.http.post<any>(Constants.CONCEPT_BASE + '/' + conceptId + '/polls-order', obj);
  // }

  // updateConceptTranslations(conceptId: number, obj: any): Observable<any> {
  //   return this.http.post<any>(Constants.CONCEPT_BASE + '/' + conceptId + '/define-translation', obj);
  // }
}
