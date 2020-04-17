import { Component, OnInit } from '@angular/core';
import { Tip } from '../../../core-mismes/models/tip';
import { TipsService } from './tips.service';

@Component({
  selector: 'tips-translations',
  templateUrl: './tips-translations.component.html',
  styleUrls: ['./tips-translations.component.scss']
})
export class TipsTranslationsComponent implements OnInit {
  tips: Tip[];
  constructor(private tipService: TipsService) { }

  ngOnInit() {
    this.tipService.getTips().subscribe(resp => {
      this.tips = resp.body['result'];
    });
  }
  onContentChanged(event: any) {
    const index = this.tips.findIndex(c => c.id === event.id);
    if (index !== -1) {
      if (event.lang === 'en') {
        this.tips[index].contentEN = event.content;
      }
      else if (event.lang === 'it') {
        this.tips[index].contentIT = event.content;
      }
      else {
        this.tips[index].content = event.content;
      }
      this.tips = [...this.tips];
    }
  }
}
