import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
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


  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }

  private handleError(error: HttpErrorResponse) {
    log.debug(error);
    let errorMessage = '';
    if (error.error === undefined) {
      errorMessage = ErrorEnum.SERVER_ERROR;
    } else {
      errorMessage = error.error.message;
    }
    return throwError(errorMessage);
  }


  login(context: LoginContext): Observable<User> {
    const auth: Auth = {
      email: context.username,
      password: context.password
    };
    return this.loginHttp(auth).pipe(
      map(d => {
        log.debug(d);
        const _user: User = { ...d.body['result'] };
        const data: Credentials = {
          token: d.headers.get('Authorization'),
          refreshToken: d.headers.get('Refreshtoken'),
          account: _user
        };
        this.credentialsService.setCredentials(data, context.remember);
        return data.account;
      }),
      catchError(this.handleError)
    );
  }

  private loginHttp(auth: Auth): Observable<HttpResponse<User>> {
    return this.http.post<User>(Constants.SIGNIN_URL, auth, { observe: 'response' });
  }
}
