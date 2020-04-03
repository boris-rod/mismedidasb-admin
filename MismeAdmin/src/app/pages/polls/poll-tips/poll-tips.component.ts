import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { Poll } from '../../../core-mismes/models/poll';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { PollsService } from '../polls.service';
import { Tip } from '../../../core-mismes/models/tip';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'poll-tips',
  templateUrl: './poll-tips.component.html',
  styleUrls: ['./poll-tips.component.scss']
})
export class PollTipsComponent implements OnInit {
  title = '';
  poll: Poll;
  top: Tip[] = [];
  bottom: Tip[] = [];
  selectedTip: Tip;

  tipName = '';

  showInput = false;
  tipToDelete = 0;

  @ViewChild('tipTitleElement', { static: false }) tipTitleElement!: ElementRef;

  constructor(private ref: NbDialogRef<PollTipsComponent>,
    private pollsService: PollsService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService) {

  }

  ngOnInit() {
    this.top = this.poll.tips.filter(t => t.tipPosition === 0);
    this.bottom = this.poll.tips.filter(t => t.tipPosition === 1);
  }

  dismiss() {
    this.ref.close();
  }

  newTip(position: number) {
    // 0 top
    // 1 bottom
    const t = {
      pollId: this.poll.id,
      content: 'Tip',
      isActive: false,
      tipPosition: position
    };

    this.pollsService.addTip(t)
      .pipe(finalize(() => { }))
      .subscribe(not => {
        this.toastrService.success('Consejo creado satisfactoriamente.', 'Consejo');
        this.poll.tips = [...this.poll.tips, not['result']];
        if (position === 0) {
          this.top = [...this.top, not['result']];
        }
        else {
          this.bottom = [...this.bottom, not['result']];
        }
      },
      );
  }
  activeTip(t: Tip, position: number) {
    this.pollsService.activateTip(t.id, this.poll.id, position)
      .pipe(finalize(() => { }))
      .subscribe(not => {
        this.toastrService.success('Consejo activado satisfactoriamente.', 'Consejo');
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

  deleteTip(t: Tip, dialog: TemplateRef<any>, position: number) {
    this.tipToDelete = t.id;
    this.dialogService.open(dialog, {
    }).onClose.subscribe(s => {
      const ind = this.poll.tips.findIndex(ti => ti.id === t.id);
      if (ind > -1) {
        this.poll.tips.splice(ind, 1);
        this.poll.tips = [...this.poll.tips];
      }

      if (position === 0) {
        const ind = this.top.findIndex(ti => ti.id === t.id);
        if (ind > -1) {
          this.top.splice(ind, 1);
          this.top = [...this.top];
        }
      } else {
        const ind = this.bottom.findIndex(ti => ti.id === t.id);
        if (ind > -1) {
          this.bottom.splice(ind, 1);
          this.bottom = [...this.bottom];
        }
      }

    });
  }

  deleteTipDialog(ref: NbDialogRef<any>) {
    this.pollsService.deleteTip(this.tipToDelete)
      .pipe(finalize(() => {
      })).subscribe(d => {
        this.tipToDelete = 0;
        this.toastrService.success('Consejo eliminado satisfactoriamente.', 'Eliminar Consejo');
        ref.close();
      });
  }
  dismissDeleteTip(ref: NbDialogRef<any>) {
    ref.close();
  }

  inlineEdition(t: Tip) {
    this.selectedTip = t;
    this.tipName = t.content;
    this.showInput = true;
    setTimeout(() => {
      this.tipTitleElement.nativeElement.focus();
    }, 0);
  }

  hideInput(position: number) {
    if (this.tipName !== '') {
      this.showInput = false;
      if (this.selectedTip.content !== this.tipName) {
        this.selectedTip.content = this.tipName;
        this.pollsService.updateTipContent(this.selectedTip.id, this.selectedTip.content)
          .pipe(finalize(() => {

          }))
          .subscribe(not => {
            this.toastrService.success('Consejo actualizado satisfactoriamente.', 'Consejo');


            const ind = this.poll.tips.findIndex(ti => ti.id === not.id);
            if (ind > -1) {
              this.poll.tips[ind].content = this.selectedTip.content;
              this.poll.tips = [...this.poll.tips];
            }

            if (position === 0) {
              const ind = this.top.findIndex(ti => ti.id === not.id);
              if (ind > -1) {
                this.top[ind].content = this.selectedTip.content;
                this.top = [...this.top];
              }
            } else {
              const ind = this.bottom.findIndex(ti => ti.id === not.id);
              if (ind > -1) {
                this.bottom[ind].content = this.selectedTip.content;
                this.bottom = [...this.bottom];
              }
            }
          },
          );
      }
    }
  }
}
