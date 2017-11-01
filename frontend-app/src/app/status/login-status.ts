import {Injectable} from "@angular/core";
import {LoginUser} from "../model/post-request/login-user.model";
import {HttpClient} from "../http/http.client";
import {RequestFactory} from "../factory/request-factory";
import {CredentialValidator} from "../validator/credential-validator";
import {PasswordValidator} from "../validator/password-validator";

@Injectable()
export class LoginStatus {

  private _user: LoginUser;
  private _resetActive: boolean;
  private _isSuspended: boolean;

  constructor(
    private _requestObserver: HttpClient,
    private _factory: RequestFactory,
    private _credentialValidator: CredentialValidator,
    private _passwordValidator: PasswordValidator){}

  public setUser(user: LoginUser){
      this._user = user;
  }

  public setSuspended(isSuspended: boolean): void {
    this._isSuspended = isSuspended;
  }

  public resetIsActive(): boolean {
    return this._resetActive;
  }

  public setResetActive(isActive: boolean): void {
    this._resetActive = isActive;
  }

  public credentialIsValid(): boolean{
    return this._credentialValidator.validFormat(this._user.credential);
  }

  public passwordIsValid(): boolean {
    return this._passwordValidator.validFormat(this._user.password);
  }

  public isPending(): boolean {
    return this._requestObserver.findPending(
      this._factory.createLoginRequest(this._user));
  }

  public isSuspended(): boolean {
    return this._isSuspended;
  }

  public isDisabled(): boolean {
    return this.isSuspended() || this.isPending();
  }

  public isPossible(): boolean {
    return this.credentialIsValid() && this.passwordIsValid() && !this.isPending();
  }
}
