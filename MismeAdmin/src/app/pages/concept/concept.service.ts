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
}
