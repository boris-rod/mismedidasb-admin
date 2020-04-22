import { Component, OnInit } from '@angular/core';
import { Question } from '../../../core-mismes/models/question';
import { QuestionService } from '../../question/question.service';

@Component({
  selector: 'question-translations',
  templateUrl: './question-translations.component.html',
  styleUrls: ['./question-translations.component.scss']
})
export class QuestionTranslationsComponent implements OnInit {
  questions: Question[];
  backupQuestions: Question[];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.getAdminQuestions().subscribe(resp => {
      this.questions = resp.body['result'];
    });
  }

  onContentChanged(event: any) {
    const index = this.questions.findIndex(c => c.id === event.id);
    if (index !== -1) {
      if (event.lang === 'en') {
        this.questions[index].titleEN = event.title;
      }
      else if (event.lang === 'it') {
        this.questions[index].titleIT = event.title;
      }
      else {
        this.questions[index].title = event.title;
      }
      if (this.backupQuestions && this.backupQuestions.length > 0) {
        this.questions = this.questions.filter(t => !t.titleEN || t.titleEN === '' || !t.titleIT || t.titleIT === '');
      }
      this.questions = [...this.questions];
    }
  }

  onCheckedChange(event: any) {
    if (event === true) {
      this.backupQuestions = this.questions;
      this.questions = this.questions.filter(t => !t.titleEN || t.titleEN === '' || !t.titleIT || t.titleIT === '');
    }
    else {
      this.questions = [...this.backupQuestions];
      this.backupQuestions = [];
    }
  }


}
