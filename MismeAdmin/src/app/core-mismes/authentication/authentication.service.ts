import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Logger } from '../logger.service';
import { Auth } from '../models/auth';
import { map, catchError } from 'rxjs/operators';
import { Constants } from '../constants/constants';
import { User } from '../models/user';
import { ErrorEnum } from '../enums/error.enum';

const log = new Logger('Service Login');

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private http: HttpClient) { }

  login(context: LoginContext): Observable<any> {
    const auth: Auth = {
      email: context.username,
      password: context.password
    };
    return this.loginHttp(auth).pipe(
      map(d => {
        const _user: User = { ...d.body };
        const data: Credentials = {
          token: d.headers.get('Authorization'),
          refreshToken: d.headers.get('Refreshtoken'),
          account: _user
        };
      }),
      catchError(this.handleError)
    );
  }

  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }

  // async isAdmin() {
  //   const response = await this.http
  //     .get<User>(Constants.GET_USER_URL + `${this.credentialsService.credentials.public_id}`)
  //     .toPromise();
  //   return response.admin;
  // }

  // async isCompletedRegister() {
  //   if (this.credentialsService.credentials) {
  //     const response = await this.http
  //       .get<User>(Constants.GET_USER_URL + `${this.credentialsService.credentials.public_id}`)
  //       .toPromise();
  //     return response.has_onboard;
  //   } else {
  //     return false;
  //   }
  // }

  confirm(token: string) {
    return this.http.get(Constants.CONFIRM_URL + token).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    log.debug(error);
    let errorMessage = '';
    if (error.error.error === undefined) {
      errorMessage = ErrorEnum.SERVER_ERROR;
    } else {
      errorMessage = error.error.error.message;
    }
    return throwError(errorMessage);
  }

  private loginHttp(auth: Auth): Observable<any> {
    return this.http.post<Auth>(Constants.SIGNIN_URL, auth);
  }
}
