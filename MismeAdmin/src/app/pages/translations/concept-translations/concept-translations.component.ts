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
  backupConcepts: Concept[] = [];
  constructor(private concetpService: ConceptService) { }

  ngOnInit() {
    this.concetpService.getAdminConcepts().subscribe(resp => {
      this.concepts = resp.body['result'];
    });
  }
  onTitleChanged(event: any) {
    const index = this.concepts.findIndex(c => c.id === event.id);
    if (index !== -1) {
      if (event.lang === 'en') {
        this.concepts[index].titleEN = event.title;
      }
      else if (event.lang === 'it') {
        this.concepts[index].titleIT = event.title;
      }
      else {
        this.concepts[index].title = event.title;
      }
      if (this.backupConcepts && this.backupConcepts.length > 0) {
        this.concepts = this.concepts.filter(t => !t.titleEN || t.titleEN === '' || !t.titleIT || t.titleIT === '');
      }
      this.concepts = [...this.concepts];
    }
  }

  onCheckedChange(event: any) {
    if (event === true) {
      this.backupConcepts = this.concepts;
      this.concepts = this.concepts.filter(t => !t.titleEN || t.titleEN === '' || !t.titleIT || t.titleIT === '');
    }
    else {
      this.concepts = [...this.backupConcepts];
      this.backupConcepts = [];
    }
  }
}