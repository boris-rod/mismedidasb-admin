import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../users.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'details-wellness-measures',
  templateUrl: './details-wellness-measures.component.html',
  styleUrls: ['./details-wellness-measures.component.scss']
})
export class DetailsWellnessMeasuresComponent implements OnInit {

  @Input() userId: number;
  isLoading: boolean;

  values: any = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.isLoading = true;

    this.userService.getUserQuestionsAnswersByConcept(this.userId, 'welness-measures')
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.values = resp.result;
      }, error => {
      });

  }

}
