import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GeneralContentService } from '../general-content.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-general-content-for-translation',
  templateUrl: './general-content-for-translation.component.html',
  styleUrls: ['./general-content-for-translation.component.css']
})
export class GeneralContentForTranslationComponent implements OnInit {
  isLoading = false;
  @Input() contentId: number;
  @Input() lang: string;
  @Input() content: string;

  @Output() valuesChanged = new EventEmitter<any>();

  contentString = '';

  constructor(private contentService: GeneralContentService,
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
    this.contentService.updateContentsTranslations(this.contentId, obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(re => {
        this.toastrService.success('Traducción actualizada satisfactoriamente.');
        // if (this.lang === 'es') {
        this.valuesChanged.emit({ content: this.contentString, id: this.contentId, lang: this.lang });
        // }
      });

  }

}
