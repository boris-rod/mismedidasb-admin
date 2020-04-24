import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GeneralContentService } from '../general-content.service';
import { NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'content-form-translate',
  templateUrl: './content-form-translate.component.html',
  styleUrls: ['./content-form-translate.component.scss']
})
export class ContentFormTranslateComponent implements OnInit {
  isLoading = false;
  @Input() contentId: number;
  @Input() lang: string;
  @Input() content: string;

  @Output() valuesChanged = new EventEmitter<any>();

  constructor(private contentService: GeneralContentService,
    private toastrService: NbToastrService) { }

  ngOnInit() {
    if (!this.content) {
      this.content = '';
    }
  }

  onContentChange(content: any) {
    this.content = content;
  }
  saveTranslation() {
    this.isLoading = true;
    const obj = {
      'lang': this.lang,
      'content': this.content
    };
    this.contentService.updateContentsTranslations(this.contentId, obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(re => {
        this.toastrService.success('Traducción actualizada satisfactoriamente.', 'Contenido General');
        // if (this.lang === 'es') {
        this.valuesChanged.emit({ 'content': this.content, 'id': this.contentId, 'lang': this.lang });
        // }
      });

  }

}
