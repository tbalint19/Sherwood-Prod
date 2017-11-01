import { Injectable } from '@angular/core';
import {HttpClient} from '../http/http.client';
import {LoginUser} from '../model/post-request/login-user.model';
import {Observable} from 'rxjs/Observable';
import {TokenResponse} from '../model/response/token-response';
import {RequestFactory} from "../factory/request-factory";

@Injectable()
export class LoginService {

  constructor(private client: HttpClient, private _factory: RequestFactory) { }

  public attemptLogin(loginUser: LoginUser): Observable<TokenResponse> {
    return this.client.transfer(this._factory.createLoginRequest(loginUser));
  }
}
