import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthenticationService, Logger, LoginContext } from 'src/app/core-mismes';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CredentialsService } from '../../core-mismes/authentication/credentials.service';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    this.loading = true;
    const loginContext: LoginContext = {
      password: this.validateForm.value.password,
      username: this.validateForm.value.userName,
      remember: this.validateForm.value.remember
    };
    this.authenticationService.login(loginContext)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        credentials => {
          const role = this.credentialsService.getCurrentUserRole();
          if (role.toLowerCase() !== 'admin' && role.toLowerCase() !== 'group_admin') {
            // if (credentials.role.toLowerCase() !== 'admin') {
            this.message.create('error', 'Solo usuarios con permiso de administración pueden acceder.');
          }
          this.router.navigate(['/'], { replaceUrl: true });
        },
        error => {
          this.message.create('error', 'Usuario o contraseña incorrecta.');
        }
      );
  }
}
