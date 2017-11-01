import { Injectable } from '@angular/core';
import {HttpClient} from '../http/http.client';
import {Confirmation} from "../model/post-request/confirmation.model";
import {Observable} from "rxjs/Observable";
import {TokenResponse} from "../model/response/token-response";
import {RequestFactory} from "../factory/request-factory";
import {HttpRequest} from "../model/http-request.model";
import {SuccessResponse} from "../model/response/success-response.model";
import {ConfirmEmailParams} from "../model/get-request/confirm-email-params.model";


@Injectable()
export class ConfirmService {

  constructor(private client: HttpClient, private _factory: RequestFactory) {}

  public requestConfirm(confirmEmailParams: ConfirmEmailParams): Observable<SuccessResponse> {
    return this.client.transfer(this._factory.createConfirmEmailRequest(confirmEmailParams));
  }

  public attemptConfirm(confirmation: Confirmation): Observable<TokenResponse> {
    return this.client.transfer(this._factory.createConfirmRequest(confirmation));
  }

}
