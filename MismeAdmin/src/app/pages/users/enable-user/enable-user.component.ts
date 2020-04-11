import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { DisableUserComponent } from '../disable-user/disable-user.component';
import { NbToastrService, NbDialogRef } from '@nebular/theme';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'enable-user',
  templateUrl: './enable-user.component.html',
  styleUrls: ['./enable-user.component.scss']
})
export class EnableUserComponent implements OnInit {

  userId: number;
  isLoading: boolean = false;

  constructor(private userService: UserService,
    protected ref: NbDialogRef<EnableUserComponent>,
    private toastrService: NbToastrService) { }

  ngOnInit() {
  }

  enable() {
    this.isLoading = true;
    this.userService.enableUser(this.userId)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.toastrService.success('Usario habilitado satisfactoriamente.', 'Habilitar Usuario');
        this.ref.close();
      });
  }

  dismiss() {
    this.ref.close();
  }

}
