import {Injectable} from "@angular/core";
import {Confirmation} from "../model/post-request/confirmation.model";
import {ConfirmCodeValidator} from "../validator/confirm-code-validator";
import {CredentialValidator} from "../validator/credential-validator";
import {HttpClient} from "../http/http.client";
import {RequestFactory} from "../factory/request-factory";

@Injectable()
export class ConfirmStatus {

  private _confirm: Confirmation;
  private _suspended: boolean;

  constructor(
    private _confirmCodeValidator: ConfirmCodeValidator,
    private _credentialValidator: CredentialValidator,
    private _requestObserver: HttpClient,
    private _factory: RequestFactory){}

  public setConfirm(confirmation: Confirmation): void {
    this._confirm = confirmation;
  }

  public setSuspended(isSuspended: boolean): void {
    this._suspended = isSuspended;
  }

  public codeIsValid(): boolean {
    return this._confirmCodeValidator.validFormat(this._confirm.code);
  }

  public credentialIsValid(): boolean {
    return this._credentialValidator.validFormat(this._confirm.credential);
  }

  public isPending(): boolean {
    return this._requestObserver.findPending(this._factory.createConfirmRequest(this._confirm));
  }

  public isSuspended(): boolean {
    return this._suspended;
  }

  public isPossible(): boolean {
    return this.codeIsValid() && this.credentialIsValid();
  }
}
