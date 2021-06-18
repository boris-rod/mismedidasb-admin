import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/core-mismes/models/answer';
import { AnswerService } from './answers.service';

@Component({
  selector: 'app-answers-translations',
  templateUrl: './answers-translations.component.html',
  styleUrls: ['./answers-translations.component.css']
})
export class AnswersTranslationsComponent implements OnInit {
  answers: Answer[];
  backupAnswers: Answer[];

  checked = false;

  constructor(private answerService: AnswerService) { }

  ngOnInit(): void {
    this.answerService.getAnswers().subscribe(resp => {
      this.answers = resp.body.result;

    });
  }
  onContentChanged(event: any): void {
    const index = this.answers.findIndex(c => c.id === event.id);
    if (index !== -1) {
      if (event.lang === 'en') {
        this.answers[index].titleEN = event.title;
      }
      else if (event.lang === 'it') {
        this.answers[index].titleIT = event.title;
      }
      else {
        this.answers[index].title = event.title;
      }
      if (this.backupAnswers && this.backupAnswers.length > 0) {
        this.answers = this.answers.filter(t => !t.titleEN || t.titleEN === '' || !t.titleIT || t.titleIT === '');
      }

      this.answers = [...this.answers];
    }
  }

  onCheckedChange(event: any): void {
    if (event === true) {
      this.backupAnswers = this.answers;
      this.answers = this.answers.filter(t => !t.titleEN || t.titleEN === '' || !t.titleIT || t.titleIT === '');
    }
    else {
      this.answers = [...this.backupAnswers];
      this.backupAnswers = [];
    }
  }


}
