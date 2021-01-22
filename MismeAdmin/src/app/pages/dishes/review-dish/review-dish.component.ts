import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CompoundDish } from 'src/app/core-mismes/models/compound-dish';
import { Tag } from 'src/app/core-mismes/models/tag';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { DishesService } from '../dishes.service';
import { TagService } from '../tags.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-review-dish',
  templateUrl: './review-dish.component.html',
  styleUrls: ['./review-dish.component.css']
})
export class ReviewDishComponent implements OnInit {

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
  currentTag = -1;

  images: any[] = [];
  removedImages: any[] = [];
  imagesToSend: File[] = [];

  hideRemoveButton = true;

  constructor(protected modal: NzModalRef,
    private dishService: DishesService,
    private tagService: TagService,
    private messageService: NzMessageService) { }

  ngOnInit(): void {
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

  onImageAdded(images: File[]): void {
    this.imagesToSend = images;
  }
  onImageRemoved(src: string): void {
    this.removedImages.push(src);
  }
  loadTags(): void {
    this.tagService.getTags().subscribe(r => {
      this.allTags = r.body.result;
    });
  }

  saveUserDish(): void {

    if (this.currentTag === -1) {
      this.messageService.error('Seleccione un Tag.');
    }
    else {
      this.isLoading = true;
      const tagsIds = [];
      const newTags = [];
      // this.selectedTags.forEach(t => {
      //   // if (t.id) {
      //   //   tagsIds.push(t.id);
      //   // } else {
      //   //   newTags.push(t.name);
      //   // }
      // });
      tagsIds.push(this.currentTag);

      const obj = {
        name: this.dishName.value,
        calories: this.dishCalories.value,
        carbohydrates: this.dishCarbohidrates.value,
        proteins: this.dishProteins.value,
        fat: this.dishFat.value,
        fiber: this.dishFiber.value,
        tagsIds,
        newTags,
        image: this.imagesToSend.length > 0 ? this.imagesToSend[0] : null,
        id: this.dishToEdit.id,
        removedImage: this.removedImages.length > 0 ? this.removedImages[0] : null,
        // for reward system purposes
        userId: this.dishToEdit.userId,

        // hardcoded fix me
        classification: 0,

        cholesterol: this.dishToEdit.cholesterol,
        calcium: this.dishToEdit.calcium,
        phosphorus: this.dishToEdit.phosphorus,
        iron: this.dishToEdit.iron,
        potassium: this.dishToEdit.potassium,
        sodium: this.dishToEdit.sodium,
        vitaminA: this.dishToEdit.vitaminA,
        vitaminC: this.dishToEdit.vitaminC,
        vitaminB6: this.dishToEdit.vitaminB6,
        vitaminB12: this.dishToEdit.vitaminB12,
        vitaminD: this.dishToEdit.vitaminD,
        vitaminE: this.dishToEdit.vitaminE,
        vitaminK: this.dishToEdit.vitaminK,
        vitaminB1Thiamin: this.dishToEdit.vitaminB1Thiamin,
        vitaminB2Riboflavin: this.dishToEdit.vitaminB2Riboflavin,
        vitaminB3Niacin: this.dishToEdit.vitaminB3Niacin,
        vitaminB9Folate: this.dishToEdit.vitaminB9Folate,
        netWeight: this.dishToEdit.netWeight,
        volume: this.dishToEdit.volume,
        saturatedFat: this.dishToEdit.saturatedFat,
        monoUnsaturatedFat: this.dishToEdit.monoUnsaturatedFat,
        polyUnsaturatedFat: this.dishToEdit.polyUnsaturatedFat,
        zinc: this.dishToEdit.zinc,
        alcohol: this.dishToEdit.alcohol
      };
      this.dishService.createDish(obj)
        .pipe(finalize(() => {
          this.isLoading = false;
        })).subscribe(d => {
          this.messageService.success('Plato creado satisfactoriamente.');
          this.close(true);
        }, error => {
          this.messageService.error('Plato creado satisfactoriamente.');
        });
    }
  }

  reviewUserDish(): void {
    this.dishService.updateUsersDishAsReviewed(this.dishToEdit.id).subscribe(re => {
      this.messageService.success('Plato revisado satisfactoriamente.');
      this.close(true);
    });
  }

  close(refresh = false): void {
    this.cleanFields();
    this.modal.destroy(refresh);
  }

  cleanFields(): void {
    this.allTags = [];
    this.selectedTags = [];
    this.imagesToSend = [];
    this.removedImages = [];
    this.images = [];
  }

}
