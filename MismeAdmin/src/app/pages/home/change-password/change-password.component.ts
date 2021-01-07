import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs/operators';
import { Logger } from 'src/app/core-mismes';
import { HomeService } from '../home.service';

const log = new Logger('Change Pass');
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  oldPasswordVisible = false;
  newPasswordVisible = false;
  newPasswordConfirmVisible = false;

  isLoading = false;
  oldPass = new FormControl();
  newPass = new FormControl();
  confirmPass = new FormControl();

  constructor(private modal: NzModalRef,
    private homeService: HomeService,
    private message: NzMessageService) {
    this.oldPass.setValidators(Validators.required);
    this.oldPass.setValue('');

    this.newPass.setValidators([Validators.required,
    RxwebValidators.password({ validation: { minLength: 6, digit: true, specialCharacter: true, upperCase: true } })]);
    this.newPass.setValue('');

    this.confirmPass.setValidators([Validators.required]);
    this.confirmPass.setValue('');
  }

  ngOnInit(): void {
  }
  close(): void {
    this.modal.destroy();
  }
  changePassword(): void {
    this.isLoading = true;
    const changePass = {
      oldPassword: this.oldPass.value,
      newPassword: this.newPass.value,
      confirmPassword: this.confirmPass.value
    };

    this.homeService.changePass(changePass)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.message.create('success', 'Contraseña actualizada satisfactoriamente.');
        this.close();
      }, error => {
        log.error(error);
        this.message.create('error', 'Ha ocurrido un error actualizando la contraseña.');
      });
  }

}
