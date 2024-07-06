import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieTokenService {
  private readonly COOKIE_NAME: string = "app_business_token";

  constructor(private _cookieService: CookieService){
  }

  /**
   * Get the auth token from auth cookie.
   * @return {string} token
   */
  getCookieToken() {
    return this._cookieService.get(this.COOKIE_NAME);
  }

  /**
   * Set the auth cookie with token value and defines expiration.
   * @param {string} tokenValue : Auth token
   * @param {string} expires : Expiration date as string
   */
  setCookieToken(tokenValue: string, expiresDate: Date) {
    this._cookieService.set(this.COOKIE_NAME, tokenValue, { expires: expiresDate });
  }

  /**
   * Delete the auth cookie.
   */
  deleteCookieToken() {
    this._cookieService.delete(this.COOKIE_NAME);
  }

  /**
   * Validate the auth cookie.
   * @return {boolean} is valid auth cookie
   */
  isValidToken() {
    let cookieToken = this.getCookieToken();

    return typeof cookieToken != 'undefined' && cookieToken ? true : false;
  }
}

