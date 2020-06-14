import { Component, OnInit } from '@angular/core';
import { User } from '../../../core-mismes/models/user';
import { NbDialogRef } from '@nebular/theme';
import { UserDetails } from '../../../core-mismes/models/user-details';
import { UserService } from '../users.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.scss']
})
export class DetailsUserComponent implements OnInit {
  user: User;
  userDet: UserDetails;

  constructor(private userService: UserService,
    protected ref: NbDialogRef<DetailsUserComponent>) { }

  ngOnInit() {
    this.userService.getUserForDetailsView(this.user.id)
      .pipe(finalize(() => { }))
      .subscribe(resp => {
        this.userDet = resp['result'];
        console.log(this.userDet);
      }, error => { });
  }

  dismiss() {
    this.ref.close();
  }
}
