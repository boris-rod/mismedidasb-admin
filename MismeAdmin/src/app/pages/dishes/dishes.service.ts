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

    addDish(dish: any) {

        const formData = new FormData();
        formData.append('name', dish.name);
        formData.append('calories', dish.calories);
        formData.append('carbohydrates', dish.carbohydrates);
        formData.append('proteins', dish.proteins);
        formData.append('fat', dish.fat);
        formData.append('fiber', dish.fiber);
        formData.append('image', dish.image);
        for (const tag of dish.newTags) {
            formData.append('newTags', tag);
        }
        for (const tag of dish.tagsIds) {
            formData.append('tagsIds', tag.toString());
        }
        console.log(formData);
        return this.http.post<Dish>(Constants.ADD_DISH, formData);
    }
}
