import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/pages/polls/questions.services';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-question-for-translation',
  templateUrl: './question-for-translation.component.html',
  styleUrls: ['./question-for-translation.component.css']
})
export class QuestionForTranslationComponent implements OnInit {
  isLoading = false;
  @Input() questionId: number;
  @Input() lang: string;
  @Input() title: string;

  @Output() valuesChanged = new EventEmitter<any>();

  titleString = '';
  constructor(private questionService: QuestionsService,
    private toastrService: NzMessageService) { }

  ngOnInit(): void {
    this.titleString = this.title ? this.title : '';
  }

  saveTranslation(): void {
    this.isLoading = true;
    const obj = {
      lang: this.lang,
      title: this.titleString
    };
    this.questionService.updateTipTranslations(this.questionId, obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(re => {
        this.toastrService.success('Traducción actualizada satisfactoriamente.');
        // if (this.lang === 'es') {
        this.valuesChanged.emit({ title: this.titleString, id: this.questionId, lang: this.lang });
        // }
      });

  }

}
