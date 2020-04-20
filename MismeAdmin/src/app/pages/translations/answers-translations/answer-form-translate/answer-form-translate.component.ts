import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnswerService } from '../answer.service';
import { FormControl } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'answer-form-translate',
  templateUrl: './answer-form-translate.component.html',
  styleUrls: ['./answer-form-translate.component.scss']
})
export class AnswerFormTranslateComponent implements OnInit {
  isLoading = false;
  @Input() answerId: number;
  @Input() lang: string;
  @Input() title: string;
  @Input() order: number;

  @Output() valuesChanged = new EventEmitter<any>();

  titleControl = new FormControl();
  constructor(private answerService: AnswerService,
    private toastrService: NbToastrService) { }

  ngOnInit() {
    this.titleControl.setValue(this.title ? this.title : '');
  }

  saveTranslation() {
    this.isLoading = true;
    const obj = {
      'lang': this.lang,
      'title': this.titleControl.value,
      'order': this.order
    };
    this.answerService.updateAnswerTranslations(this.answerId, obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(re => {
        this.toastrService.success('Traducción actualizada satisfactoriamente.', 'Traducir Respuesta');
        // if (this.lang === 'es') {
        this.valuesChanged.emit({ 'title': this.titleControl.value, 'id': this.answerId, 'lang': this.lang });
        // }
      });

  }

}
