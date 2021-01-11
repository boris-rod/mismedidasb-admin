import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-wellness-measures',
  templateUrl: './wellness-measures.component.html',
  styleUrls: ['./wellness-measures.component.css']
})
export class WellnessMeasuresComponent implements OnInit {
  @Input() userId: number;
  isLoading: boolean;

  values: any = [];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
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
