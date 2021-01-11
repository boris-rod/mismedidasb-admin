import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-value-measures',
  templateUrl: './value-measures.component.html',
  styleUrls: ['./value-measures.component.css']
})
export class ValueMeasuresComponent implements OnInit {
  @Input() userId: number;

  isLoading = true;

  values: any = [];
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
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
