import { Tag } from './tag';

export interface Dish {
    id: number;
    name: string;
    calories: number;
    carbohydrates: number;
    proteins: number;
    fat: number;
    fiber: number;
    image: string;
    imageMimeType: string;
    tags: Tag[];
}
