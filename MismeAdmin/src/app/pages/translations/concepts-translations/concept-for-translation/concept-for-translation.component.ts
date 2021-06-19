import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConceptsService } from 'src/app/pages/concepts/concepts.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-concept-for-translation',
  templateUrl: './concept-for-translation.component.html',
  styleUrls: ['./concept-for-translation.component.css']
})
export class ConceptForTranslationComponent implements OnInit {
  isLoading = false;
  @Input() conceptId: number;
  @Input() lang: string;
  @Input() concName: string;
  @Input() concDescription: string;
  @Input() instructions: string;

  @Output() valuesChanged = new EventEmitter<any>();

  conceptNameString = '';
  conceptDescriptionString = '';

  constructor(private conceptService: ConceptsService,
    private toastrService: NzMessageService) {
  }

  ngOnInit(): void {
    this.conceptNameString = this.concName ? this.concName : '';
    this.conceptDescriptionString = this.concDescription ? this.concDescription : '';
    if (!this.instructions) {
      this.instructions = '';
    }

  }

  onContentChange(content: any): void {
    this.instructions = content;
  }

  saveTranslation(): void {
    this.isLoading = true;
    const obj = {
      lang: this.lang,
      title: this.conceptNameString,
      description: this.conceptDescriptionString,
      instructions: this.instructions
    };
    this.conceptService.updateConceptTranslations(this.conceptId, obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(re => {
        this.toastrService.success('Traducción actualizada satisfactoriamente.');
        // if (this.lang === 'es') {
        this.valuesChanged.emit({ title: this.conceptNameString, id: this.conceptId, lang: this.lang });
        // }
      });

  }

}
