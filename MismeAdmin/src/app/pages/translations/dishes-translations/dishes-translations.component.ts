import { Component, OnInit } from '@angular/core';
import { Dish } from '../../../core-mismes/models/dish';
import { DishesService } from '../../dishes/dishes.service';

@Component({
  selector: 'dishes-translations',
  templateUrl: './dishes-translations.component.html',
  styleUrls: ['./dishes-translations.component.scss']
})
export class DishesTranslationsComponent implements OnInit {
  dishes: Dish[] = [];
  allDishes: Dish[] = [];
  backupDishes: Dish[] = [];
  selectedPage = 1;
  constructor(private dishService: DishesService) { }

  ngOnInit() {
    this.dishService.getAdminDishes().subscribe(resp => {
      this.allDishes = resp.body['result'];
      this.dishes = [...this.allDishes.slice(0, 180)];
      this.selectedPage = 1;
    });
  }
  onTitleChanged(event: any) {
    const index = this.dishes.findIndex(c => c.id === event.id);
    if (index !== -1) {
      if (event.lang === 'en') {
        this.dishes[index].nameEN = event.name;
      }
      else if (event.lang === 'it') {
        this.dishes[index].nameIT = event.name;
      }
      else {
        this.dishes[index].name = event.name;
      }
      if (this.backupDishes && this.backupDishes.length > 0) {
        this.dishes = this.dishes.filter(t => !t.nameEN || t.nameEN === '' || !t.nameIT || t.nameIT === '');
      }
      this.dishes = [...this.dishes];
    }
  }

  onCheckedChange(event: any) {
    if (event === true) {
      this.backupDishes = this.dishes;
      this.dishes = this.dishes.filter(t => !t.nameEN || t.nameEN === '' || !t.nameIT || t.nameIT === '');
    }
    else {
      this.dishes = [...this.backupDishes];
      this.backupDishes = [];
    }
  }
  selectPage(page: number) {
    this.selectedPage = page;
    if (this.backupDishes && this.backupDishes.length > 0) {

    }
    else {
      if (page === 1) {
        this.dishes = [...this.allDishes.slice(0, 180)];
      }
      else if (page === 2) {
        this.dishes = [...this.allDishes.slice(181, 361)];
      }
      else if (page === 3) {
        this.dishes = [...this.allDishes.slice(362, 542)];
      }
      else {
        this.dishes = [...this.allDishes.slice(543, 800)];
      }
    }


  }
}
