import {Component, Input, OnInit} from '@angular/core';
import {LoginStatus} from "../../status/login-status";
import {SuccessResponse} from "../../model/response/success-response.model";
import {ResetEmailParams} from "../../model/get-request/reset-email-params.model";
import {ResetService} from "../../service/reset.service";
import {Message} from "../../model/message/message.model";
import {MessageService} from "../../service/message.service";
import {ResetStartStatus} from "../../status/reset-start-status";
import {Error} from "../../model/message/error.model";
import {Success} from "../../model/message/success.model";

@Component({
  selector: 'reset-popup',
  templateUrl: './reset-popup.component.html',
  styleUrls: ['./reset-popup.component.css']
})
export class ResetPopupComponent implements OnInit {

  protected params: ResetEmailParams;

  constructor(
    private service: ResetService,
    private messages: MessageService,
    protected resetStatus: ResetStartStatus) {
    this.params = new ResetEmailParams();
    this.resetStatus.setParams(this.params);
  }

  ngOnInit() {
  }

  @Input()
  public loginStatus: LoginStatus;

  public requestReset(): void {
    if (!this.resetStatus.isPossible()){
      this.closeReset();
      this.messages.add(new Error("Invalid credentials", "No email is sent"));
      return;
    }
    this.service.requestReset(this.params).subscribe(
      (response: SuccessResponse) => this.handleResetRequest(response.successful)
    );
  }

  public handleResetRequest(successful: boolean): void {
    if (successful) {
      this.messages.add(new Success("Email sent", "Your mail should arrive in a few seconds"));
    } else {
      this.messages.add(new Error("Invalid credentials", "No email is sent"));
    }
    this.closeReset();
  }

  public closeReset(): void {
    document.getElementById("reset-modal").classList.add("modal-flyaway");
    document.getElementById("reset-modal-background").classList.add("background-disappear");
    setTimeout(() => {
      this.loginStatus.setResetActive(false)
    }, 400)

  }

}
