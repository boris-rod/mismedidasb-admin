import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { TipsService } from '../tips.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'tips-form-translation',
  templateUrl: './tips-form-translation.component.html',
  styleUrls: ['./tips-form-translation.component.scss']
})
export class TipsFormTranslationComponent implements OnInit {
  isLoading = false;
  @Input() tipId: number;
  @Input() lang: string;
  @Input() content: string;

  @Output() valuesChanged = new EventEmitter<any>();

  contentControl = new FormControl();
  constructor(private tipService: TipsService,
    private toastrService: NbToastrService) { }

  ngOnInit() {
    this.contentControl.setValue(this.content ? this.content : '');
  }

  saveTranslation() {
    this.isLoading = true;
    const obj = {
      'lang': this.lang,
      'content': this.contentControl.value
    };
    this.tipService.updateTipTranslations(this.tipId, obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(re => {
        this.toastrService.success('Traducción actualizada satisfactoriamente.', 'Traducir Consejo');
        // if (this.lang === 'es') {
        this.valuesChanged.emit({ 'content': this.contentControl.value, 'id': this.tipId, 'lang': this.lang });
        // }
      });

  }
}
