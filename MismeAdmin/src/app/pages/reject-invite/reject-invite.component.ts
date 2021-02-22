import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';
import { GroupsService } from '../groups/groups.service';

@Component({
  selector: 'app-reject-invite',
  templateUrl: './reject-invite.component.html',
  styleUrls: ['./reject-invite.component.css']
})
export class RejectInviteComponent implements OnInit {
  isLoading = false;
  hasError = false;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupsService,
    private messageService: NzMessageService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(param => {
      this.groupService.declineInvitation(param.token)
        .pipe(finalize(() => {
          this.isLoading = false;
        }))
        .subscribe(resp => {
          this.messageService.success('La invitación ha sido rechazada satisfactoriamente.');
        }, error => {
          this.hasError = true;
          this.messageService.error('La invitación ha caducado.');
        });
    });

  }
}
