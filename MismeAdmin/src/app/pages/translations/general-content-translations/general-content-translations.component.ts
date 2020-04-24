import { Component, OnInit } from '@angular/core';
import { GeneralContent } from '../../../core-mismes/models/general-content';
import { GeneralContentService } from './general-content.service';

@Component({
  selector: 'general-content-translations',
  templateUrl: './general-content-translations.component.html',
  styleUrls: ['./general-content-translations.component.scss']
})
export class GeneralContentTranslationsComponent implements OnInit {
  contents: GeneralContent[];
  backupContents: GeneralContent[];
  constructor(private generalContentService: GeneralContentService) { }

  ngOnInit() {
    this.generalContentService.getContents().subscribe(resp => {
      this.contents = resp.body['result'];
    });
  }
  onContentChanged(event: any) {
    const index = this.contents.findIndex(c => c.id === event.id);
    if (index !== -1) {
      if (event.lang === 'en') {
        this.contents[index].contentEN = event.content;
      }
      else if (event.lang === 'it') {
        this.contents[index].contentIT = event.content;
      }
      else {
        this.contents[index].content = event.content;
      }
      if (this.backupContents && this.backupContents.length > 0) {
        this.contents = this.contents.filter(t => !t.contentEN || t.contentEN === '' || !t.contentIT || t.contentIT === '');
      }

      this.contents = [...this.contents];
    }
  }

  onCheckedChange(event: any) {
    if (event === true) {
      this.backupContents = this.contents;
      this.contents = this.contents.filter(t => !t.contentEN || t.contentEN === '' || !t.contentIT || t.contentIT === '');
    }
    else {
      this.contents = [...this.backupContents];
      this.backupContents = [];
    }
  }


}
