import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs/operators';
import { Answer } from 'src/app/core-mismes/models/answer';
import { Question } from 'src/app/core-mismes/models/question';
import { PollsService } from '../polls.service';
import { QuestionsService } from '../questions.services';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
  isLoading = false;
  pollId = -1;
  question: Question;
  answers: Answer[];

  questionName = new FormControl();

  selectedAnswer: Answer;
  answerName = new FormControl();
  answerWeight = new FormControl();

  constructor(private modal: NzModalRef,
    private pollService: PollsService,
    private questionService: QuestionsService,
    private messageService: NzMessageService) { }

  ngOnInit(): void {
    this.questionName.setValidators(Validators.required);
    this.questionName.setValue(this.question.title);
  }
  contentChange(a: Answer): void {

  }
  saveQuestion(): void {
    const obj = {
      pollId: this.pollId,
      questionName: this.questionName.value,
      questionId: this.question ? this.question.id : -1,
      questionOrder: this.question ? this.question.order : -1,
      answers: this.answers
    };
    this.questionService.addOrUpdateQuestionWithAnswers(obj)
      .pipe(finalize(() => { }))
      .subscribe(not => {
        if (this.question) {
          this.messageService.success('Pregunta actualizada satisfactoriamente.');
        } else {
          this.messageService.success('Pregunta adicionada satisfactoriamente.');
        }
        this.close(true);
      });
  }
  close(refreshIsNeeded = false): void {
    this.modal.close(refreshIsNeeded);
  }
}
