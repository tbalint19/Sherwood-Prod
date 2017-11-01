import {SignupUser} from "../model/post-request/signup-user.model";
import {UsernameValidator} from "../validator/username-validator";
import {HttpClient} from "../http/http.client";
import {HttpRequest} from "../model/http-request.model";
import {RequestFactory} from "../factory/request-factory";
import {Injectable, OnInit} from "@angular/core";
import {EmailValidator} from "../validator/email-validator";
import {PasswordValidator} from "../validator/password-validator";
import {CheckUsernameParams} from "../model/get-request/check-username-params.model";
import {CheckEmailParams} from "../model/get-request/check-email-params.model";

@Injectable()
export class SignupStatus {

  private _user: SignupUser;
  private _usernameIsAvailable: boolean;
  private _emailIsAvailable: boolean;
  private _isSuspended: boolean;

  constructor(
    private _requestObserver: HttpClient,
    private _factory: RequestFactory,
    private _usernameValidator: UsernameValidator,
    private _emailValidator: EmailValidator,
    private _passwordValidator: PasswordValidator){}

  public setUser(user: SignupUser){
      this._user = user;
  }

  public setSuspended(isSuspended: boolean): void {
    this._isSuspended = isSuspended;
  }

  public usernameIsValid(): boolean {
    return this._usernameValidator.validFormat(this._user.username);
  }

  public usernameIsChecked(): boolean {
    return this._requestObserver.findPending(
      this._factory.createUsernameCheckRequest(
        new CheckUsernameParams(this._user.username)));
  }

  public usernameIsAvailable(): boolean {
    return this._usernameIsAvailable;
  }

  public setUsernameAvailability(available: boolean): void {
    this._usernameIsAvailable = available;
  }

  public emailIsValid(): boolean {
    return this._emailValidator.validFormat(this._user.email);
  }

  public emailIsChecked(): boolean {
    return this._requestObserver.findPending(
      this._factory.createEmailCheckRequest(
        new CheckEmailParams(this._user.email)));
  }

  public emailIsAvailable(): boolean {
    return this._emailIsAvailable;
  }

  public setEmailAvailability(available: boolean): void {
    this._emailIsAvailable = available;
  }

  public passwordIsValid(): boolean {
    return this._passwordValidator.validFormat(this._user.password);
  }

  public passwordMatches(): boolean {
    return this._user.password == this._user.passwordAgain;
  }

  public isPending(): boolean {
    return this._requestObserver.findPending(
      this._factory.createSignupRequest(this._user));
  }

  public isSuspended(): boolean {
    return this._isSuspended;
  }

  public isDisabled(): boolean {
    return this.isPending() || this.isSuspended();
  }

  public isPossible(): boolean {
    return this.usernameIsValid() && !this.usernameIsChecked() && this.usernameIsAvailable() &&
      this.emailIsValid() && !this.emailIsChecked() && this.emailIsAvailable() &&
      this.passwordIsValid() && this.passwordMatches() &&
      !this.isPending();
  }

}
