import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs/operators';
import { Poll } from 'src/app/core-mismes/models/poll';
import { Tip } from 'src/app/core-mismes/models/tip';
import { PollsService } from '../polls.service';
import { QuestionsService } from '../questions.services';

@Component({
  selector: 'app-poll-tips',
  templateUrl: './poll-tips.component.html',
  styleUrls: ['./poll-tips.component.css']
})
export class PollTipsComponent implements OnInit {
  poll: Poll;
  top: Tip[] = [];
  bottom: Tip[] = [];
  // selectedTip: Tip;

  tipName = '';
  isLoading = false;

  constructor(private modal: NzModalRef,
    private pollService: PollsService,
    private messageService: NzMessageService,
    private modalService: NzModalService) { }

  ngOnInit(): void {
    this.top = this.poll.tips.filter(t => t.tipPosition === 0);
    this.bottom = this.poll.tips.filter(t => t.tipPosition === 1);
  }

  close(): void {
    this.modal.destroy(true);
  }

  newTip(position: number): void {
    // 0 top
    // 1 bottom
    const t = {
      pollId: this.poll.id,
      content: 'Tip',
      isActive: false,
      tipPosition: position
    };

    this.pollService.addTip(t)
      .pipe(finalize(() => { }))
      .subscribe(not => {
        // this.toastrService.success('Consejo creado satisfactoriamente.', 'Consejo');
        this.messageService.success('Consejo creado satisfactoriamente.');
        this.poll.tips = [...this.poll.tips, not.result];
        if (position === 0) {
          this.top = [...this.top, not.result];
        }
        else {
          this.bottom = [...this.bottom, not.result];
        }
      },
      );
  }

  activeTip(t: Tip, position: number): void {
    this.pollService.activateTip(t.id, this.poll.id, position)
      .pipe(finalize(() => { }))
      .subscribe(not => {
        // this.toastrService.success('Consejo activado satisfactoriamente.', 'Consejo');
        this.messageService.success('Consejo activado satisfactoriamente.');
        const pollTips = this.poll.tips.filter(ti => ti.tipPosition === position);
        pollTips.forEach(ti => {
          if (ti.id !== t.id) {
            ti.isActive = false;
          } else {
            ti.isActive = true;
          }
          this.top = [...this.top];
        });
        this.poll.tips = [...this.poll.tips];

        if (position === 0) {
          this.top.forEach(ti => {
            if (ti.id !== t.id) {
              ti.isActive = false;
            } else {
              ti.isActive = true;
            }
            this.top = [...this.top];
          });
        }
        else {
          this.bottom.forEach(ti => {
            if (ti.id !== t.id) {
              ti.isActive = false;
            } else {
              ti.isActive = true;
            }
            this.bottom = [...this.bottom];

          });
        }
      },
      );
  }

  deleteTip(t: Tip, position: number): void {
    this.isLoading = true;
    this.pollService.deleteTip(t.id)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.messageService.success('Consejo eliminado satisfactoriamente.');
        let ind = this.poll.tips.findIndex(ti => ti.id === t.id);
        if (ind > -1) {
          this.poll.tips.splice(ind, 1);
          this.poll.tips = [...this.poll.tips];
        }

        if (position === 0) {
          ind = this.top.findIndex(ti => ti.id === t.id);
          if (ind > -1) {
            this.top.splice(ind, 1);
            this.top = [...this.top];
          }
        } else {
          ind = this.bottom.findIndex(ti => ti.id === t.id);
          if (ind > -1) {
            this.bottom.splice(ind, 1);
            this.bottom = [...this.bottom];
          }
        }

      });
  }
  contentChange(q: Tip, position: number): void {
    this.pollService.updateTipContent(q.id, q.content)
      .pipe(finalize(() => {

      }))
      .subscribe(not => {
        // this.toastrService.success('Consejo actualizado satisfactoriamente.', 'Consejo');
        this.messageService.success('Consejo actualizado satisfactoriamente.');

        let ind = this.poll.tips.findIndex(ti => ti.id === not.id);
        if (ind > -1) {
          this.poll.tips[ind].content = q.content;
          this.poll.tips = [...this.poll.tips];
        }

        if (position === 0) {
          ind = this.top.findIndex(ti => ti.id === not.id);
          if (ind > -1) {
            this.top[ind].content = q.content;
            this.top = [...this.top];
          }
        } else {
          ind = this.bottom.findIndex(ti => ti.id === not.id);
          if (ind > -1) {
            this.bottom[ind].content = q.content;
            this.bottom = [...this.bottom];
          }
        }
      },
      );

  }
}
