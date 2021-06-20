import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PollsService } from 'src/app/pages/polls/polls.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-poll-for-translation',
  templateUrl: './poll-for-translation.component.html',
  styleUrls: ['./poll-for-translation.component.css']
})
export class PollForTranslationComponent implements OnInit {

  isLoading = false;
  @Input() pollId: number;
  @Input() lang: string;
  @Input() pollName: string;
  @Input() pollDescription: string;
  @Input() pollHtmlContent: string;
  @Input() pollReadOnly: boolean;

  @Output() valuesChanged = new EventEmitter<any>();

  nameString = '';
  descriptionString = '';
  pollHtmlContentString = '';

  constructor(private pollService: PollsService,
    private toastrService: NzMessageService) {

  }

  ngOnInit(): void {

    this.nameString = this.pollName && this.pollName !== '' ? this.pollName : '';
    this.descriptionString = this.pollDescription && this.pollDescription !== '' ? this.pollDescription : '';
    this.pollHtmlContentString = this.pollHtmlContent && this.pollHtmlContent !== '' ? this.pollHtmlContent : '';
  }

  onContentChange(content: any): void {
    this.pollHtmlContent = content;
  }

  saveTranslation(): void {
    this.isLoading = true;
    const obj = {
      lang: this.lang,
      name: this.nameString,
      description: this.descriptionString,
      htmlContent: this.pollHtmlContent
    };
    this.pollService.updatePollTranslations(this.pollId, obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(re => {
        this.toastrService.success('Traducción actualizada satisfactoriamente.');
        this.valuesChanged.emit({
          name: this.nameString,
          description: this.descriptionString,
          htmlContent: this.pollHtmlContent,
          id: this.pollId, lang: this.lang
        });
      });
  }
}
