import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Concept } from 'src/app/core-mismes/models/concept';
import { ConceptsService } from '../concepts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  isLoading = false;
  conceptName = new FormControl();
  conceptDescription = new FormControl();
  conceptToEdit: Concept;
  avatarUrl?: string;
  avatarLoading = false;

  images: any[] = [];
  removedImages: any[] = [];
  imagesToSend: File[] = [];

  hideRemoveButton = true;

  constructor(private modal: NzModalRef, private messageService: NzMessageService, private conceptsService: ConceptsService) {
    this.conceptName.setValidators(Validators.required);
    this.conceptName.setValue('');

    this.conceptDescription.setValue('');
  }

  ngOnInit(): void {
    this.conceptName.setValue(this.conceptToEdit.title);
    this.conceptDescription.setValue(this.conceptToEdit.description);
    if (this.conceptToEdit.image !== null && this.conceptToEdit.image !== '') {
      const img = {
        src: this.conceptToEdit.image,
      };
      this.images.push(img);
    }
  }

  clear(refreshIsNeeded = false): void {
    this.imagesToSend = [];
    this.removedImages = [];
    this.images = [];
    this.modal.destroy(refreshIsNeeded);
  }

  saveConcept(): void {
    this.isLoading = true;
    const obj = {
      id: this.conceptToEdit.id,
      title: this.conceptName.value,
      description: this.conceptDescription.value,
      image: this.imagesToSend.length > 0 ? this.imagesToSend[0] : null
    };
    // tslint:disable-next-line:no-string-literal
    obj['removedImage'] = this.removedImages.length > 0 ? this.removedImages[0] : null;

    this.conceptsService.updateConcept(obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.messageService.success('Concepto actualizado satisfactoriamente.');
        this.clear();
        this.clear(true);
      });
  }

  onImageAdded(images: File[]): void {
    this.imagesToSend = images;
  }
  onImageRemoved(src: string): void {
    this.removedImages.push(src);
  }

}
