import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs/operators';
import { Poll } from 'src/app/core-mismes/models/poll';
import { Question } from 'src/app/core-mismes/models/question';
import { PollsService } from '../polls.service';
import { QuestionsService } from '../questions.services';
import { QuestionEditComponent } from '../question-edit/question-edit.component';

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.css']
})
export class PollDetailsComponent implements OnInit {
  isLoading = false;
  poll: Poll;

  selectedQuestion: Question;

  constructor(private modal: NzModalRef,
    private pollService: PollsService,
    private questionService: QuestionsService,
    private messageService: NzMessageService,
    private modalService: NzModalService) { }

  ngOnInit(): void {
  }
  loadPollQuestions(): void {
    this.questionService.getPollQuestions(this.poll.id)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.poll.questions = [...resp.result];

      }, error => {
      });
  }
  editQuestion(q: Question): void {
    const modal = this.modalService.create({
      nzTitle: 'Editar Pregunta',
      nzContent: QuestionEditComponent,
      nzFooter: null,
      nzWidth: 800,
      nzComponentParams: { question: q, answers: q.answers, pollId: q.pollId }
    });
    modal.afterClose.subscribe(resp => {
      if (resp === true) {
        this.loadPollQuestions();
      }
    }, err => {

    });

  }


  hideEditBtn(q: Question): void {
    this.selectedQuestion = q;
  }

  contentChange(q: Question): void {
    console.log(q);
    if (this.selectedQuestion) {
      this.questionService.updateQuestionTitle(this.selectedQuestion.id, this.selectedQuestion.title)
        .pipe(finalize(() => {
          this.selectedQuestion = null;
        }))
        .subscribe(not => {
          this.messageService.success('Pregunta actualizada satisfactoriamente.');
          // const index = this.poll.questions.findIndex(p => p.id === this.selectedQuestion.id);
          // if (index > -1) {
          //   this.poll.questions[index].title = this.selectedQuestion.title;
          //   this.poll.questions = [...this.poll.questions];
          // }
          this.loadPollQuestions();
        }
        );
    }
  }
}
