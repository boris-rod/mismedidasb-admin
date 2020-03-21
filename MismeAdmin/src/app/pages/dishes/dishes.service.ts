import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../../core-mismes/constants/constants';
import { Dish } from '../../core-mismes/models/dish';

@Injectable({
    providedIn: 'root'
})
export class DishesService {
    constructor(private http: HttpClient) { }

    getDishes(search: string, tags: number[]) {
        let params: HttpParams = new HttpParams()
            .append('search', search);

        tags.forEach(numb => {
            params = params.append('tags', numb.toString());
        });

        return this.http.get<Dish>(Constants.DISH_BASE, {
            params: params,
            observe: 'response'
        });
    }
    getDishById(id: number) {
        return this.http.get<Dish>(Constants.DISH_BASE + '/' + id, {
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
        return this.http.post<Dish>(Constants.DISH_BASE, formData);
    }
    updateDish(dish: any) {
        const formData = new FormData();
        formData.append('id', dish.id);
        formData.append('name', dish.name);
        formData.append('calories', dish.calories);
        formData.append('carbohydrates', dish.carbohydrates);
        formData.append('proteins', dish.proteins);
        formData.append('fat', dish.fat);
        formData.append('fiber', dish.fiber);
        formData.append('image', dish.image);
        formData.append('removedImage', dish.removedImage);
        for (const tag of dish.newTags) {
            formData.append('newTags', tag);
        }
        for (const tag of dish.tagsIds) {
            formData.append('tagsIds', tag.toString());
        }
        return this.http.post<Dish>(Constants.UPDATE_DISH, formData);
    }
    deleteDish(dishId: number) {

        return this.http.post(Constants.DELETE_DISH + "/" + dishId, {});
    }
}
