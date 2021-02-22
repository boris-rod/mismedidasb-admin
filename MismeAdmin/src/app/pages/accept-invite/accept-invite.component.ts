import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';
import { GroupsService } from '../groups/groups.service';

@Component({
  selector: 'app-accept-invite',
  templateUrl: './accept-invite.component.html',
  styleUrls: ['./accept-invite.component.css']
})
export class AcceptInviteComponent implements OnInit {
  isLoading = false;
  hasError = false;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupsService,
    private messageService: NzMessageService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(param => {
      this.groupService.acceptInvitation(param.token)
        .pipe(finalize(() => {
          this.isLoading = false;
        }))
        .subscribe(resp => {
          this.messageService.success('La invitación ha sido aceptada satisfactoriamente.');
        }, error => {
          this.hasError = true;
          this.messageService.error('La invitación ha caducado.');
        });
    });

  }
}
