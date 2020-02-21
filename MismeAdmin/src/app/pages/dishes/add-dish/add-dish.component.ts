import { Component, OnInit } from '@angular/core';
import { NbWindowRef, NbToastrService } from '@nebular/theme';
import { Logger } from '../../../core-mismes';
import { FormControl, RequiredValidator, Validators } from '@angular/forms';
import { DishesService } from '../dishes.service';
import { TagService } from '../tags.service';
import { Tag } from '../../../core-mismes/models/tag';
import { finalize } from 'rxjs/operators';

const log = new Logger('Add Dish');

@Component({
  selector: 'add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.scss']
})
export class AddDishComponent implements OnInit {
  isLoading: boolean = false;

  edit: boolean = false;
  dishName = new FormControl();
  dishCalories = new FormControl();
  dishFat = new FormControl();
  dishFiber = new FormControl();
  dishCarbohidrates = new FormControl();
  dishProteins = new FormControl();

  images: any[] = [];
  removedImages: any[] = [];
  imagesToSend: File[] = [];

  selectedTags: Tag[] = [];
  allTags: Tag[] = [];

  constructor(protected ref: NbWindowRef, private dishService: DishesService, private tagService: TagService, private toastrService: NbToastrService) {
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
    if (this.edit === false) {
      this.loadTags();
    }
  }
  onImageAdded(images: File[]) {
    this.imagesToSend = images;
  }
  onImageRemoved(src: string) {
    this.removedImages.push(src);
  }

  loadTags() {
    this.tagService.getTags().subscribe(r => {
      this.allTags = r.body['result'];
    });
  }
  addTagFn(name) {
    if (!this.selectedTags) {
      this.selectedTags = [];
    }
    this.selectedTags = [...this.selectedTags, { id: -1, name: name }];
    return { name: name, tag: true };

  }
  saveDish() {
    this.isLoading = true;
    const tagsIds = [];
    const newTags = [];
    this.selectedTags.forEach(t => {
      if (t.id) {
        tagsIds.push(t.id);
      } else {
        newTags.push(t.name);
      }
    });
    const obj = {
      name: this.dishName.value,
      calories: this.dishCalories.value,
      carbohydrates: this.dishCarbohidrates.value,
      proteins: this.dishProteins.value,
      fat: this.dishFat.value,
      fiber: this.dishFiber.value,
      tagsIds: tagsIds,
      newTags: newTags,
      image: this.imagesToSend.length > 0 ? this.imagesToSend[0] : null
    };

    this.dishService.addDish(obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.toastrService.success('Plato creado satisfactoriamente.', 'Adicionar Plato');
        this.ref.close();
        this.allTags = [];
      });

  }
}
