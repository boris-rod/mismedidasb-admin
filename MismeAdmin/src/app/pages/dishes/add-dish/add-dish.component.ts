import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Dish } from 'src/app/core-mismes/models/dish';
import { Tag } from 'src/app/core-mismes/models/tag';
import { DishesService } from '../dishes.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { TagService } from '../tags.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {
  isLoading = false;

  dishName = new FormControl();
  dishCalories = new FormControl();
  dishFat = new FormControl();
  dishFiber = new FormControl();
  dishCarbohidrates = new FormControl();
  dishProteins = new FormControl();

  /// news
  netWeight = new FormControl();
  volume = new FormControl();
  satFat = new FormControl();
  monoInsatFat = new FormControl();
  polySatFat = new FormControl();
  cholesterol = new FormControl();
  vitaminA = new FormControl();
  tiamin = new FormControl();
  riboflavin = new FormControl();
  niacin = new FormControl();
  vitaminB6 = new FormControl();
  folato = new FormControl();
  vitaminB12 = new FormControl();
  vitaminC = new FormControl();
  vitaminD = new FormControl();
  vitaminE = new FormControl();
  vitaminK = new FormControl();
  calcium = new FormControl();
  phosphorus = new FormControl();
  iron = new FormControl();
  zync = new FormControl();
  potassium = new FormControl();
  sodium = new FormControl();
  alcohol = new FormControl();

  images: any[] = [];
  removedImages: any[] = [];
  imagesToSend: File[] = [];

  hideRemoveButton = true;

  selectedTags: Tag[] = [];
  allTags: Tag[] = [];
  currentTag = 1;

  selectedClassification: any;
  allClassifications: any[] = [];
  currentClassification = -1;

  dishToEdit: Dish;

  constructor(private dishService: DishesService,
    private messageService: NzMessageService,
    private tagService: TagService,
    private modalService: NzModalService,
    private modal: NzModalRef) {

    this.allClassifications.push({ name: 'Protéico', value: 0 });
    this.allClassifications.push({ name: 'Calórico', value: 1 });
    this.allClassifications.push({ name: 'Frutas y Vegetales', value: 2 });

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

    this.netWeight.setValue(0.0);
    this.volume.setValue(0.0);
    this.satFat.setValue(0.0);
    this.monoInsatFat.setValue(0.0);
    this.polySatFat.setValue(0.0);
    this.cholesterol.setValue(0.0);
    this.vitaminA.setValue(0.0);
    this.tiamin.setValue(0.0);
    this.riboflavin.setValue(0.0);
    this.niacin.setValue(0.0);
    this.vitaminB6.setValue(0.0);
    this.folato.setValue(0.0);
    this.vitaminB12.setValue(0.0);
    this.vitaminC.setValue(0.0);
    this.vitaminD.setValue(0.0);
    this.vitaminE.setValue(0.0);
    this.vitaminK.setValue(0.0);
    this.calcium.setValue(0.0);
    this.phosphorus.setValue(0.0);
    this.iron.setValue(0.0);
    this.zync.setValue(0.0);
    this.potassium.setValue(0.0);
    this.sodium.setValue(0.0);
    this.alcohol.setValue(0.0);

  }

  ngOnInit(): void {
    this.loadTags();
    if (!this.dishToEdit) {
      this.selectedClassification = this.allClassifications[0];
      this.currentClassification = this.selectedClassification.value;
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

      /// news
      this.netWeight.setValue(this.dishToEdit.netWeight);
      this.volume.setValue(this.dishToEdit.volume);
      this.satFat.setValue(this.dishToEdit.saturatedFat);
      this.monoInsatFat.setValue(this.dishToEdit.monoUnsaturatedFat);
      this.polySatFat.setValue(this.dishToEdit.polyUnsaturatedFat);
      this.cholesterol.setValue(this.dishToEdit.cholesterol);
      this.vitaminA.setValue(this.dishToEdit.vitaminA);
      this.tiamin.setValue(this.dishToEdit.vitaminB1Thiamin);
      this.riboflavin.setValue(this.dishToEdit.vitaminB2Riboflavin);
      this.niacin.setValue(this.dishToEdit.vitaminB3Niacin);
      this.vitaminB6.setValue(this.dishToEdit.vitaminB6);
      this.folato.setValue(this.dishToEdit.vitaminB9Folate);
      this.vitaminB12.setValue(this.dishToEdit.vitaminB12);
      this.vitaminC.setValue(this.dishToEdit.vitaminC);
      this.vitaminD.setValue(this.dishToEdit.vitaminD);
      this.vitaminE.setValue(this.dishToEdit.vitaminE);
      this.vitaminK.setValue(this.dishToEdit.vitaminK);
      this.calcium.setValue(this.dishToEdit.calcium);
      this.phosphorus.setValue(this.dishToEdit.phosphorus);
      this.iron.setValue(this.dishToEdit.iron);
      this.zync.setValue(this.dishToEdit.zinc);
      this.potassium.setValue(this.dishToEdit.potassium);
      this.sodium.setValue(this.dishToEdit.sodium);
      this.alcohol.setValue(this.dishToEdit.alcohol);
      if (this.dishToEdit.isCaloric === true) {
        this.selectedClassification = this.allClassifications.filter(c => c.value === 1)[0];
      } else if (this.dishToEdit.isProteic === true) {
        this.selectedClassification = this.allClassifications.filter(c => c.value === 0)[0];
      } else {
        this.selectedClassification = this.allClassifications.filter(c => c.value === 2)[0];
      }
      this.currentClassification = this.selectedClassification.value;

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
      if (this.dishToEdit) {
        this.currentTag = this.dishToEdit.tags[0].id;
      } else {
        this.currentTag = this.allTags[0].id;
      }
    });
  }

  save(): void {
    this.isLoading = true;
    const tagsIds = [];
    const newTags = [];
    // this.selectedTags.forEach(t => {
    // if (t.id) {
    tagsIds.push(this.currentTag);
    //  }
    //  else {
    //   newTags.push(t.name);
    // }
    // });
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
      // classification: this.selectedClassification['value'],
      classification: this.currentClassification,
      cholesterol: this.cholesterol.value,
      calcium: this.calcium.value,
      phosphorus: this.phosphorus.value,
      iron: this.iron.value,
      potassium: this.potassium.value,
      sodium: this.sodium.value,
      vitaminA: this.vitaminA.value,
      vitaminC: this.vitaminC.value,
      vitaminB6: this.vitaminB6.value,
      vitaminB12: this.vitaminB12.value,
      vitaminD: this.vitaminD.value,
      vitaminE: this.vitaminE.value,
      vitaminK: this.vitaminK.value,
      vitaminB1Thiamin: this.tiamin.value,
      vitaminB2Riboflavin: this.riboflavin.value,
      vitaminB3Niacin: this.niacin.value,
      vitaminB9Folate: this.folato.value,
      netWeight: this.netWeight.value,
      volume: this.volume.value,
      saturatedFat: this.satFat.value,
      monoUnsaturatedFat: this.monoInsatFat.value,
      polyUnsaturatedFat: this.polySatFat.value,
      zinc: this.zync.value,
      alcohol: this.alcohol.value
    };
    if (!this.dishToEdit) {
      this.dishService.addDish(obj)
        .pipe(finalize(() => {
          this.isLoading = false;
        })).subscribe(d => {
          this.messageService.success('Plato creado satisfactoriamente.');
          this.cleanFields();
          this.close(true);
        }, error => {
          this.messageService.error('Ha ocurrido un error adicionando el plato.');
          // log.error(error);
        });
    } else {
      // tslint:disable-next-line:no-string-literal
      obj['id'] = this.dishToEdit.id;
      // tslint:disable-next-line:no-string-literal
      obj['removedImage'] = this.removedImages.length > 0 ? this.removedImages[0] : null;
      this.dishService.updateDish(obj)
        .pipe(finalize(() => {
          this.isLoading = false;
        })).subscribe(d => {
          // this.toastrService.success('Plato actualizado satisfactoriamente.', 'Editar Plato');
          this.messageService.success('Plato actualizado satisfactoriamente.');
          this.cleanFields();
          this.close(true);
        });
    }

  }

  close(refresh = false): void {
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
