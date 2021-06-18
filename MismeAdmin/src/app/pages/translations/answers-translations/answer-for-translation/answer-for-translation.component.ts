import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnswerService } from '../answers.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-answer-for-translation',
  templateUrl: './answer-for-translation.component.html',
  styleUrls: ['./answer-for-translation.component.css']
})
export class AnswerForTranslationComponent implements OnInit {

  isLoading = false;
  @Input() answerId: number;
  @Input() lang: string;
  @Input() title: string;
  @Input() order: number;

  @Output() valuesChanged = new EventEmitter<any>();

  titleString = '';
  constructor(private answerService: AnswerService,
    private toastrService: NzMessageService) { }

  ngOnInit(): void {
    this.titleString = this.title ? this.title : '';
  }

  saveTranslation(): void {
    this.isLoading = true;
    const obj = {
      lang: this.lang,
      title: this.titleString,
      order: this.order
    };
    this.answerService.updateAnswerTranslations(this.answerId, obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(re => {
        this.toastrService.success('Traducción actualizada satisfactoriamente.');
        // if (this.lang === 'es') {
        this.valuesChanged.emit({ title: this.titleString, id: this.answerId, lang: this.lang });
        // }
      });

  }


}
