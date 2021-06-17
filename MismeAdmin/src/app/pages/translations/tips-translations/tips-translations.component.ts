import { Component, OnInit } from '@angular/core';
import { Tip } from 'src/app/core-mismes/models/tip';
import { TipsService } from './tips.service';

@Component({
  selector: 'app-tips-translations',
  templateUrl: './tips-translations.component.html',
  styleUrls: ['./tips-translations.component.css']
})
export class TipsTranslationsComponent implements OnInit {
  tips: Tip[];
  backupTips: Tip[];
  checked = false;

  constructor(private tipService: TipsService) { }

  ngOnInit(): void {
    this.tipService.getTips().subscribe(resp => {
      this.tips = resp.body.result;
    });
  }
  onContentChanged(event: any): void {
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
      if (this.backupTips && this.backupTips.length > 0) {
        this.tips = this.tips.filter(t => !t.contentEN || t.contentEN === '' || !t.contentIT || t.contentIT === '');
      }

      this.tips = [...this.tips];
    }
  }

  onCheckedChange(event: any): void {
    if (event === true) {
      this.backupTips = this.tips;
      this.tips = this.tips.filter(t => !t.contentEN || t.contentEN === '' || !t.contentIT || t.contentIT === '');
    }
    else {
      this.tips = [...this.backupTips];
      this.backupTips = [];
    }
  }
}
