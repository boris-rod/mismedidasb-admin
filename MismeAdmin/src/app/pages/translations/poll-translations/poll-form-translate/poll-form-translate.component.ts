import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PollsService } from '../../../polls/polls.service';
import { NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'poll-form-translate',
  templateUrl: './poll-form-translate.component.html',
  styleUrls: ['./poll-form-translate.component.scss']
})
export class PollFormTranslateComponent implements OnInit {

  isLoading = false;
  @Input() pollId: number;
  @Input() lang: string;
  @Input() pollName: string;
  @Input() pollDescription: string;
  @Input() pollHtmlContent: string;
  @Input() pollReadOnly: boolean;

  @Output() valuesChanged = new EventEmitter<any>();

  nameControl = new FormControl();
  descriptionControl = new FormControl();

  constructor(private pollService: PollsService,
    private toastrService: NbToastrService) {

  }

  ngOnInit() {
    if (!this.pollHtmlContent) {
      this.pollHtmlContent = '';
    }
    this.nameControl.setValue(this.pollName && this.pollName !== '' ? this.pollName : '');
    this.descriptionControl.setValue(this.pollDescription && this.pollDescription !== '' ? this.pollDescription : '');
  }

  onContentChange(content: any) {
    this.pollHtmlContent = content;
  }

  saveTranslation() {
    this.isLoading = true;
    const obj = {
      'lang': this.lang,
      'name': this.nameControl.value,
      'description': this.descriptionControl.value,
      'htmlContent': this.pollHtmlContent
    };
    this.pollService.updatePollTranslations(this.pollId, obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(re => {
        this.toastrService.success('Traducción actualizada satisfactoriamente.', 'Traducir Cuestionario');
        this.valuesChanged.emit({
          'name': this.nameControl.value,
          'description': this.descriptionControl.value,
          'htmlContent': this.pollHtmlContent,
          'id': this.pollId, 'lang': this.lang
        });
      });
  }
}
