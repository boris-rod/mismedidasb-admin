import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../../core-mismes/constants/constants';
import { Dish } from '../../core-mismes/models/dish';
import { CompoundDish } from '../../core-mismes/models/compound-dish';

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

        formData.append('classification', dish.classification);
        formData.append('cholesterol', dish.cholesterol);
        formData.append('calcium', dish.calcium);
        formData.append('phosphorus', dish.phosphorus);
        formData.append('iron', dish.iron);
        formData.append('potassium', dish.potassium);
        formData.append('sodium', dish.sodium);
        formData.append('vitaminC', dish.vitaminC);
        formData.append('vitaminA', dish.vitaminA);
        formData.append('vitaminB6', dish.vitaminB6);
        formData.append('vitaminB12', dish.vitaminB12);
        formData.append('vitaminD', dish.vitaminD);
        formData.append('vitaminE', dish.vitaminE);
        formData.append('vitaminK', dish.vitaminK);
        formData.append('vitaminB1Thiamin', dish.vitaminB1Thiamin);
        formData.append('vitaminB2Riboflavin', dish.vitaminB2Riboflavin);
        formData.append('vitaminB3Niacin', dish.vitaminB3Niacin);
        formData.append('vitaminB9Folate', dish.vitaminB9Folate);
        formData.append('netWeight', dish.netWeight);
        formData.append('volume', dish.volume);
        formData.append('saturatedFat', dish.saturatedFat);
        formData.append('monoUnsaturatedFat', dish.monoUnsaturatedFat);
        formData.append('polyUnsaturatedFat', dish.polyUnsaturatedFat);
        formData.append('zinc', dish.zinc);

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
        formData.append('classification', dish.classification);
        formData.append('cholesterol', dish.cholesterol);
        formData.append('calcium', dish.calcium);
        formData.append('phosphorus', dish.phosphorus);
        formData.append('iron', dish.iron);
        formData.append('potassium', dish.potassium);
        formData.append('sodium', dish.sodium);
        formData.append('vitaminC', dish.vitaminC);
        formData.append('vitaminA', dish.vitaminA);
        formData.append('vitaminB6', dish.vitaminB6);
        formData.append('vitaminB12', dish.vitaminB12);
        formData.append('vitaminD', dish.vitaminD);
        formData.append('vitaminE', dish.vitaminE);
        formData.append('vitaminK', dish.vitaminK);
        formData.append('vitaminB1Thiamin', dish.vitaminB1Thiamin);
        formData.append('vitaminB2Riboflavin', dish.vitaminB2Riboflavin);
        formData.append('vitaminB3Niacin', dish.vitaminB3Niacin);
        formData.append('vitaminB9Folate', dish.vitaminB9Folate);
        formData.append('netWeight', dish.netWeight);
        formData.append('volume', dish.volume);
        formData.append('saturatedFat', dish.saturatedFat);
        formData.append('monoUnsaturatedFat', dish.monoUnsaturatedFat);
        formData.append('polyUnsaturatedFat', dish.polyUnsaturatedFat);
        formData.append('zinc', dish.zinc);

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

    getAdminDishes() {
        return this.http.get<Dish[]>(Constants.DISH_BASE + '/admin', {
            observe: 'response'
        });
    }
    updateDishTranslations(dishId: number, obj: any) {
        return this.http.post<any>(Constants.DISH_BASE + '/' + dishId + '/define-translation', obj);
    }

    getUsersDishes(search: string, filter: number) {
        let params: HttpParams = new HttpParams()
            .append('search', search)
            .append('filter', filter.toString());
        return this.http.get<CompoundDish>(Constants.COMPOUND_DISH_BASE + '/admin', {
            params: params,
            observe: 'response'
        });
    }
    updateUsersDishAsReviewed(id: number) {
        return this.http.post<any>(Constants.COMPOUND_DISH_BASE + '/' + id + '/reviewed', {});
    }
    createDish(dish: any) {
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
        formData.append('userId', dish.userId);

        formData.append('classification', dish.classification);
        formData.append('cholesterol', dish.cholesterol);
        formData.append('calcium', dish.calcium);
        formData.append('phosphorus', dish.phosphorus);
        formData.append('iron', dish.iron);
        formData.append('potassium', dish.potassium);
        formData.append('sodium', dish.sodium);
        formData.append('vitaminC', dish.vitaminC);
        formData.append('vitaminA', dish.vitaminA);
        formData.append('vitaminB6', dish.vitaminB6);
        formData.append('vitaminB12', dish.vitaminB12);
        formData.append('vitaminD', dish.vitaminD);
        formData.append('vitaminE', dish.vitaminE);
        formData.append('vitaminK', dish.vitaminK);
        formData.append('vitaminB1Thiamin', dish.vitaminB1Thiamin);
        formData.append('vitaminB2Riboflavin', dish.vitaminB2Riboflavin);
        formData.append('vitaminB3Niacin', dish.vitaminB3Niacin);
        formData.append('vitaminB9Folate', dish.vitaminB9Folate);
        formData.append('netWeight', dish.netWeight);
        formData.append('volume', dish.volume);
        formData.append('saturatedFat', dish.saturatedFat);
        formData.append('monoUnsaturatedFat', dish.monoUnsaturatedFat);
        formData.append('polyUnsaturatedFat', dish.polyUnsaturatedFat);
        formData.append('zinc', dish.zinc);




        for (const tag of dish.newTags) {
            formData.append('newTags', tag);
        }
        for (const tag of dish.tagsIds) {
            formData.append('tagsIds', tag.toString());
        }
        return this.http.post<any>(Constants.COMPOUND_DISH_BASE + '/create-dish', formData);
    }

}
