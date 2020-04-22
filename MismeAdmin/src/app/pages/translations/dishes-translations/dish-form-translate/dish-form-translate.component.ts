import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DishesService } from '../../../dishes/dishes.service';
import { NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'dish-form-translate',
  templateUrl: './dish-form-translate.component.html',
  styleUrls: ['./dish-form-translate.component.scss']
})
export class DishFormTranslateComponent implements OnInit {
  isLoading = false;
  @Input() dishId: number;
  @Input() lang: string;
  @Input() name: string;

  @Output() valuesChanged = new EventEmitter<any>();

  nameControl = new FormControl();
  constructor(private dishService: DishesService,
    private toastrService: NbToastrService) { }

  ngOnInit() {
    this.nameControl.setValue(this.name ? this.name : '');
  }

  saveTranslation() {
    this.isLoading = true;
    const obj = {
      'lang': this.lang,
      'name': this.nameControl.value
    };
    this.dishService.updateDishTranslations(this.dishId, obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(re => {
        this.toastrService.success('Traducción actualizada satisfactoriamente.', 'Traducir Plato');
        // if (this.lang === 'es') {
        this.valuesChanged.emit({ 'name': this.nameControl.value, 'id': this.dishId, 'lang': this.lang });
        // }
      });

  }

}
