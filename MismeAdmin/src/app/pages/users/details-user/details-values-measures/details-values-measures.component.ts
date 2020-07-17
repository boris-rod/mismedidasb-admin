import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../users.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'details-values-measures',
  templateUrl: './details-values-measures.component.html',
  styleUrls: ['./details-values-measures.component.scss']
})
export class DetailsValuesMeasuresComponent implements OnInit {

  @Input() userId: number;
  isLoading: boolean;

  values: any = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.isLoading = true;

    this.userService.getUserQuestionsAnswersByConcept(this.userId, 'value-measures')
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.values = resp.result;
      }, error => {
      });

  }

}
