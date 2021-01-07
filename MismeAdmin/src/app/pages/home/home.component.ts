import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsService } from 'src/app/core-mismes';
import { User } from 'src/app/core-mismes/models/user';
import { AuthenticationService } from '../../core-mismes/authentication/authentication.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isCollapsed = false;
  user: User;
  constructor(private router: Router, private authService: AuthenticationService,
    private credsService: CredentialsService,
    private modalService: NzModalService) { }

  ngOnInit(): void {
    this.user = this.credsService.credentials.account;
  }

  navigateHome(): void {
    this.router.navigateByUrl('home');
  }

  logout(): void {
    this.authService.logout().subscribe(res => {
      this.router.navigate(['/login'], { replaceUrl: true });
    });
  }

  changePassword(): void {
    this.modalService.create({
      nzTitle: 'Cambiar Contraseña',
      nzContent: ChangePasswordComponent,
      nzFooter: null
      // nzCancelText: 'Cancelar',
      // nzOkDisabled: true
    });
  }

}
