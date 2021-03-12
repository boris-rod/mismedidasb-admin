import { Injectable } from '@angular/core';
import { Constants } from '../constants/constants';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface Credentials {
  // Customize received credentials here
  account: User;
  token: string;
  refreshToken: string;
}

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  // tslint:disable-next-line:variable-name
  private _credentials: Credentials | null = null;

  private helper: JwtHelperService;

  constructor() {
    this.helper = new JwtHelperService();
    const savedCredentials =
      sessionStorage.getItem(Constants.CREDENTIALS_KEY) || localStorage.getItem(Constants.CREDENTIALS_KEY);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials, remember?: boolean): void {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(Constants.CREDENTIALS_KEY, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(Constants.CREDENTIALS_KEY);
      localStorage.removeItem(Constants.CREDENTIALS_KEY);
    }
  }
  public getCurrentUserRole(): any {
    const creds = localStorage.getItem(Constants.CREDENTIALS_KEY);
    const obj = JSON.parse(creds);
    const token = obj.token;
    if (token) {
      const tokenData = this.helper.decodeToken(token);
      if (tokenData) {
        return tokenData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      }
      return '';
    }
    return '';
  }
}
