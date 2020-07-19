import { Component, OnInit } from '@angular/core';
import { CompoundDish } from '../../../core-mismes/models/compound-dish';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormControl, Validators } from '@angular/forms';
import { Tag } from '../../../core-mismes/models/tag';
import { TagService } from '../tags.service';
import { DishesService } from '../dishes.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'compound-dish-review',
  templateUrl: './compound-dish-review.component.html',
  styleUrls: ['./compound-dish-review.component.scss']
})
export class CompoundDishReviewComponent implements OnInit {
  isLoading = false;
  dishToEdit: CompoundDish;

  dishName = new FormControl();
  dishCalories = new FormControl();
  dishFat = new FormControl();
  dishFiber = new FormControl();
  dishCarbohidrates = new FormControl();
  dishProteins = new FormControl();

  selectedTags: Tag[] = [];
  allTags: Tag[] = [];

  images: any[] = [];
  removedImages: any[] = [];
  imagesToSend: File[] = [];

  hideRemoveButton = true;


  constructor(protected ref: NbDialogRef<CompoundDishReviewComponent>,
    private dishService: DishesService,
    private tagService: TagService,
    private toastrService: NbToastrService) {
  }

  ngOnInit() {
    this.loadTags();
    this.dishName.setValidators(Validators.required);
    this.dishName.setValue(this.dishToEdit.name);

    this.dishCalories.setValidators(Validators.required);
    this.dishCalories.setValue(this.dishToEdit.calories.toFixed(2));

    this.dishFat.setValidators(Validators.required);
    this.dishFat.setValue(this.dishToEdit.fat.toFixed(2));

    this.dishFiber.setValidators(Validators.required);
    this.dishFiber.setValue(this.dishToEdit.fiber.toFixed(2));

    this.dishCarbohidrates.setValidators(Validators.required);
    this.dishCarbohidrates.setValue(this.dishToEdit.carbohydrates.toFixed(2));

    this.dishProteins.setValidators(Validators.required);
    this.dishProteins.setValue(this.dishToEdit.proteins.toFixed(2));

    if (this.dishToEdit.image !== null && this.dishToEdit.image !== '') {
      const img = {
        src: this.dishToEdit.image,
      };
      this.images.push(img);
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


  saveUserDish() {
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
      image: this.imagesToSend.length > 0 ? this.imagesToSend[0] : null,
      id: this.dishToEdit.id,
      removedImage: this.removedImages.length > 0 ? this.removedImages[0] : null,
      // for reward system purposes
      userId: this.dishToEdit.userId
    };
    this.dishService.createDish(obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.toastrService.success('Plato creado satisfactoriamente.', 'Crear Plato');
        this.dismiss();
      }, error => {
        this.toastrService.danger('Ya existe un plato con este nombre.', 'Crear Plato');
      });


  }
  reviewUserDish() {
    this.dishService.updateUsersDishAsReviewed(this.dishToEdit.id).subscribe(re => {
      this.toastrService.success('Plato revisado satisfactoriamente.', 'Revisar Plato');
      this.dismiss();
    });
  }

  dismiss() {
    this.cleanFields();
    this.ref.close();
  }

  cleanFields() {
    this.allTags = [];
    this.selectedTags = [];
    this.imagesToSend = [];
    this.removedImages = [];
    this.images = [];
  }
  addTagFn(name) {
    if (!this.selectedTags) {
      this.selectedTags = [];
    }
    this.selectedTags = [...this.selectedTags, { id: -1, name: name }];
    return { name: name, tag: true };

  }
}
