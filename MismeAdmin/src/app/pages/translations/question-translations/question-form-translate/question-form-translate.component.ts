import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuestionService } from '../../../question/question.service';
import { NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'question-form-translate',
  templateUrl: './question-form-translate.component.html',
  styleUrls: ['./question-form-translate.component.scss']
})
export class QuestionFormTranslateComponent implements OnInit {
  isLoading = false;
  @Input() questionId: number;
  @Input() lang: string;
  @Input() title: string;

  @Output() valuesChanged = new EventEmitter<any>();

  titleControl = new FormControl();
  constructor(private questionService: QuestionService,
    private toastrService: NbToastrService) { }

  ngOnInit() {
    this.titleControl.setValue(this.title ? this.title : '');
  }

  saveTranslation() {
    this.isLoading = true;
    const obj = {
      'lang': this.lang,
      'title': this.titleControl.value
    };
    this.questionService.updateTipTranslations(this.questionId, obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(re => {
        this.toastrService.success('Traducción actualizada satisfactoriamente.', 'Traducir Pregunta');
        // if (this.lang === 'es') {
        this.valuesChanged.emit({ 'title': this.titleControl.value, 'id': this.questionId, 'lang': this.lang });
        // }
      });

  }
}
