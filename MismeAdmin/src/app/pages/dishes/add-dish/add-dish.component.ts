import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { Logger } from '../../../core-mismes';
import { FormControl, RequiredValidator, Validators } from '@angular/forms';

const log = new Logger('Add Dish');
@Component({
  selector: 'add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.scss']
})
export class AddDishComponent implements OnInit {

  dishName = new FormControl();
  dishCalories = new FormControl();
  dishFat = new FormControl();
  dishFiber = new FormControl();
  dishCarbohidrates = new FormControl();
  dishProteins = new FormControl();

  images: any[] = [];
  removedImages: any[] = [];
  imagesToSend: File[] = [];

  constructor(protected ref: NbWindowRef) {
    this.dishName.setValidators(Validators.required);
    this.dishName.setValue('');

    this.dishCalories.setValidators(Validators.required);
    this.dishCalories.setValue(0);

    this.dishFat.setValidators(Validators.required);
    this.dishFat.setValue(0.0);

    this.dishFiber.setValidators(Validators.required);
    this.dishFiber.setValue(0.0);

    this.dishCarbohidrates.setValidators(Validators.required);
    this.dishCarbohidrates.setValue(0.0);

    this.dishProteins.setValidators(Validators.required);
    this.dishProteins.setValue(0.0);
  }

  ngOnInit() {

  }



}
