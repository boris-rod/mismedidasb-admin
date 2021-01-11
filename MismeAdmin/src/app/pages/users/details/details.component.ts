import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { UserDetails } from 'src/app/core-mismes/models/user-details';
import { UsersService } from '../users.service';
import { User } from '../../../core-mismes/models/user';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  user: User;
  userDet: UserDetails;

  constructor(private usersService: UsersService, private modal: NzModalRef) { }

  ngOnInit(): void {
    this.usersService.getUserForDetailsView(this.user?.id)
      .pipe(finalize(() => { }))
      .subscribe(resp => {
        this.userDet = resp.result;
      }, error => { });
  }

  close(): void {
    this.modal.destroy();
  }

}
