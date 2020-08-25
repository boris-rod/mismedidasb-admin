import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbDialogRef } from '@nebular/theme';
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
  title = '';
  isLoading: boolean = false;

  edit: boolean = false;
  // id: number = -1;
  dishName = new FormControl();
  dishCalories = new FormControl();
  dishFat = new FormControl();
  dishFiber = new FormControl();
  dishCarbohidrates = new FormControl();
  dishProteins = new FormControl();

  ///news
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

  images: any[] = [];
  removedImages: any[] = [];
  imagesToSend: File[] = [];

  hideRemoveButton = true;

  selectedTags: Tag[] = [];
  allTags: Tag[] = [];

  selectedClassification: any;
  allClassifications: any[] = [];

  dishToEdit: Dish;

  constructor(protected ref: NbDialogRef<AddDishComponent>,
    private dishService: DishesService, private tagService: TagService,
    private toastrService: NbToastrService) {


    this.allClassifications.push({ 'name': 'Protéico', 'value': 0 });
    this.allClassifications.push({ 'name': 'Calórico', 'value': 1 });
    this.allClassifications.push({ 'name': 'Frutas y Vegetales', 'value': 2 });

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

  }

  ngOnInit() {
    console.log(this.dishToEdit);
    this.loadTags();
    if (this.edit === false) {
      this.selectedClassification = this.allClassifications[0];
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

      ///news
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
      if (this.dishToEdit.isCaloric === true) {
        this.selectedClassification = this.allClassifications.filter(c => c['value'] === 1)[0];
      } else if (this.dishToEdit.isProteic === true) {
        this.selectedClassification = this.allClassifications.filter(c => c['value'] === 0)[0];
      } else {
        this.selectedClassification = this.allClassifications.filter(c => c['value'] === 2)[0];
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
      image: this.imagesToSend.length > 0 ? this.imagesToSend[0] : null,
      classification: this.selectedClassification['value'],
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
      zinc: this.zync.value
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

      console.log(obj);
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
