import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'disable-user',
  templateUrl: './disable-user.component.html',
  styleUrls: ['./disable-user.component.scss']
})
export class DisableUserComponent implements OnInit {
  userId: number;
  isLoading: boolean = false;

  constructor(private userService: UserService,
    protected ref: NbDialogRef<DisableUserComponent>,
    private toastrService: NbToastrService) { }

  ngOnInit() {
  }

  disable() {
    this.isLoading = true;
    this.userService.disableUser(this.userId)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.toastrService.success('Usario deshabilitado satisfactoriamente.', 'Deshabilitar Usuario');
        this.ref.close();
      });
  }

  dismiss() {
    this.ref.close();
  }

}
