import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../../core-mismes/constants/constants';
import { Dish } from '../../core-mismes/models/dish';

@Injectable({
    providedIn: 'root'
})
export class DishesService {
    constructor(private http: HttpClient) { }

    getDishes(search: string) {
        const params: HttpParams = new HttpParams()
            .append('search', search);

        return this.http.get<Dish>(Constants.GET_DISHES, {
            params: params,
            observe: 'response'
        });
    }
}
