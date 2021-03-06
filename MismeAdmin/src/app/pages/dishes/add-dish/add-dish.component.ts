import { Component, OnInit } from '@angular/core';
import { NbWindowRef, NbToastrService } from '@nebular/theme';
import { Logger } from '../../../core-mismes';
import { FormControl, RequiredValidator, Validators } from '@angular/forms';
import { DishesService } from '../dishes.service';
import { TagService } from '../tags.service';
import { Tag } from '../../../core-mismes/models/tag';
import { finalize } from 'rxjs/operators';
import { Dish } from '../../../core-mismes/models/dish';

const log = new Logger('Add Dish');

@Component({
  selector: 'add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.scss']
})
export class AddDishComponent implements OnInit {
  isLoading: boolean = false;

  edit: boolean = false;
  // id: number = -1;
  dishName = new FormControl();
  dishCalories = new FormControl();
  dishFat = new FormControl();
  dishFiber = new FormControl();
  dishCarbohidrates = new FormControl();
  dishProteins = new FormControl();

  images: any[] = [];
  removedImages: any[] = [];
  imagesToSend: File[] = [];

  hideRemoveButton = true;

  selectedTags: Tag[] = [];
  allTags: Tag[] = [];

  dishToEdit: Dish;

  constructor(protected ref: NbWindowRef, private dishService: DishesService, private tagService: TagService, private toastrService: NbToastrService) {
    this.dishName.setValidators(Validators.required);
    this.dishName.setValue('');

    this.dishCalories.setValidators(Validators.required);
    this.dishCalories.setValue(0.0);

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
    this.loadTags();
    if (this.edit === false) {

    }
    else {
      this.dishName.setValue(this.dishToEdit.name);
      this.dishCalories.setValue(this.dishToEdit.calories);
      this.dishFat.setValue(this.dishToEdit.fat);
      this.dishFiber.setValue(this.dishToEdit.fiber);
      this.dishCarbohidrates.setValue(this.dishToEdit.carbohydrates);
      this.dishProteins.setValue(this.dishToEdit.proteins);
      this.selectedTags = this.dishToEdit.tags;
      if (this.dishToEdit.image !== null && this.dishToEdit.image !== '') {
        const img = {
          src: this.dishToEdit.image,
        };
        this.images.push(img);
      }

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
    if (this.edit === false) {
      this.dishService.addDish(obj)
        .pipe(finalize(() => {
          this.isLoading = false;
        })).subscribe(d => {
          this.toastrService.success('Plato creado satisfactoriamente.', 'Adicionar Plato');
          this.cleanFields();
          this.ref.close();
        }, error => {
          this.toastrService.danger('Ha ocurrido un error adicionando el plato.', 'Adicionar Plato');
          log.error(error);
        });
    } else {
      obj['id'] = this.dishToEdit.id;
      obj['removedImage'] = this.removedImages.length > 0 ? this.removedImages[0] : null
      this.dishService.updateDish(obj)
        .pipe(finalize(() => {
          this.isLoading = false;
        })).subscribe(d => {
          this.toastrService.success('Plato actualizado satisfactoriamente.', 'Editar Plato');
          this.cleanFields();
          this.ref.close();
        });
    }
  }

  cleanFields() {
    this.allTags = [];
    this.selectedTags = [];
    this.imagesToSend = [];
    this.removedImages = [];
    this.images = [];
  }

  close() {
    this.cleanFields();
    this.ref.close();
  }
}
