import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Concept } from 'src/app/core-mismes/models/concept';
import { ConceptsService } from './concepts.service';
import { Logger } from '../../core-mismes/logger.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditComponent } from './edit/edit.component';

const log = new Logger('concepts');
@Component({
  selector: 'app-concepts',
  templateUrl: './concepts.component.html',
  styleUrls: ['./concepts.component.css']
})
export class ConceptsComponent implements OnInit {

  perPage = 10;
  isLoading = false;
  results: Concept[];

  constructor(private conceptService: ConceptsService, private modalService: NzModalService) { }

  ngOnInit(): void {
    this.loadData();

  }

  loadData(): void {
    this.isLoading = true;
    this.conceptService.getConcepts()
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.results = resp.body.result;
      }, error => {
        log.error(error);
      });
  }

  edit(concept: Concept): void {
    this.modalService.create({
      nzTitle: 'Editar Concepto',
      nzContent: EditComponent,
      nzFooter: null,
      // nzWidth: 1000,
      // nzBodyStyle: { height: '500px', 'overflow-y': 'auto' },
      nzComponentParams: {
        conceptToEdit: concept
      }
    });
  }
}
