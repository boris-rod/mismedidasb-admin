import { Component, OnInit } from '@angular/core';
import { PersonalData } from '../../core-mismes/models/personal-data';
import { PersonalDataService } from './personal-data.service';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../core-mismes';

const log = new Logger('PData');

@Component({
  selector: 'personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  perPage: number = 10;
  isLoading: boolean = false;
  results: PersonalData[];
  constructor(private pDataService: PersonalDataService) { }

  ngOnInit() {
    this.loadPDatas();
  }

  loadPDatas() {
    this.isLoading = true;

    this.pDataService.getPDatas()
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.results = resp.body['result'];
        log.info(this.results);
      }, error => {
        log.error(error);
      });
  }


}
