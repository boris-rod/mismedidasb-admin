import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConceptService } from '../../../concept/concept.service';
import { finalize } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'concept-form-translation',
  templateUrl: './concept-form-translation.component.html',
  styleUrls: ['./concept-form-translation.component.scss']
})
export class ConceptFormTranslationComponent implements OnInit {

  isLoading = false;
  @Input() conceptId: number;
  @Input() lang: string;
  @Input() concName: string;
  @Input() concDescription: string;
  @Input() instructions: string;

  @Output() valuesChanged = new EventEmitter<any>();

  conceptName = new FormControl();
  conceptDescription = new FormControl();

  constructor(private conceptService: ConceptService,
    private toastrService: NbToastrService) {
  }

  ngOnInit() {
    this.conceptName.setValue(this.concName ? this.concName : '');
    this.conceptDescription.setValue(this.concDescription ? this.concDescription : '');
    if (!this.instructions) {
      this.instructions = '';
    }

  }

  onContentChange(content: any) {
    this.instructions = content;
  }

  saveTranslation() {
    this.isLoading = true;
    const obj = {
      'lang': this.lang,
      'title': this.conceptName.value,
      'description': this.conceptDescription.value ? this.conceptDescription.value : '',
      'instructions': this.instructions
    };
    this.conceptService.updateConceptTranslations(this.conceptId, obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(re => {
        this.toastrService.success('Traducción actualizada satisfactoriamente.', 'Traducir Concepto');
        // if (this.lang === 'es') {
        this.valuesChanged.emit({ 'title': this.conceptName.value, 'id': this.conceptId, 'lang': this.lang });
        // }
      });

  }
}
