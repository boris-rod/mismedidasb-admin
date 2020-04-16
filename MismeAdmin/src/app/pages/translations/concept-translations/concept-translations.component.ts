import { Component, OnInit } from '@angular/core';
import { ConceptService } from '../../concept/concept.service';
import { Concept } from '../../../core-mismes/models/concept';

@Component({
  selector: 'concept-translations',
  templateUrl: './concept-translations.component.html',
  styleUrls: ['./concept-translations.component.scss']
})
export class ConceptTranslationsComponent implements OnInit {
  concepts: Concept[] = [];
  constructor(private concetpService: ConceptService) { }

  ngOnInit() {
    this.concetpService.getAdminConcepts().subscribe(resp => {
      this.concepts = resp.body['result'];
    });
  }
  onTitleChanged(event: any) {
    const index = this.concepts.findIndex(c => c.id === event.id);
    if (index !== -1) {
      this.concepts[index].title = event.title;
      this.concepts = [...this.concepts];
    }
  }
}
