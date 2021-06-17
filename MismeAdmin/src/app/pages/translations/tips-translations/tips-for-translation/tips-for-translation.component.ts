import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TipsService } from '../tips.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tips-for-translation',
  templateUrl: './tips-for-translation.component.html',
  styleUrls: ['./tips-for-translation.component.css']
})
export class TipsForTranslationComponent implements OnInit {

  isLoading = false;
  @Input() tipId: number;
  @Input() lang: string;
  @Input() content: string;

  @Output() valuesChanged = new EventEmitter<any>();

  contentString = '';
  constructor(private tipService: TipsService,
    private toastrService: NzMessageService) { }

  ngOnInit(): void {
    this.contentString = this.content ? this.content : '';
  }

  saveTranslation(): void {
    this.isLoading = true;
    const obj = {
      lang: this.lang,
      content: this.contentString
    };
    this.tipService.updateTipTranslations(this.tipId, obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(re => {
        this.toastrService.success('Traducción actualizada satisfactoriamente.');
        // if (this.lang === 'es') {
        this.valuesChanged.emit({ content: this.contentString, id: this.tipId, lang: this.lang });
        // }
      });

  }

}
