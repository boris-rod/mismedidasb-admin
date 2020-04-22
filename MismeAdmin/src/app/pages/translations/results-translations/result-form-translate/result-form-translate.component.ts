import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ResultService } from '../result.service';
import { NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'result-form-translate',
  templateUrl: './result-form-translate.component.html',
  styleUrls: ['./result-form-translate.component.scss']
})
export class ResultFormTranslateComponent implements OnInit {
  isLoading = false;
  @Input() resultId: number;
  @Input() lang: string;
  @Input() text: string;

  @Output() valuesChanged = new EventEmitter<any>();

  textControl = new FormControl();
  constructor(private resultService: ResultService,
    private toastrService: NbToastrService) { }

  ngOnInit() {
    this.textControl.setValue(this.text ? this.text : '');
    this.textControl.setValidators(Validators.required);
  }

  saveTranslation() {
    this.isLoading = true;
    const obj = {
      'lang': this.lang,
      'text': this.textControl.value
    };
    this.resultService.updateResultTranslations(this.resultId, obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(re => {
        this.toastrService.success('Traducción actualizada satisfactoriamente.', 'Traducir Resultado');
        // if (this.lang === 'es') {
        this.valuesChanged.emit({ 'text': this.textControl.value, 'id': this.resultId, 'lang': this.lang });
        // }
      });

  }

}
