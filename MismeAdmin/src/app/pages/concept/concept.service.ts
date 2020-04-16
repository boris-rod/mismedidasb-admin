import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../../core-mismes/constants/constants';
import { Concept } from '../../core-mismes/models/concept';
import { Poll } from '../../core-mismes/models/poll';

@Injectable({
    providedIn: 'root'
})
export class ConceptService {
    constructor(private http: HttpClient) { }
    getConcepts() {
        return this.http.get<Concept[]>(Constants.CONCEPT_BASE, {
            observe: 'response'
        });
    }
    getAdminConcepts() {
        return this.http.get<Concept[]>(Constants.CONCEPT_BASE + '/admin', {
            observe: 'response'
        });
    }
    updateConcept(concept: any) {
        const formData = new FormData();
        formData.append('id', concept.id);
        formData.append('title', concept.title);
        formData.append('description', concept.description);
        formData.append('image', concept.image);
        formData.append('removedImage', concept.removedImage);
        return this.http.put<Concept>(Constants.CONCEPT_BASE + '/' + concept.id, formData);
    }
    getConceptPolls(conceptId: number) {
        return this.http.get<Poll[]>(Constants.CONCEPT_BASE + '/' + conceptId + '/polls', {
            observe: 'response'
        });
    }

    updateConceptPollOrder(conceptId: number, obj: any) {
        return this.http.post<any>(Constants.CONCEPT_BASE + '/' + conceptId + '/polls-order', obj);
    }

    updateConceptTranslations(conceptId: number, obj: any) {
        return this.http.post<any>(Constants.CONCEPT_BASE + '/' + conceptId + '/define-translation', obj);
    }
}
