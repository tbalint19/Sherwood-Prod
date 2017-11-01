import { Injectable } from '@angular/core';
import {HttpClient} from "../http/http.client";
import {Observable} from "rxjs/Observable";
import {SuccessResponse} from "../model/response/success-response.model";
import {Reset} from "../model/post-request/reset.model";
import {RequestFactory} from "../factory/request-factory";
import {ResetEmailParams} from "../model/get-request/reset-email-params.model";

@Injectable()
export class ResetService {

  constructor(private client: HttpClient, private _factory: RequestFactory) { }

  public requestReset(resetEmailParams: ResetEmailParams): Observable<SuccessResponse> {
    return this.client.transfer(this._factory.createResetEmailRequest(resetEmailParams));
  }

  public attemptReset(reset: Reset): Observable<SuccessResponse> {
    return this.client.transfer(this._factory.createResetRequest(reset));
  }
}
