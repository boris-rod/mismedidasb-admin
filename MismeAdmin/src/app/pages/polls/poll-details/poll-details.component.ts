import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Poll } from '../../../core-mismes/models/poll';
import { NbDialogRef, NbToastrService, NbDialogService } from '@nebular/theme';
import { Question } from '../../../core-mismes/models/question';
import { PollsService } from '../polls.service';
import { QuestionService } from '../../question/question.service';
import { finalize } from 'rxjs/operators';
import { EditQuestionComponent } from '../../question/edit-question/edit-question.component';
import { Answer } from '../../../core-mismes/models/answer';

@Component({
  selector: 'poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.scss']
})
export class PollDetailsComponent implements OnInit {
  isLoading: boolean = false;
  title = '';
  poll: Poll;

  showInput = false;
  selectedQuestion: Question;

  questionName = '';
  questionToDelete = 0;

  @ViewChild('questionTitleElement', { static: false }) questionTitleElement!: ElementRef;

  constructor(private ref: NbDialogRef<PollDetailsComponent>,
    private pollService: PollsService,
    private questionService: QuestionService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService) { }

  ngOnInit() {
  }

  loadPollQuestions() {
    this.questionService.getPollQuestions(this.poll.id)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.poll.questions = [...resp['result']];

      }, error => {
      });
  }

  dismiss() {
    this.ref.close();
  }

  // newQuestion() {
  //   const ind = this.poll.questions.findIndex(q => q.answers.length > 0);
  //   let answers: Answer[] = [];
  //   if (ind > -1) {
  //     answers = this.poll.questions[ind].answers;
  //   }

  //   this.dialogService.open(EditQuestionComponent, {
  //     context: {
  //       answers: answers,
  //       pollId: this.poll.id
  //     }
  //   }).onClose.subscribe(s => {
  //     if (s) {
  //       this.loadPollQuestions();
  //     }
  //   });
  // }

  editQuestion(q: Question) {
    this.dialogService.open(EditQuestionComponent, {
      context: {
        title: 'Editar Pregunta',
        answers: q.answers,
        pollId: this.poll.id,
        question: q
      }
    }).onClose.subscribe(s => {
      if (s) {
        this.loadPollQuestions();
      }
    });
  }


  // selectionChange(event: any, q: Question) {
  //   const ind = this.poll.questions.findIndex(p => p.id === q.id);
  //   this.poll.questions[event - 1].order = ind + 1;
  //   const obj = {
  //     questionOneId: q.id,
  //     questionOneOrder: q.order,
  //     questionTwoId: this.poll.questions[event - 1].id,
  //     questionTwoOrder: this.poll.questions[event - 1].order
  //   };

  //   this.pollService.updatePollQuestionOrder(this.poll.id, obj)
  //     .pipe(finalize(() => {
  //       this.isLoading = false;
  //     }))
  //     .subscribe(resp => {
  //       this.loadPollQuestions();
  //       this.toastrService.success('Preguntas actualizadas satisfactoriamente.', 'Cuestionario');
  //     }, error => {
  //     });
  // }

  hideInput() {
    if (this.questionName !== '') {
      this.showInput = false;
      if (this.selectedQuestion.title !== this.questionName) {
        this.selectedQuestion.title = this.questionName;
        this.questionService.updateQuestionTitle(this.selectedQuestion.id, this.selectedQuestion.title)
          .pipe(finalize(() => {

          }))
          .subscribe(not => {
            this.toastrService.success('Pregunta actualizada satisfactoriamente.', 'Pregunta');
            const index = this.poll.questions.findIndex(p => p.id === this.selectedQuestion.id);
            if (index > -1) {
              this.poll.questions[index].title = this.selectedQuestion.title;
              this.poll.questions = [...this.poll.questions];
            }
          },
          );
      }
    }
  }

  inlineEdition(q: Question) {
    this.selectedQuestion = q;
    this.questionName = q.title;
    this.showInput = true;
    setTimeout(() => {
      this.questionTitleElement.nativeElement.focus();
    }, 0);
  }

  deleteQuestion(q: Question, dialog: TemplateRef<any>) {
    this.questionToDelete = q.id;
    this.dialogService.open(dialog, {
    }).onClose.subscribe(s => {
      var index = this.poll.questions.findIndex(qu => qu.id === q.id)
      if (index > -1) {
        this.poll.questions.splice(index, 1);
      }
      var toUpdateOrder = this.poll.questions.filter(qu => qu.order > q.order);
      toUpdateOrder.forEach(q => {
        q.order = q.order - 1;
      });
      this.poll.questions = [...this.poll.questions];
    });
  }


  deleteQuestionDialog(ref: NbDialogRef<any>) {
    this.isLoading = true;
    this.questionService.deleteQuestion(this.questionToDelete)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.questionToDelete = 0;
        this.toastrService.success('Pregunta eliminada satisfactoriamente.', 'Eliminar Pregunta');
        ref.close();
      });
  }
  dismissDeleteQuestion(ref: NbDialogRef<any>) {
    ref.close();
  }

  onContentChange(content: string) {
    this.poll.htmlContent = content;
  }

  saveContent() {
    const obj = {
      readOnly: true,
      htmlContent: this.poll.htmlContent
    };
    this.pollService.updatePollReadOnly(this.poll.id, obj)
      .pipe(finalize(() => {
      })).subscribe(d => {
        this.ref.close();
        this.toastrService.success('Cuestionario actualizado satisfactoriamente.', 'Cuestionario');
      });
  }
}
