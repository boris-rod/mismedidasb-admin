import { Component, OnInit } from '@angular/core';
import { ConceptService } from './concept.service';
import { Concept } from '../../core-mismes/models/concept';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../core-mismes/logger.service';

const log = new Logger('Concept list');
@Component({
  selector: 'concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss']
})
export class ConceptComponent implements OnInit {
  perPage: number = 10;
  isLoading: boolean = false;
  results: Concept[];
  constructor(private conceptService: ConceptService) { }

  ngOnInit() {
    this.loadData();

  }

  loadData() {
    this.isLoading = true;
    this.conceptService.getConcepts()
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.results = resp.body['result'];
      }, error => {
        log.error(error);
      });
  }
}
