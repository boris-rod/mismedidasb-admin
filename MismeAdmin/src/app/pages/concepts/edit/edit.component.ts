import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
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
  constructor(private modal: NzModalRef, private messageService: NzMessageService, private conceptsService: ConceptsService) {
    this.conceptName.setValidators(Validators.required);
    this.conceptName.setValue('');

    this.conceptDescription.setValue('');
  }

  ngOnInit(): void {
    this.conceptName.setValue(this.conceptToEdit.title);
    this.conceptDescription.setValue(this.conceptToEdit.description);
  }
  close(): void {
    this.modal.destroy();
  }

  saveConcept(): void {
    this.isLoading = true;
    const obj = {
      id: this.conceptToEdit.id,
      title: this.conceptName.value,
      description: this.conceptDescription.value,
      // image: this.imagesToSend.length > 0 ? this.imagesToSend[0] : null
    };
    // obj['removedImage'] = this.removedImages.length > 0 ? this.removedImages[0] : null
    this.conceptsService.updateConcept(obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.messageService.create('success', 'Concepto actualizado satisfactoriamente.');
        this.close();
      });
  }
}
