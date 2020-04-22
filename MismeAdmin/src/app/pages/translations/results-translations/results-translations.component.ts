import { Component, OnInit } from '@angular/core';
import { Result } from '../../../core-mismes/models/result';
import { ResultService } from './result.service';

@Component({
  selector: 'results-translations',
  templateUrl: './results-translations.component.html',
  styleUrls: ['./results-translations.component.scss']
})
export class ResultsTranslationsComponent implements OnInit {
  results: Result[];
  backupResults: Result[];
  constructor(private resultService: ResultService) { }

  ngOnInit() {
    this.resultService.getResults().subscribe(resp => {
      this.results = resp.body['result'];
    });
  }
  onContentChanged(event: any) {
    const index = this.results.findIndex(c => c.id === event.id);
    if (index !== -1) {
      if (event.lang === 'en') {
        this.results[index].textEN = event.text;
      }
      else if (event.lang === 'it') {
        this.results[index].textIT = event.text;
      }
      else {
        this.results[index].text = event.text;
      }
      if (this.backupResults && this.backupResults.length > 0) {
        this.results = this.results.filter(t => !t.textEN || t.textEN === '' || !t.textIT || t.textIT === '');
      }

      this.results = [...this.results];
    }
  }

  onCheckedChange(event: any) {
    if (event === true) {
      this.backupResults = this.results;
      this.results = this.results.filter(t => !t.textEN || t.textEN === '' || !t.textIT || t.textIT === '');
    }
    else {
      this.results = [...this.backupResults];
      this.backupResults = [];
    }
  }


}
