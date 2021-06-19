import { Component, OnInit } from '@angular/core';
import { Concept } from 'src/app/core-mismes/models/concept';
import { ConceptsService } from '../../concepts/concepts.service';

@Component({
  selector: 'app-concepts-translations',
  templateUrl: './concepts-translations.component.html',
  styleUrls: ['./concepts-translations.component.css']
})
export class ConceptsTranslationsComponent implements OnInit {
  concepts: Concept[] = [];
  backupConcepts: Concept[] = [];

  checked = false;

  constructor(private concetpService: ConceptsService) { }

  ngOnInit(): void {
    this.concetpService.getAdminConcepts().subscribe(resp => {
      this.concepts = resp.body.result;
    });
  }
  onTitleChanged(event: any): void {
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

  onCheckedChange(event: any): void {
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
