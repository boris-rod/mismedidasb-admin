import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS, NbAuthResult } from '@nebular/auth';
import { Router } from '@angular/router';
import { AuthenticationService, LoginContext } from '../../core-mismes/authentication/authentication.service';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../core-mismes';
import { NbToastrService } from '@nebular/theme';

const log = new Logger('Login');

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent implements OnInit {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  rememberMe = false;

  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router, private authenticationService: AuthenticationService,
    private toastrService: NbToastrService) {

    super(service, options, cd, router);

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
    this.rememberMe = this.getConfigValue('forms.login.rememberMe');
  }

  ngOnInit() { }
  login(): void {

    this.errors = [];
    this.messages = [];
    this.submitted = true;

    const loginContext: LoginContext = {
      password: this.user.password,
      username: this.user.email,
      remember: this.user.rememberMe
    };
    this.authenticationService.login(loginContext)
      .pipe(
        finalize(() => {
          this.submitted = false;
        })
      )
      .subscribe(
        credentials => {

          if (credentials.role.toLowerCase() !== 'admin') {
            this.toastrService.danger('Solo usuarios con permiso de administración pueden acceder.', 'Autenticación');
          }

          log.debug(`${credentials} successfully logged in`);
          this.router.navigate(['/'], { replaceUrl: true });
        },
        error => {
          // if (error === 'Unauthorized access.') {
          this.toastrService.danger('Usuario o contraseña incorrecta.', 'Autenticación');
          // }
          // else if (error === 'User Not found.') {
          //   this.toastrService.danger('Usuario incorrecto.', 'Autenticación');
          // }
        }
      );




    // this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
    //   this.submitted = false;

    //   if (result.isSuccess()) {
    //     this.messages = result.getMessages();
    //   } else {
    //     this.errors = result.getErrors();
    //   }

    //   const redirect = result.getRedirect();
    //   if (redirect) {
    //     setTimeout(() => {
    //       return this.router.navigateByUrl(redirect);
    //     }, this.redirectDelay);
    //   }
    //   this.cd.detectChanges();
    // });
  }



}
