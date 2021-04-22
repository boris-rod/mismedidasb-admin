import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-cancel-subscription',
  templateUrl: './cancel-subscription.component.html',
  styleUrls: ['./cancel-subscription.component.css']
})
export class CancelSubscriptionComponent implements OnInit {
  isLoading = false;
  hasError = false;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService,
    private messageService: NzMessageService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(param => {
      this.userService.unsubscribeEmail(param.token)
        .pipe(finalize(() => {
          this.isLoading = false;
        }))
        .subscribe(resp => {
          this.messageService.success('Subscripción vía email cancelada satisfactoriamente.');
        }, error => {
          this.hasError = true;
          this.messageService.error('El token ha caducado.');
        });
    });

  }
}
