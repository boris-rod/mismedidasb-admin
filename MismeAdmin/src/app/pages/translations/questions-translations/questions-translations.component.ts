import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/core-mismes/models/question';
import { QuestionsService } from '../../polls/questions.services';

@Component({
  selector: 'app-questions-translations',
  templateUrl: './questions-translations.component.html',
  styleUrls: ['./questions-translations.component.css']
})
export class QuestionsTranslationsComponent implements OnInit {
  questions: Question[];
  backupQuestions: Question[];

  checked = false;
  constructor(private questionService: QuestionsService) { }

  ngOnInit(): void {
    this.questionService.getAdminQuestions().subscribe(resp => {
      this.questions = resp.body.result;
    });
  }

  onContentChanged(event: any): void {
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

  onCheckedChange(event: any): void {
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
