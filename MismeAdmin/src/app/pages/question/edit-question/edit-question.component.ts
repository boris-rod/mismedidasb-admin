import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Answer } from '../../../core-mismes/models/answer';
import { Question } from '../../../core-mismes/models/question';
import { FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { QuestionService } from '../question.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {
  title = 'Nueva Pregunta';
  pollId = -1;
  question: Question;
  answers: Answer[];

  questionName = '';

  selectedAnswer: Answer;
  answerName = new FormControl();
  answerWeight = new FormControl();

  showInput = false;

  @ViewChild('answerTitleElement', { static: false })
  answerTitleElement!: ElementRef;


  constructor(private ref: NbDialogRef<EditQuestionComponent>,
    private questionService: QuestionService,
    private toastrService: NbToastrService,
    private detector: ChangeDetectorRef) {
    this.answerName.setValidators(Validators.required);
    this.answerWeight.setValidators([Validators.required, Validators.pattern('^-?[0-9]+$')]);

  }

  ngOnInit() {
    if (this.question) {
      this.questionName = this.question.title;
    }
  }

  // newAnswer() {
  //   const ans: Answer = {
  //     title: 'Respuesta',
  //     weight: 0,
  //     id: this.getRandomArbitrary(),
  //     order: this.answers.length + 1,
  //     questionId: -1,
  //     createdAt: new Date(),
  //     modifiedAt: new Date(),
  //   };
  //   this.answers.push(ans);
  //   this.inlineEdition(ans);
  // }

  // deleteAnswer(a: Answer) {
  //   const ind = this.answers.findIndex(an => an.id === a.id);
  //   if (ind > -1) {
  //     this.answers.splice(ind, 1);
  //   }
  // }

  inlineEdition(a: Answer) {
    this.selectedAnswer = a;
    this.answerName.setValue(a.title);
    this.answerWeight.setValue(a.weight);
    this.showInput = true;
    setTimeout(() => {
      this.answerTitleElement.nativeElement.focus();
    }, 0);
  }
  hideInput() {
    this.showInput = false;
    if (this.selectedAnswer.title === '') {
      const ind = this.answers.findIndex(a => a.id === this.selectedAnswer.id);
      if (ind > -1) {
        this.answers.splice(ind, 1);
      }
    }
  }

  setValues() {
    this.selectedAnswer.weight = this.answerWeight.value;
    this.selectedAnswer.title = this.answerName.value;
    this.showInput = false;
  }

  // selectionChange(e: any, a: Answer) {
  //   let backup = this.answers;
  //   const ind = backup.findIndex(p => p.id === a.id);
  //   backup[e - 1].order = ind + 1;
  //   backup[ind].order = a.order;
  //   backup = backup.sort((as, b) => as.order - b.order)
  //   this.answers.splice(0, backup.length - 1, ...backup);
  //   this.answers = [...backup];

  //   this.detector.detectChanges();
  // }
  // removeAllAnswers() {
  //   this.answers = [];
  // }
  dismiss() {
    this.ref.close();
  }

  getRandomArbitrary() {
    return Math.floor(Math.random() * (9999999999 - 1)) + 1;
  }

  saveQuestion() {
    const obj = {
      pollId: this.pollId,
      questionName: this.questionName,
      questionId: this.question ? this.question.id : -1,
      questionOrder: this.question ? this.question.order : -1,
      answers: this.answers
    };
    this.questionService.addOrUpdateQuestionWithAnswers(obj)
      .pipe(finalize(() => { }))
      .subscribe(not => {
        if (this.question) {
          this.toastrService.success('Pregunta actualizada satisfactoriamente.', 'Pregunta');
        } else {
          this.toastrService.success('Pregunta adicionada satisfactoriamente.', 'Pregunta');
        }
        this.ref.close(not);
      });
  }

}

