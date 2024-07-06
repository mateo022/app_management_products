import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { LoggedUser } from 'src/app/users/models/user.model';
import { environment as env } from '../../../environments/environments';
import { ResponseHelper } from 'src/app/shared/helpers/response.helper';
import { CookieTokenService } from './cookie-token.service';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly USER_SESSION_KEY = "logged_user";

  private static sessionTimeoutId: any;
  private readonly sessionTimeoutLogoutObserver = {
    next: (data: any) => {
      this._router.navigate(['/auth']);
      this._snackbarService.openSnackBar("Se ha vencido la sesión.");
    },
    error: (error: any) => { }
  }


  constructor(private _httpClient: HttpClient,
    private _cookieTokenService: CookieTokenService,
    private _snackbarService: SnackBarService,
    private _router: Router) {
  }

  getLoggedUser(): LoggedUser | null {
    const user = sessionStorage.getItem(this.USER_SESSION_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }
  updateSessionUser(user: LoggedUser) {
    sessionStorage.removeItem(this.USER_SESSION_KEY);
    sessionStorage.setItem(this.USER_SESSION_KEY, JSON.stringify(user));
  }

  isLogged(): boolean {
    return this._cookieTokenService.isValidToken() &&
      sessionStorage.getItem(this.USER_SESSION_KEY) !== null &&
      sessionStorage.getItem(this.USER_SESSION_KEY) !== undefined;
  }

  login(email: string, password: string) {
    const request: any = { // Puedes definir una interfaz específica si lo prefieres
      "email": email,
      "password": password
    };

    return this._httpClient.post(`${env.url_api}/${env.api_version}/login`, request, { observe: 'response' as 'response' })
      .pipe(
        catchError(error => {
          throw ResponseHelper.generateCommonResponseFromHttpErrorResponse(error);
        }),
        map((response: HttpResponse<any>) => {

          const responseBody = response.body;

          if (ResponseHelper.responseDontHaveErrors(responseBody)) {
            let cookieExpirationDate = new Date();
            cookieExpirationDate.setMinutes(cookieExpirationDate.getMinutes() + env.session_duration_minutes);

            // this.updateSessionUser(responseBody.data.userInformation);
            // this._cookieTokenService.setCookieToken(responseBody.data.authToken.tokenValue, cookieExpirationDate);
          }
          return ResponseHelper.generateCommonResponseFromHttpResponse(response);
        })
      );
  }

  // FUNCTION FOR VALIDATE TWO FACTOR CODE
  validateTwoFactorCode(cellphone: string, code: string) {
    const request: any = { // Puedes definir una interfaz específica si lo prefieres
      "phoneNumber": cellphone,
      "code": code
    };
    return this._httpClient.post(`${env.url_api}/${env.api_version}/login/verify-two-factor-code`, request, { observe: 'response' as 'response' })
      .pipe(
        catchError(error => {
          throw ResponseHelper.generateCommonResponseFromHttpErrorResponse(error);
        }),
        map((response: HttpResponse<any>) => {

          const responseBody = response.body;
          console.log('responseBody', responseBody);

          if (ResponseHelper.responseDontHaveErrors(responseBody)) {
            let cookieExpirationDate = new Date();
            cookieExpirationDate.setMinutes(cookieExpirationDate.getMinutes() + env.session_duration_minutes);

            this.updateSessionUser(responseBody.data);
            this._cookieTokenService.setCookieToken(responseBody.data.token['tokenValue'], cookieExpirationDate);
          }
          return ResponseHelper.generateCommonResponseFromHttpResponse(response);
        })
      );
  }

  logout() {
    const headers = new HttpHeaders().set('Authorization', `${env.token_type} ${this._cookieTokenService.getCookieToken()}`);
    return this._httpClient.get(`${env.url_api}/${env.api_version}/login/logout`, { observe: 'response' as 'response', headers: headers })
      .pipe(
        catchError(error => {
          throw error.status;
        }),
        map((response: HttpResponse<any>) => {
          if (response.status == 204) {
            this._cookieTokenService.deleteCookieToken();
            sessionStorage.removeItem(this.USER_SESSION_KEY);
            clearTimeout(LoginService.sessionTimeoutId); // Limpiar el temporizador existente
            // Configurar un nuevo temporizador para cerrar sesión después de 2 minutos (120 segundos)
            LoginService.sessionTimeoutId = setTimeout(() => {
              this.logout(); // Llamar a la función logout después de 2 minutos
            }, 120 * 1000); // 120 segundos * 1000 milisegundos/segundo
          }

          return response.status;
        })
      );
  }
}

