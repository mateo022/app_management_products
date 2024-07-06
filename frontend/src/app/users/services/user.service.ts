import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _loginService: LoginService
  ) { }

  getErrorCaseUrlForReturn() {
    const user = this._loginService.getLoggedUser();
    let url;
    if (user) {
        url = ['/accounts'];
    }
    else {
      url = ['/auth'];
    }

    return url;
  }
}
