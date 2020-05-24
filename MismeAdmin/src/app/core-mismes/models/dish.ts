import { Tag } from './tag';

export interface Dish {
    id: number;
    name: string;
    nameEN: string;
    nameIT: string;
    calories: number;
    carbohydrates: number;
    proteins: number;
    fat: number;
    cholesterol: number;
    fiber: number;
    calcium: number;
    phosphorus: number;
    iron: number;
    potassium: number;
    sodium: number;
    zinc: number;
    magnesium: number;
    ribofla: number;
    niacin: number;
    folicAcid: number;
    vitaminA: number;
    vitaminC: number;
    vitaminB6: number;
    vitaminB12: number;
    thiamine: number;
    image: string;
    imageMimeType: string;
    tags: Tag[];
}
