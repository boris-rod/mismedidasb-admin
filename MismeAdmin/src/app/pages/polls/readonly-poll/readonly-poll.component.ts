import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Poll } from '../../../core-mismes/models/poll';
import { NbDialogRef } from '@nebular/theme';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'readonly-poll',
  templateUrl: './readonly-poll.component.html',
  styleUrls: ['./readonly-poll.component.scss']
})
export class ReadonlyPollComponent implements OnInit, AfterViewInit {
  title = '';
  poll: Poll;
  text = '<span style="font-weight: bold;">hello</span>';
  constructor(private ref: NbDialogRef<ReadonlyPollComponent>, private locationStrategy: LocationStrategy) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  save() { }

  dismiss() {
    this.ref.close();
  }

  onContentChange(content: string) {
    console.log(content);
  }
}
