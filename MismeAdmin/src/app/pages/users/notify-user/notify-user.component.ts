import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'notify-user',
  templateUrl: './notify-user.component.html',
  styleUrls: ['./notify-user.component.scss']
})
export class NotifyUserComponent implements OnInit {
  userId: number;
  isLoading: boolean = false;

  title = new FormControl();
  body = new FormControl();

  constructor(private userService: UserService,
    protected ref: NbDialogRef<NotifyUserComponent>,
    private toastrService: NbToastrService) {

    this.title.setValidators(Validators.required);
    this.title.setValue('');

    this.body.setValue('');
  }

  ngOnInit() {
  }

  send() {
    this.isLoading = true;
    const obj = {
      title: this.title.value,
      body: this.body.value
    };
    this.userService.notify(this.userId, obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.toastrService.success('Usario notificado satisfactoriamente.', 'Notificar Usuario');
        this.ref.close();
      });
  }

  dismiss() {
    this.ref.close();
  }
}
