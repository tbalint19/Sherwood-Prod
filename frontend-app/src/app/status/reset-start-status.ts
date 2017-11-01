import {Injectable} from "@angular/core";
import {HttpClient} from "../http/http.client";
import {RequestFactory} from "../factory/request-factory";
import {CredentialValidator} from "../validator/credential-validator";
import {ResetEmailParams} from "../model/get-request/reset-email-params.model";

@Injectable()
export class ResetStartStatus {

  private _params: ResetEmailParams;

  constructor(
    private _validator: CredentialValidator,
    private _requestObserver: HttpClient,
    private _factory: RequestFactory){
  }

  public setParams(params: ResetEmailParams): void {
    this._params = params;
  }

  public credentialIsValid(): boolean {
    return this._validator.validFormat(this._params.credential);
  }

  public isPending(): boolean {
    return this._requestObserver.findPending(
      this._factory.createResetEmailRequest(this._params));
  }

  public isPossible(): boolean {
    return this.credentialIsValid() && !this.isPending();
  }

}
