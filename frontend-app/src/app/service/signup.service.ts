import { Injectable } from '@angular/core';
import {HttpClient} from '../http/http.client';
import {SuccessResponse} from '../model/response/success-response.model';
import {Observable} from 'rxjs/Observable';
import {SignupUser} from '../model/post-request/signup-user.model';
import {RequestFactory} from "../factory/request-factory";
import {CheckUsernameParams} from "../model/get-request/check-username-params.model";
import {CheckResponse} from "../model/response/check-response.model";
import {CheckEmailParams} from "../model/get-request/check-email-params.model";

@Injectable()
export class SignupService {

  constructor(private client: HttpClient, private factory: RequestFactory) { }

  public checkUsername(params: CheckUsernameParams): Observable<CheckResponse> {
    return this.client.transfer(this.factory.createUsernameCheckRequest(params));
  }

  public checkEmail(params: CheckEmailParams): Observable<CheckResponse> {
    return this.client.transfer(this.factory.createEmailCheckRequest(params));
  }

  public attemptSignup(signupUser: SignupUser): Observable<SuccessResponse> {
    return this.client.transfer(this.factory.createSignupRequest(signupUser));
  }

}
