import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Concept } from '../../../core-mismes/models/concept';
import { NbWindowRef, NbToastrService, NbDialogRef } from '@nebular/theme';
import { ConceptService } from '../concept.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'edit-concept',
  templateUrl: './edit-concept.component.html',
  styleUrls: ['./edit-concept.component.scss']
})
export class EditConceptComponent implements OnInit {

  title = '';
  isLoading: boolean = false;

  conceptName = new FormControl();
  conceptDescription = new FormControl();

  images: any[] = [];
  removedImages: any[] = [];
  imagesToSend: File[] = [];

  hideRemoveButton = true;

  conceptToEdit: Concept;
  constructor(protected ref: NbDialogRef<EditConceptComponent>,
    private conceptService: ConceptService,
    private toastrService: NbToastrService) {

    this.conceptName.setValidators(Validators.required);
    this.conceptName.setValue('');

    this.conceptDescription.setValue('');
  }

  ngOnInit() {
    this.conceptName.setValue(this.conceptToEdit.title);
    this.conceptDescription.setValue(this.conceptToEdit.description);
    if (this.conceptToEdit.image !== null && this.conceptToEdit.image !== '') {
      const img = {
        src: this.conceptToEdit.image,
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
  cleanFields() {
    this.conceptDescription.setValue('');
    this.conceptName.setValue('');
    this.imagesToSend = [];
    this.removedImages = [];
    this.images = [];
  }

  close() {
    this.cleanFields();
    this.ref.close();
  }
  saveConcept() {
    this.isLoading = true;
    const obj = {
      id: this.conceptToEdit.id,
      title: this.conceptName.value,
      description: this.conceptDescription.value,
      image: this.imagesToSend.length > 0 ? this.imagesToSend[0] : null
    };
    obj['removedImage'] = this.removedImages.length > 0 ? this.removedImages[0] : null
    this.conceptService.updateConcept(obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.toastrService.success('Concepto actualizado satisfactoriamente.', 'Editar Concepto');
        this.cleanFields();
        this.ref.close();
      });
  }

}
