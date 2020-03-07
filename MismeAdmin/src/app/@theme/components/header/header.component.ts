import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbMenuItem, NbWindowService, NbDialogService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MenuItemEnum } from '../../../core-mismes/enums/menu-item.enum';
import { AuthenticationService } from '../../../core-mismes/authentication/authentication.service';
import { Router } from '@angular/router';
import { CredentialsService } from '../../../core-mismes/authentication/credentials.service';
import { User } from '../../../core-mismes/models/user';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: User;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu: NbMenuItem[] = [
    // { title: 'Perfil', data: { type: MenuItemEnum.PROFILE } },
    { title: 'Cambiar Contraseña', data: { type: MenuItemEnum.CHANGE_PASSWORD } },
    { title: 'Salir', data: { type: MenuItemEnum.LOGOUT } }
  ];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private breakpointService: NbMediaBreakpointsService,
    private authService: AuthenticationService,
    private router: Router,
    private credService: CredentialsService,
    private dialogService: NbDialogService) {

    menuService.onItemClick().subscribe(m => {
      if (m.item.data) {
        switch (m.item.data.type) {
          case MenuItemEnum.LOGOUT:
            this.authService.logout().subscribe(
              () => this.router.navigate(['/auth/login'], { replaceUrl: true })
            );
            break;
          case MenuItemEnum.CHANGE_PASSWORD:
            this.dialogService.open(ChangePasswordComponent, {
              autoFocus: false,
              context: {
                title: 'Cambiar Contraseña'
              }
            })
            break;
          // case MenuItemEnum.PROFILE:
          //   this.dialogService.open(UpdateProfileComponent, {
          //     autoFocus: false,
          //     context: {
          //       title: 'Actualizar Perfil'
          //     }
          //   })
          //   break;
          default:
            break;
        }
      }
    });
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => this.user = users.nick);

    this.user = this.credService.credentials.account;

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
