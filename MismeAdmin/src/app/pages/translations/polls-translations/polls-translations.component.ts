import { Component, OnInit } from '@angular/core';
import { Poll } from 'src/app/core-mismes/models/poll';
import { PollsService } from '../../polls/polls.service';

@Component({
  selector: 'app-polls-translations',
  templateUrl: './polls-translations.component.html',
  styleUrls: ['./polls-translations.component.css']
})
export class PollsTranslationsComponent implements OnInit {

  polls: Poll[] = [];
  backupPolls: Poll[] = [];
  checked = false;
  constructor(private pollService: PollsService) { }

  ngOnInit(): void {
    this.pollService.getAdminPolls().subscribe(resp => {
      this.polls = resp.body.result;
    });
  }
  onTitleChanged(event: any): void {
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
      if (this.backupPolls && this.backupPolls.length > 0) {
        this.polls = this.polls.filter(t => !t.nameEN || t.nameEN === '' || !t.nameIT || t.nameIT === '');
      }
      this.polls = [...this.polls];
    }
  }
  onCheckedChange(event: any): void {
    if (event === true) {
      this.backupPolls = this.polls;
      this.polls = this.polls.filter(t => !t.nameEN || t.nameEN === '' || !t.nameIT || t.nameIT === '');
    }
    else {
      this.polls = [...this.backupPolls];
      this.backupPolls = [];
    }
  }

}
