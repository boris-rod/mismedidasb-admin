import { Component, OnInit } from '@angular/core';
import { Poll } from '../../../core-mismes/models/poll';
import { PollsService } from '../../polls/polls.service';

@Component({
  selector: 'poll-translations',
  templateUrl: './poll-translations.component.html',
  styleUrls: ['./poll-translations.component.scss']
})
export class PollTranslationsComponent implements OnInit {
  polls: Poll[] = [];
  constructor(private pollService: PollsService) { }

  ngOnInit() {
    this.pollService.getAdminPolls().subscribe(resp => {
      this.polls = resp.body['result'];
    });
  }
  onTitleChanged(event: any) {
    const index = this.polls.findIndex(c => c.id === event.id);
    if (index !== -1) {
      if (event.lang === 'en') {
        this.polls[index].nameEN = event.name;
        this.polls[index].descriptionEN = event.description;
        this.polls[index].htmlContentEN = event.htmlContent;
      }
      else if (event.lang === 'it') {
        this.polls[index].nameIT = event.name;
        this.polls[index].descriptionIT = event.description;
        this.polls[index].htmlContentIT = event.htmlContent;
      }
      else {
        this.polls[index].name = event.name;
        this.polls[index].description = event.description;
        this.polls[index].htmlContent = event.htmlContent;
      }
      this.polls = [...this.polls];
    }
  }
}
