/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { Logger } from './core-mismes';
import { environment } from '../environments/environment';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { User } from './core-mismes/models/user';
import { UserStatsSharedService } from './core-mismes/shared/services/user-stats-shared.service';
import { TranslateService } from '@ngx-translate/core';

const log = new Logger('app');
@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  private _hubConnectionInv: HubConnection | undefined;
  constructor(private analytics: AnalyticsService,
    private userStatsSharedService: UserStatsSharedService,
    private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

  ngOnInit() {
    this.analytics.trackPageViews();

    // SignalR integration
    const url = environment.hubUrl;
    this._hubConnectionInv = new signalR.HubConnectionBuilder()
      .withUrl(url + 'userHub', signalR.HttpTransportType.ServerSentEvents)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this._hubConnectionInv.serverTimeoutInMilliseconds = 9999999;
    this._hubConnectionInv.start().catch((err: any) => {
      log.error(err.toString());
    });
    this._hubConnectionInv.on('OnUserRegistered', (user: User) => {
      this.userStatsSharedService.sendRegisteredUser(user);
    });
    this._hubConnectionInv.on('OnUserDisabled', (user: User) => {
      this.userStatsSharedService.sendDisabledUser(user);
    });
    this._hubConnectionInv.on('OnUserActivated', (user: User) => {
      this.userStatsSharedService.sendActivatedUser(user);
    });
    // End signalr integration
  }
}
