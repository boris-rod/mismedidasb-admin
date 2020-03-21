import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../../core-mismes/constants/constants';
import { Concept } from '../../core-mismes/models/concept';

@Injectable({
    providedIn: 'root'
})
export class ConceptService {
    constructor(private http: HttpClient) { }
    getConcepts() {
        return this.http.get<Concept>(Constants.GET_CONCEPTS, {
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
        return this.http.put<Concept>(Constants.UPDATE_CONCEPT + '/' + concept.id, formData);
    }
}
