import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ThemeService } from '../../theme.service';
import { NbToastrService, NbWindowRef, NbDialogRef } from '@nebular/theme';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../../core-mismes';

const log = new Logger('Change Pass');
@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  title: string = '';
  isLoading: boolean = false;
  oldPass = new FormControl();
  newPass = new FormControl();
  confirmPass = new FormControl();

  constructor(private themeService: ThemeService, private toastrService: NbToastrService, protected ref: NbDialogRef<ChangePasswordComponent>) {
    this.oldPass.setValidators(Validators.required);
    this.oldPass.setValue('');

    this.newPass.setValidators([Validators.required,
    RxwebValidators.password({ validation: { minLength: 6, digit: true, specialCharacter: true, upperCase: true } })]);
    this.newPass.setValue('');

    this.confirmPass.setValidators([Validators.required]);
    this.confirmPass.setValue('');

  }

  ngOnInit() {
  }

  changePass() {
    this.isLoading = true;
    const changePass = {
      oldPassword: this.oldPass.value,
      newPassword: this.newPass.value,
      confirmPassword: this.confirmPass.value
    };

    this.themeService.changePass(changePass)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.toastrService.success('Contraseña actualizada satisfactoriamente.', 'Cambiar Contraseña');
        this.newPass.setValue('');
        this.oldPass.setValue('');
        this.confirmPass.setValue('');
        this.ref.close();
      }, error => {
        this.toastrService.danger('Ha ocurrido un error actualizando la contraseña.', 'Cambiar Contraseña');
        log.error(error);
      });
  }
  close() {
    this.ref.close();
  }
}
