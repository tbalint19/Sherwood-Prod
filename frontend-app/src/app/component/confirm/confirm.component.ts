import { Component, OnInit } from '@angular/core';
import {Confirmation} from '../../model/post-request/confirmation.model';
import {ConfirmService} from '../../service/confirm.service';
import {TokenResponse} from '../../model/response/token-response';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';
import {MessageService} from "../../service/message.service";
import {ConfirmStatus} from "../../status/confirm-status";
import {ConfirmEmailParams} from "../../model/get-request/confirm-email-params.model";
import {SuccessResponse} from "../../model/response/success-response.model";
import {Success} from "../../model/message/success.model";
import {Error} from "../../model/message/error.model";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  public confirmation: Confirmation;
  public resendParams: ConfirmEmailParams;

  constructor(
    private confirmService: ConfirmService,
    protected status: ConfirmStatus,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private messages: MessageService,
    private router: Router) {
    this.resendParams = new ConfirmEmailParams();
    this.confirmation = new Confirmation();
    this.status.setConfirm(this.confirmation);
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        if (params['code'] && params['user']) {
          this.attemptConfirmFromParams(params);
        } else if (sessionStorage.getItem('credential')) {
          this.initConfirmFromLogin();
        } else {
          this.router.navigate(['start']);
        }
      }
    );
  }

  public attemptConfirm(): void {
    if (!this.status.isPossible()){
      this.suspendConfirm();
      return;
    }
    this.confirmService.attemptConfirm(this.confirmation).subscribe(
      (response: TokenResponse) => this.handleConfirmResponse(response)
    );
  }

  public resendRequest(): void {
    this.confirmService.requestConfirm(this.resendParams).subscribe(
      (response: SuccessResponse) => this.handleResendResponse(response)
    );
  }

  private attemptConfirmFromParams(params: Params): void {
    this.location.replaceState('confirm');
    this.confirmation.code = params['code'];
    this.confirmation.credential = params['user'];
    this.attemptConfirm();
  }

  private initConfirmFromLogin(): void {
    this.confirmation.credential = sessionStorage.getItem('credential');
    this.resendParams.credential = sessionStorage.getItem('credential');
    sessionStorage.removeItem('credential');
  }

  private suspendConfirm(): void {
    this.status.setSuspended(true);
    this.messages.add(new Error("Error", "Invalid data"));
    setTimeout(() => {
      this.status.setSuspended(false);
    }, 5000)
  }

  private handleResendResponse(response: SuccessResponse): void {
    if (response.successful){
      this.messages.add(new Success("Email sent", "Check inbox for the code"));
    } else {
      this.messages.add(new Error("No email sent", "Invalid email or out of time"));
    }
  }

  private handleConfirmResponse(response: TokenResponse): void {
    if (response.token) {
      this.handleSuccessfulConfirm(response.token);
    } else {
      this.handleFailedConfirm();
    }
  }

  private handleSuccessfulConfirm(token: string): void {
    localStorage.setItem('auth-token', token);
    this.messages.add(new Success("Welcome" , "Your account is confirmed"))
    this.router.navigate(['']);
  }

  private handleFailedConfirm(): void {
    this.messages.add(new Error("Unsuccessful confirmation", "Invalid code or out of time"));
  }

}
