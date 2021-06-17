import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResultService } from '../result.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-results-for-translation',
  templateUrl: './results-for-translation.component.html',
  styleUrls: ['./results-for-translation.component.css']
})
export class ResultsForTranslationComponent implements OnInit {

  isLoading = false;
  @Input() resultId: number;
  @Input() lang: string;
  @Input() text: string;

  @Output() valuesChanged = new EventEmitter<any>();

  contentString = '';

  constructor(private resultService: ResultService,
    private toastrService: NzMessageService) { }

  ngOnInit(): void {
    this.contentString = this.text ? this.text : '';
  }

  saveTranslation(): void {
    this.isLoading = true;
    const obj = {
      lang: this.lang,
      text: this.contentString
    };
    this.resultService.updateResultTranslations(this.resultId, obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(re => {
        this.toastrService.success('Traducción actualizada satisfactoriamente.');
        // if (this.lang === 'es') {
        this.valuesChanged.emit({ text: this.contentString, id: this.resultId, lang: this.lang });
        // }
      });

  }

}
